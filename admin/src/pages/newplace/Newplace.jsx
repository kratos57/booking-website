import React, { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { placeInputs } from "../../formSource";
import useFetch from "../../hooks/useFormaion";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import CustomModal from "../../components/message/messageroom"; 

const NewRoom = () => {
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message
  const [files, setFiles] = useState("");
  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState("");
  const [openModal, setOpenModal] = useState(false); 
  const [requestSent, setRequestSent] = useState(false);

  const { data, loading, error } = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  

  const handleClick = async (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled including the "file" input
    const requiredFields = ["title", "desc", "price", "name"]; // Include the "hotelId" and "rooms" in required fields
    const missingFields = requiredFields.filter(field => !info[field]);
    if (missingFields.length > 0) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    const list = await Promise.all(
      Object.values(files).map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dhpnjtv5f/image/upload",
          data
        );

        const { url } = uploadRes.data;
        return url;
      })
    );

    // Check if rooms is already a string
    if (typeof rooms === 'string') {
      const roomNumbers = rooms.split(",").map((room) => ({ number: room.trim() }));
      try {
        // Add user.username to info
        await axios.post(`/rooms/${hotelId}`, { ...info,photos: list, roomNumbers, namek: user.username, type: "formation" });
        
        setOpenModal(true); 
      } catch (err) {
        setOpenModal(true); 
      }
    } else {
      console.error('Rooms is not a string:', rooms);
      setErrorMessage("An error occurred while adding the room. Please try again.");
    }
  };
  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New place</h1>
        </div>
        <div className="bottom">
        <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://api.cloudinary.com/v1_1/dhpnjtv5f/image/upload"
              }
              alt=""
            />
          </div>
          <div className="right">
            {/* Render the error message */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form>
            <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              {placeInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>place</label>
                <textarea
                  id="rooms" // Add id for the "Rooms" textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="Enter room numbers separated by commas."
                />
              </div>
              <div className="formInput">
                <label>Choose a formation</label>
                <select
                  id="hotelId" // Add id for the "Choose a hotel" select
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "Loading..."
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
            <CustomModal open={openModal} handleClose={handleCloseModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
