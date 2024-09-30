import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./dashboard.css";
import { FaRegFilePdf } from "react-icons/fa";

const Dashboard = ({ onClose }) => {
  const { user, logout } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/orders/user/${user.username}/orders`);
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [user.username]);

  const handleLogout = () => {
    logout();
  };

  const handleGeneratePdf = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:8800/api/orders/${orderId}/pdf`, {
        responseType: 'blob', // Important
      });

      // Create a URL for the PDF blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reservation_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="dashboard">
        <div className="item">
            <img
              className="avatar"
              src={user.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
              alt="avatar"
            />
          </div>
          <div className="welcome-header">Welcome, {user.username}!</div>
          <div className="user-details">
            <div className="detail-item">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="detail-item">
              <strong>Username:</strong> {user.username}
            </div>
            <div className="detail-item">
              <strong>Phone Number:</strong> {user.phone}
            </div>
            <div className="detail-item">
              <strong>Country:</strong> {user.country}
            </div>
          </div>

          <button onClick={toggleDialog}>Show Reservation History</button>

          {showDialog && (
            <div className="reservation-history-dialog">
              <h2>Reservation History</h2>
              <ul className="reservation-list">
                {reservations.map((reservation) => (
                  <ul key={reservation._id} className="reservation-item">
                    <div className="reservation-details">
                      <p><strong>{reservation.type}:</strong> <span className="hotel-name">{reservation.hotelName}</span></p>
                      <p><strong>{reservation.type === 'formation' ? 'Place Number:' : reservation.type === 'hotel' ? 'Room Number:' : reservation.type === 'maison' ? 'Room Number:' : reservation.type === 'camping' ? 'Tent Number:' : reservation.type === 'evenements' ? 'Ticket Number:' : ''}</strong> <span className="hotel-name">{reservation.type === 'hotel' ? reservation.roomNumber : reservation.type === 'formation' ? reservation.placeNumber : reservation.type === 'maison' ? reservation.roomNumber : reservation.type === 'camping' ? reservation.tentNumber : reservation.type === 'evenements' ? reservation.ticketNumber : ''}</span><strong className="hotel-name">{reservation.roomNumber}:</strong> <FaRegFilePdf onClick={() => handleGeneratePdf(reservation._id)} /></p>
                      <p><strong>Total Price:</strong> <span className="total-price">${reservation.totalPrice}</span></p>
                    </div>
                  </ul>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
