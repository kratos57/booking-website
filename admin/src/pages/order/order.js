import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import "./order.scss"; // Import CSS file for custom styling
import EditForm from "../../pages/EditPayment/EditPay"; 
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [filterHotel, setFilterHotel] = useState("");
  const [filterType, setFilterType] = useState("");
  const [editItem, setEditItem] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/orders");
      // Filter the orders where ProcessPayment is "Pending Payment"
      const filteredOrders = response.data.filter(order => order.ProcessPayment === "Pending Payment");
      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = orders.find((order) => order._id === id);
    setEditItem(itemToEdit);
  };

  const handleUpdate = async (updatedData) => {
    try {
      if (!editItem) {
        console.error("No order selected for update");
        return;
      }
      const response = await axios.put(`http://localhost:8800/api/orders/${editItem._id}`, updatedData);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === editItem._id ? { ...order, ...response.data } : order
        )
      );
      setEditItem(null);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const updateHistoriq = async (orderId,order) => {
    try {
      const notificationData = {
        img: user.img,
        namee: `admin ${user.username}`,
        message: `u have new reservation has completed her process payment`,
        to: order.namek, // Assuming item.namek holds the desired value
      };
      await axios.post("/notification/creat", notificationData);
      const response = await axios.put(`http://localhost:8800/api/orders/${orderId}`, { ProcessPayment: "payé" });
      console.log("Updated order:", response.data);
      // Re-fetch orders to update the UI
      fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="top">
  <h1>Orders</h1>
  <input
    type="text"
    placeholder="Filter by owner"
    value={filterHotel}
    onChange={(e) => setFilterHotel(e.target.value)}
  />
  <select
    value={filterType}
    onChange={(e) => setFilterType(e.target.value)}
  >
    <option value="">Filter by Type</option>
    <option value="hotel">hotel </option>
    <option value="maison">maison</option>
    <option value="formation">formation</option>
    <option value="camping">camping</option>
  </select>
</div>

        <div className="bottom">
          <div className="left">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Username</th>
                  <th>Phone</th>
                  <th>Country</th>
                  <th>Room Name</th>
                  <th>{filterType} Name</th>
                  <th>Hotel owner</th>
                  <th>Room Number</th>
                  <th>type</th>
                  <th>Unavailable Dates</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter((order) =>
                    order.namek && order.namek.toLowerCase().includes(filterHotel.toLowerCase()) &&
                    order.type && order.type.toLowerCase().includes(filterType.toLowerCase())
                  )
                  .map((order) => (
                    <tr key={order._id} className="custom-row">
                      <td>{order._id}</td>
                      <td>{order.username}</td>
                      <td>{order.phone}</td>
                      <td>{order.country}</td>
                      <td>{order.roomname}</td>
                      <td>{order.hotelName}</td>
                      <td>{order.namek}</td>
                      <td>{order.roomNumber}</td>
                      <td>{order.type}</td>
                      <td>
                        <ul>
                          {order.unavailableDates && order.unavailableDates.map((date, index) => (
                            <li key={index}>{date}</li>
                          ))}
                        </ul>
                      </td>
                      <td>{order.ProcessPayment}</td>
                      <td>
                        <button onClick={() => updateHistoriq(order._id,order)}>completed</button>
                      </td>
                      <td></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {editItem && <EditForm item={editItem} onUpdate={handleUpdate} onCancel={() => setEditItem(null)}/>}
    </div>
  );
};

export default Order;
