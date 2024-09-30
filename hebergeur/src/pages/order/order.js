import React, { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/order"; // Import the modified useFetch hook
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"; // Import axios for making HTTP requests
import "./order.scss";

const Order = () => {
  const { user } = useContext(AuthContext);
  const [filterType, setFilterType] = useState("");
  // Fetch orders related to the logged-in user's hotel
  const { data: orders, loading, error, reFetch } = useFetch("http://localhost:8800/api/orders", { namek: user.username });



      const deleteUnavailableDate = async (roomname, roomNumber, dateToDelete, orderId, reFetch) => {
        console.log("Room Name:", roomname);
        console.log("Room Number:", roomNumber);
        console.log("Date to Delete:", dateToDelete);
        try {
          const shouldDelete = window.confirm("Are you sure you want to delete this item?");
          if (!shouldDelete) return;
      
          // Delete the unavailable date from the room
          await axios.delete(`http://localhost:8800/api/rooms/unavailable-date/${roomname}/${roomNumber}`, {
            data: { dateToDelete }
          });
      
          // Update the order date for the specific dateToDelete
          await axios.put(`http://localhost:8800/api/orders/${orderId}/update-order-date`, { dateToDelete });
      
          // Re-fetch orders to update the UI
          reFetch();
        } catch (error) {
          console.error("Error deleting unavailable date:", error);
        }
      };
      const updateHistoriq = async (orderId) => {
        try {
          const response = await axios.put(`http://localhost:8800/api/orders/${orderId}`, { historiq: "yes" });
          console.log("Updated order:", response.data);
          reFetch(); // Re-fetch orders to update the UI
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
            {/* Display order list here */}
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching orders: {error}</p>}
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Type</th>
                  <th>Username</th>
                  <th>Phone</th>
                  <th>Country</th>
                  <th>{filterType} Name</th>
                  <th>Room Name</th>
                  <th>Room Number</th>
                  <th>Unavailable Dates</th> 
                  <th>Process Payment</th> 
                  <th>Action</th> {/* Add column for delete button */}
                  <th>Historiq</th> {/* Add column for historiq button */}
                </tr>
              </thead>
              <tbody>
                {orders 
                .filter((order) =>
                    order.type && order.type.toLowerCase().includes(filterType.toLowerCase())
                  ).map((order) => (
                  <tr key={order._id}>
                    
                    <td>{order._id}</td>
                    <td>{order.type}</td>
                    <td>{order.username}</td>
                    <td>{order.phone}</td>
                    <td>{order.country}</td>
                    <td>{order.hotelName}</td>
                    <td>{order.roomname}</td>
                    <td>{order.roomNumber}</td>
                   <td>
                    {order.unavailableDates.map(date => (
                      new Date(date).toLocaleDateString('it-IT').split('/').reverse().join('/')
                    )).join(",\n")}
                  </td>

                    <td>{order.ProcessPayment}</td>
                    <td>
                        {/* Add delete button */}
                        {order.unavailableDates.map((date, index) => (
                   <button 
                   key={index} 
                   onClick={() => deleteUnavailableDate(order.roomname, order.roomNumber, date, order._id, reFetch)} 
               >
                   Delete
               </button>
               
                        ))}
                    </td>

                    <td>
                      {/* Add historiq button */}
                      <button onClick={() => updateHistoriq(order._id)}>Historiq</button>
                    </td>
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