
import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/payé"; // Import the modified useFetch hook
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"; // Import axios for making HTTP requests
import "./terminer.scss";

const Order = () => {
  const { user } = useContext(AuthContext);



  // Fetch orders related to the logged-in user's hotel
  const { data: orders, loading, error, reFetch } = useFetch("http://localhost:8800/api/orders", { namek: user.username });

  const deleteUnavailableDate = async (roomname, roomNumber, dateToDelete) => {
    console.log("Room Name:", roomname);
    console.log("Room Number:", roomNumber);
    console.log("Date to Delete:", dateToDelete);

    const shouldDelete = window.confirm("Are you sure you want to delete this item?");
    if (!shouldDelete) return; // Do nothing if the user cancels the dialog
  
    try {
      const response = await axios.delete(`http://localhost:8800/api/rooms/unavailable-date/${roomname}/${roomNumber}`, {
        data: { dateToDelete } // Pass dateToDelete in the request body
      });
      console.log("Deleted date from room:", response.data);
      // After deletion, you may want to update the UI to reflect the changes
      reFetch(); // Re-fetch orders to update the UI
    // Disable the button after successful deletion
    } catch (error) {
      console.error("Error deleting unavailable date:", error);
    }
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="top">
          <h1>Orders</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {/* Display order list here */}
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching orders: {error}</p>}
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Username</th>
                  <th>Phone</th>
                  <th>Country</th>
                  <th>Hotel Name</th>
                  <th> Owner</th>
                  <th>Room Name</th>
                  <th>Room Number</th>
                  <th>Unavailable Dates</th> 
                  <th>Process Payment</th> 
             
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.username}</td>
                    <td>{order.phone}</td>
                    <td>{order.country}</td>
                    <td>{order.hotelName}</td>
                    <td>{order.namek}</td>
                    <td>{order.roomname}</td>
                    <td>{order.roomNumber}</td>
                    <td>{order.unavailableDates.join(", ")}</td>
                    <td>{order.ProcessPayment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

