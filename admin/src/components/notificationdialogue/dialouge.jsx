import React, { useState, useEffect } from 'react';
import './dialouge.scss'; // Assuming the correct path to your SCSS file
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa6";

const Dialogue = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/notification/get");
      if (response.status === 200) {
        const data = response.data;
        const adminNotifications = data.filter(notification => notification.to === "admin");
        // Formatage de la date avant de l'ajouter à l'état
        adminNotifications.forEach(notification => {
          notification.formattedDate = formatDate(notification.date);
        });
        setNotifications(adminNotifications);
      } else {
        console.error('Failed to fetch notifications:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/notification/delete/${id}`);
      if (response.status === 200) {
        fetchNotifications(); // Refresh notifications after successful delete
      } else {
        console.error('Failed to delete notification:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting notification:', error.message);
    }
  };

  const handleView = async (id) => {
    try {
      const response = await axios.put(`/notification/update/${id}`, { num: 0 });
      if (response.status === 200) {
        fetchNotifications(); // Refresh notifications after successful update
      } else {
        console.error('Failed to update notification:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating notification:', error.message);
    }
  };

  return (
    <div className="notification-dialogue">
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((notification, index) => (
          <div key={notification._id} className={index % 2 === 0 ? "notification even" : "notification odd"}>
            <table>
              <tbody>
                <tr>
                  <td rowSpan={2}>
                    <img className="avatar" src={notification.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
                  </td>
                  <td>
                    <p><b>{notification.namee}</b> {notification.formattedDate}</p>
                    <p>{notification.message}</p>
                  </td>
                  <td>
                    {notification.num === 1 && <FaEye onClick={() => handleView(notification._id)} />}
                    <MdDeleteOutline onClick={() => handleDelete(notification._id)} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default Dialogue;
