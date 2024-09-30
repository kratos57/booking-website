import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import User from '../models/User.js';
import Rating from '../models/rating.js';
import { sendEmailNotification } from '../utils/emailNotificationService.js';
export const createHotel = async (req, res, next) => {
  try {
    const { type, gmail, tel, map, namek, att, startDate, endDate, amenities, ...hotelData } = req.body;

    const requiredFields = ['name', 'address', 'city', 'distance', 'title', 'desc'];
    const missingFields = requiredFields.filter(field => !hotelData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ error: "Please fill in all required fields." });
    }

    // Check if amenities is an array before mapping over it
    const amenityObjects = Array.isArray(amenities) ? amenities.map(amenityName => ({ name: amenityName, available: true })) : [];

    const newHotel = new Hotel({
      ...hotelData,
      namek: namek,
      att: att,
      map: map,
      gmail: gmail,
      tel: tel,
      type: type,
      startDate: startDate,
      endDate: endDate,
      amenities: amenityObjects, // Pass array of amenity objects
    });

    const savedHotel = await newHotel.save();

    const subscribedUsers = await User.find({ subscribed: true });

    subscribedUsers.forEach(async (user) => {
      try {
        await sendEmailNotification(user.email, savedHotel);
      } catch (error) {
        console.error('Error sending email notification:', error);
      }
    });

    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};





export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  const { minD, maxD, min, max, amenities, ...others } = req.query;
  try {
    let query = {
      ...others,
      distance: { $gt: minD || 1, $lt: maxD || 999 },
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    };

    if (amenities) {
      const amenityArray = amenities.split(',');
      query = {
        ...query,
        'amenities.name': { $in: amenityArray }
      };
    }

    const hotels = await Hotel.find(query);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "maison" });
    const evenements = await Hotel.countDocuments({ type: "evenements" });
    const villaCount = await Hotel.countDocuments({ type: "formation" });
    const cabinCount = await Hotel.countDocuments({ type: "camping" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "maison", count: apartmentCount },
      { type: "evenements", count: evenements },
      { type: "formation", count: villaCount },
      { type: "camping", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};





export const submitRating = async (req, res, next) => {
  const { id } = req.params; // Hotel ID
  const { userId, ratingValue } = req.body;

  try {
    // Check if the user has already rated this hotel
    const existingRating = await Rating.findOne({ hotel: id, user: userId });
    if (existingRating) {
      return res.status(400).json({ message: "You have already rated." });
    }

    // Create a new rating document
    const rating = new Rating({
      hotel: id, // Assign hotel ID
      user: userId, // Assign user ID
      rating: ratingValue,
    });

    // Save the rating document
    await rating.save();

    // Update the hotel document with the new rating
    const hotel = await Hotel.findById(id);

    // Check if averageRating is empty
    if (!hotel.averageRating || isNaN(hotel.averageRating)) {
      hotel.averageRating = 0;
    }

    hotel.ratings.push(rating); // Assuming you're storing rating documents directly
    hotel.totalRatings += 1;
    hotel.averageRating = (hotel.averageRating * (hotel.totalRatings - 1) + ratingValue) / hotel.totalRatings;
    await hotel.save();

    res.status(201).json(rating);
  } catch (error) {
    next(error);
  }
}


export const getTotalRatings = async (req, res, next) => {
  const { id } = req.params; // Hotel ID

  try {
    const hotel = await Hotel.findById(id);
    const totalRatings = hotel.totalRatings;
    res.status(200).json({ totalRatings });
  } catch (error) {
    next(error);
  }
};

// Add this to your controller file

export const getTopRatedHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find().sort({ averageRating: -1 }).limit(4);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
export const getTypeAndCities = async (req, res, next) => {
  try {
    // Aggregation pipeline to group by type and collect cities
    const result = await Hotel.aggregate([
      {
        $group: {
          _id: "$type",
          cities: { $addToSet: "$city" }
        }
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          cities: 1
        }
      }
    ]);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
// Add this function to your controller file

export const getHotelTypes = async (req, res, next) => {
  try {
    const types = await Hotel.distinct("type");
    res.status(200).json(types);
  } catch (err) {
    next(err);
  }
};
