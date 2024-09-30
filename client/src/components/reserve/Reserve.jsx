import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faUser, faUsers, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ImageViewerDialog from "../imageviewe/ImageViewerDialog";

const Reserve = ({ setOpen, hotelId, hotelName, namek }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [isReserving, setIsReserving] = useState(false);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const { data } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isImageViewerOpen, setImageViewerOpen] = useState(false);

  const handleViewImages = (itemId) => {
    setSelectedItemId(itemId);
    setImageViewerOpen(true);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedRooms, data, dates]);

  useEffect(() => {
    const storedRooms = JSON.parse(localStorage.getItem("selectedRooms"));
    if (storedRooms) {
      setSelectedRooms(storedRooms);
    }
  }, []);

  const calculateTotalPrice = () => {
    let total = 0;
    selectedRooms.forEach(roomId => {
      const room = data.find(item => item.roomNumbers.some(room => room._id === roomId));
      if (room) {
        total += room.price * days;
      }
    });
    setTotalPrice(total);
  };

  const getDatesInRange = (startDate, endDate) => {
    if (!startDate || !endDate) return [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const days = dayDifference(new Date(dates[0].endDate), new Date(dates[0].startDate)) + 1;

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const roomPrice = data.find(item => item.roomNumbers.some(room => room._id === value)).price;
    setSelectedRooms(prevSelectedRooms => {
      if (checked) {
        return [...prevSelectedRooms, value];
      } else {
        return prevSelectedRooms.filter(item => item !== value);
      }
    });
    setTotalPrice(prevTotalPrice => {
      if (checked) {
        return prevTotalPrice + roomPrice * days;
      } else {
        return prevTotalPrice - roomPrice * days;
      }
    });
  };

  const handleClick = async () => {
    if (isReserving) return; // Prevent multiple clicks while reservation is in progress
    setIsReserving(true); // Set reservation in progress
    
    // Validation de formulaire
    if (!validateForm()) {
      setIsReserving(false); // Reset reservation status
      return;
    }

    try {
      // Store order data in localStorage before initiating payment
      const orderData = {
        name,
        email,
        country,
        phone,
        hotelId,
        hotelName,
        namek,
        totalPrice,
        selectedRooms,
        dates: alldates,
        username: user.username,
        roomId: selectedRooms[0],
        roomNumber: data.find(room => room.roomNumbers.some(number => number._id === selectedRooms[0])).roomNumbers.find(roomNumber => roomNumber._id === selectedRooms[0]).number,
        roomname: data.find(room => room.roomNumbers.some(number => number._id === selectedRooms[0])).name
      };
      localStorage.setItem("orderData", JSON.stringify(orderData));

      // Make a request to initiate the payment process with the total price
      const paymentResponse = await axios.post("http://localhost:8800/api/payment/pay", {
        amount: totalPrice * 1000, // Assuming 1 TND = 1000 millimes
      });

      // Redirect to the payment link returned by the backend
      window.location.href = paymentResponse.data.result.link;
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsReserving(false); // Reset reservation status
    }
  };

  // Fonction de validation de formulaire
  const validateForm = () => {
    if ( email === '' || country === '' || phone === '') {
      alert('Veuillez remplir tous les champs.');
      return false;
    }
    return true;
  };

  const { user,logout } = useContext(AuthContext);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <h2 className="hotelName">{hotelName}</h2>
        <h3 className="totalPrice">Total Price for {days} nights: <span>${totalPrice}</span></h3> 
        <button className="showFormButton" onClick={toggleForm}>
  {showForm ? "Hide Form" : "Show Form"}
</button>

        {showForm && (
          <div>
            <div className="inputGroup">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                placeholder={user.username}
                value={name}
                onChange={(e) => setName(e.target.value)}
                readOnly
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder={user.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                placeholder={user.country}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                placeholder={user.phone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        )}

<div className="roomsContainer">
  {data.map((item) =>
    item && item.title ? (
      <div className="roomItem" key={item._id}>
        <div className="roomItemInfo">
          <div className="roomTitle">{item.title}</div>
          <div className="roomDesc">{item.desc}</div>
          <div className="roomMax">
  <span>Max People:</span>{" "}
  <b>
    {Array.from({ length: item.maxPeople }, (_, i) => (
      <FontAwesomeIcon icon={i === 0 ? faUser : faUsers} key={i} />
    ))}
  </b>
</div>
          <div className="roomPrice">
            <span>Price:</span> <b>${item.price}</b>
          </div>
          <div className="roomAmenities">
            <span>Amenities:</span>
            <ul>
              {item.amenities &&
                item.amenities.map((amenity, index) => (
                  <li key={index}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    {amenity}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="roomSelect">
          {item.roomNumbers.map((roomNumber) => (
            <div className="roomNumber" key={roomNumber._id}>
              <input
                type="checkbox"
                id={`room_${roomNumber._id}`}
                value={roomNumber._id}
                onChange={handleSelect}
                disabled={!isAvailable(roomNumber)}
                checked={selectedRooms.includes(roomNumber._id)}
              />
              <label htmlFor={`room_${roomNumber._id}`}>
                {roomNumber.number}
              </label>
            </div>
          ))}
        </div>
        <button
          onClick={() => handleViewImages(item._id)}
          className="viewImagesButton"
        >
          View Images
        </button>
      </div>
    ) : null
  )}
</div>

        {isImageViewerOpen && selectedItemId && (
          <ImageViewerDialog
            photos={data.find(item => item._id === selectedItemId).photos}
            onClose={() => setImageViewerOpen(false)}
          />
        )}

        <button 
          onClick={handleClick} 
          className="reserveButton"
          disabled={isReserving}
        >
          {isReserving ? "Reserving..." : "Reserve Now!"}
        </button>
      </div>
    </div>
  );
};

export default Reserve;
