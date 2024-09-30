// Success.js
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./success.css";

const Success = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const orderData = JSON.parse(localStorage.getItem("orderData"));

        if (orderData && isConfirmed) {
          await axios.post("http://localhost:8800/api/orders", orderData);
          const notificationData = {
            img: user.img,
            namee: user.username,
            message: "has reserved ",

            to: `${orderData.namek}`,
        };
           
          await axios.post("/notification/creat", notificationData);
          const roomResponse = await axios.get(`/hotels/room/${orderData.hotelId}`);
          const roomData = roomResponse.data;

          await Promise.all(
            orderData.selectedRooms.map(async (roomId) => {
              const room = roomData.find((item) =>
                item.roomNumbers.some((room) => room._id === roomId)
              );
              const res = await axios.put(`/rooms/availability/${roomId}`, {
                dates: orderData.dates,
              });
            })
          );

          localStorage.removeItem("orderData");
          navigate("/");
        }
      } catch (error) {
        console.error("Error creating order:", error);
      }
    };

    createOrder();
  }, [isConfirmed, navigate]);

  const handleConfirmation = () => {
    setIsConfirmed(true);
  };

  return (
    <div className="success-container">
      <div className="success-content">
        <h1>Thank you for your reservation!</h1>
        <p>Your order has been successfully processed.</p>
        <button className="confirmation-button" onClick={handleConfirmation}>Confirm Reservation</button>
      </div>
    </div>
  );
};

export default Success;
