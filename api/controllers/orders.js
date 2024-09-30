import { Order } from "../models/Order.js";
import Hotel from "../models/Hotel.js"; // Import the Hotel model
import PDFDocument from 'pdfkit';
export const createOrder = async (req, res) => {
  try {
    const { roomname, username, phone, country, hotelId, email, roomNumber, totalPrice, rooms, roomId, dates } = req.body;

    // Check if an order with similar details already exists
    const existingOrder = await Order.findOne({
      username,
      hotelId,
      roomNumber,
      totalPrice,
      dates
    });

    if (existingOrder) {
      return res.status(400).json({ message: 'Order already exists' });
    }

    // If order doesn't exist, proceed to create a new one
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
   
    const namek = hotel.namek;
    const type = hotel.type;

    const order = new Order({
      username,
      phone,
      country,
      email,
      hotelName: hotel.name,
      roomNumber,
      hotelId,
      rooms,
      namek,
      type,
      roomname,
      totalPrice,
      roomId,
      dates, 
      paid: false,
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const getOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    // Fetch and include unavailable dates for each order
    const ordersWithDates = await Promise.all(orders.map(async (order) => {
      const unavailableDates = await fetchUnavailableDatesForOrder(order._id);
      return { ...order.toJSON(), unavailableDates };
    }));

    // Return the list of orders with unavailable dates
    res.status(200).json(ordersWithDates);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to fetch unavailable dates for a specific order
const fetchUnavailableDatesForOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return [];
    }
    return order.dates;
  } catch (error) {
    console.error('Error fetching unavailable dates for order:', error);
    return [];
  }
};

// Function to fetch orders associated with a specific user
// Function to fetch orders associated with a specific user
export const getUserOrders = async (req, res) => {
  try {
    // Extract username from request parameters
    const { username } = req.params;

    // Fetch orders associated with the specified username
    const orders = await Order.find({ username });

    // Return the list of orders
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const updateOrder = async (req, res, next) => {
  try {
    // Find the order by ID
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order with the request body
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    // Return the updated order
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateOrderDate = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { dateToDelete } = req.body;

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find the index of the date to delete in the order dates array
    const index = order.dates.findIndex(date => date.toISOString() === new Date(dateToDelete).toISOString());
    if (index === -1) {
      return res.status(404).json({ message: "Date not found in order" });
    }

    // Update the specific date to "0001/01/01"
    order.dates[index] = "0001-01-01";

    // Save the updated order
    await order.save();

    res.status(200).json({ message: "Order date updated" });
  } catch (error) {
    console.error("Error updating order date:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getOrderYears = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    // Extract years from the dateyear field
    const years = orders.map(order => order.dateyear);

    // Get unique years
    const uniqueYears = Array.from(new Set(years));

    res.status(200).json(uniqueYears);
  } catch (error) {
    console.error('Error fetching order years:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const getTotalPriceByDateAndDateYear = async (req, res) => {
  try {
    const selectedYear = req.query.year; // Get selected year from query parameter
    const orders = await Order.find({ dateyear: selectedYear }); // Filter orders by selected year

    const totalPriceByDateAndDateYear = {};

    orders.forEach((order) => {
      const date = order.date;
      const dateYear = order.dateyear;
      const key = `${date}_${dateYear}`;

      if (!totalPriceByDateAndDateYear[key]) {
        totalPriceByDateAndDateYear[key] = 0;
      }
      totalPriceByDateAndDateYear[key] += parseFloat(order.totalPrice);
    });

    res.status(200).json(totalPriceByDateAndDateYear);
  } catch (error) {
    console.error('Error fetching total price by date and dateyear pair:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTotalPriceByDateAndDateYearand = async (req, res) => {
  try {
    const selectedYear = req.query.year;
    const username = req.query.username; // Get selected year from query parameter
    const orders = await Order.find({ dateyear: selectedYear , namek: username }); // Filter orders by selected year

    const totalPriceByDateAndDateYear = {};

    orders.forEach((order) => {
      const date = order.date;
      const dateYear = order.dateyear;
      const key = `${date}_${dateYear}`;

      if (!totalPriceByDateAndDateYear[key]) {
        totalPriceByDateAndDateYear[key] = 0;
      }
      totalPriceByDateAndDateYear[key] += parseFloat(order.totalPrice);
    });

    res.status(200).json(totalPriceByDateAndDateYear);
  } catch (error) {
    console.error('Error fetching total price by date and dateyear pair:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getTotalPriceByDateAndDateYearAndNameAndHotelName = async (req, res) => {
  try {
    const selectedYear = req.query.year;
    const username = req.query.username;
    const hotelName = req.query.hotelName; // Get hotel name from query parameter
    const orders = await Order.find({ dateyear: selectedYear, namek: username, hotelName: hotelName });

    const totalPriceByDateAndDateYear = {};

    orders.forEach((order) => {
      const date = order.date;
      const dateYear = order.dateyear;
      const key = `${date}_${dateYear}`;

      if (!totalPriceByDateAndDateYear[key]) {
        totalPriceByDateAndDateYear[key] = 0;
      }
      totalPriceByDateAndDateYear[key] += parseFloat(order.totalPrice);
    });

    res.status(200).json(totalPriceByDateAndDateYear);
  } catch (error) {
    console.error('Error fetching total price by date, dateyear, username, and hotelName:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getTopHotels = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    // Count the occurrences of each hotel name
    const hotelCounts = {};
    orders.forEach((order) => {
      const hotelName = order.hotelName;
      if (hotelCounts[hotelName]) {
        hotelCounts[hotelName]++;
      } else {
        hotelCounts[hotelName] = 1;
      }
    });

    // Sort the hotels by their occurrence count in descending order
    const sortedHotels = Object.entries(hotelCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 4) // Select the top 4 hotels
      .map(([hotelName]) => hotelName);

    // Fetch hotel details for the top 4 hotels
    const topHotels = await Hotel.find({ name: { $in: sortedHotels } });

    res.status(200).json(topHotels);
  } catch (error) {
    console.error('Error fetching top hotels:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


import QRCode from 'qrcode'; // Import the QRCode library

export const generateOrderPdf = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order by ID
    const order = await Order.findById(orderId).populate('rooms');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create a new PDF document
    const doc = new PDFDocument({ margin: 50 });

    // Set the response to be a PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=order_${orderId}.pdf`);

    // Pipe the PDF into the response
    doc.pipe(res);

    // Define a function to draw a header
    const drawHeader = (title) => {
      doc.fontSize(18).fillColor('#333').text(title, { align: 'center', underline: true });
      doc.moveDown();
    };

    // Add a title for the PDF
    drawHeader('Reservation Details');

    // Add a horizontal line
    doc.moveTo(50, 100)
      .lineTo(550, 100)
      .stroke();

    doc.moveDown();

    // Define a function to draw key-value pairs with styles
    const drawKeyValue = (key, value) => {
      doc.fontSize(14).fillColor('#555').text(key, { continued: true, underline: false });
      doc.fillColor('#000').text(`: ${value}`);
    };

    // Order and user details
    drawKeyValue('Order ID', order._id);
    // Generate QR code for Order ID and embed it into the PDF
    const qrCodeData = `Order ID: ${order._id}`;
    const qrCodeOptions = { type: 'png', errorCorrectionLevel: 'high', width: 100, margin: 1 };
    const qrCodeBuffer = await QRCode.toBuffer(qrCodeData, qrCodeOptions);
    doc.image(qrCodeBuffer, 450, doc.y - 10, { width: 100 });

    drawKeyValue('Username', order.username);
    drawKeyValue('Phone', order.phone);
    drawKeyValue('Country', order.country);
    drawKeyValue('Email', order.email);
    doc.moveDown();

    // Hotel and room details
    drawKeyValue(`${order.type} Name`, order.hotelName);
    if (order.type === 'formation') {
      drawKeyValue('Place Name', order.roomname);
    } else if (order.type === 'hotel' || order.type === 'maison') {
      drawKeyValue('Room Name', order.roomname);
    } else if (order.type === 'camping') {
      drawKeyValue('Tent Name', order.roomname);
    } else if (order.type === 'evenements') {
      drawKeyValue('Ticket Name', order.roomname);
    }
    if (order.type === 'formation') {
      drawKeyValue('Place Number', order.roomNumber);
    } else if (order.type === 'hotel' || order.type === 'maison') {
      drawKeyValue('Room Number', order.roomNumber);
    } else if (order.type === 'camping') {
      drawKeyValue('Tent Number', order.roomNumber);
    } else if (order.type === 'evenements') {
      drawKeyValue('Ticket Number', order.roomNumber);
    }
    
    drawKeyValue('Total Price', `${order.totalPrice} USD`);
    doc.moveDown();
    drawHeader('Reservation Dates');
    doc.fontSize(14).fillColor('#000').text(order.dates.map(date => new Date(date).toLocaleDateString()).join(', '));
    doc.moveDown();

    // Add the room details if available
    if (order.rooms && order.rooms.length > 0) {
      drawHeader('Room Details');
      order.rooms.forEach((room, index) => {
        drawKeyValue(`Room ${index + 1}`, '');
        drawKeyValue('  Room ID', room._id);
        drawKeyValue('  Room Type', room.type);
        drawKeyValue('  Room Name', room.name);
        doc.moveDown();
      });
    }


    // Finalize the PDF and end the stream
    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
