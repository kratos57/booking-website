import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import useFetch from "../../hooks/usehotel";
import { hotelInputs } from "../../formSource";
import CustomModal from "../../components/message/message"; // Import the modal component
import "./newHotel.scss"; // Import the CSS file

const NewHotel = () => {
  const { user } = useContext(AuthContext);

  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [openModal, setOpenModal] = useState(false); // State variable for modal
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message
  const [step, setStep] = useState(1); // State variable for form step

  const { data, loading, error } = useFetch("/rooms");

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setInfo((prev) => ({
        ...prev,
        [e.target.id]: e.target.checked, // Use checked property for checkbox inputs
      }));
    } else {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Check if all required fields are filled
      const requiredFields = ['gmail', 'tel', 'map', 'address', 'distance'];

      // Check if all required fields are filled including the "file" input
      const missingFields = requiredFields.filter(field => !info[field]);
      if (!files || !files.length) {
        missingFields.push('file');
      }

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

      const amenities = hotelInputs
        .filter((input) => input.type === "checkbox")
        .filter((input) => info[input.id])
        .map((input) => input.label);

      const newhotel = {
        ...info,
        rooms,
        photos: list,
        namek: user.username,
        type: "hotel",
        att: "en attente",
        amenities: amenities,
      };

      const notificationData = {
        img: user.img,
        namee: `hebergeur ${user.username}`,
        message: "has add new hotel",
        to: "admin",
      };

      await axios.post("/notification/creat", notificationData);
      await axios.post("/hotels", newhotel);

      // Set request status to true after successful submission
      setRequestSent(true);
      setOpenModal(true); // Open the modal
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
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
              {step === 1 && (
                <>
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

                  {hotelInputs
                    .filter((input) => input.type !== "checkbox")
                    .map((input) => (
                      <div className="formInput" key={input.id}>
                        <label>{input.label}</label>
                        <input
                          id={input.id}
                          onChange={handleChange}
                          type={input.type}
                          placeholder={input.placeholder}
                        />
                      </div>
                    ))}

                  <div className="formInput">
                    <label>Featured</label>
                    <select id="featured" onChange={handleChange}>
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>

                  <div className="selectRooms">
                    <label>Rooms</label>
                    <select id="rooms" multiple onChange={handleSelect}>
                      {loading
                        ? "loading"
                        : data &&
                          data.map((room) => (
                            <option key={room._id} value={room._id}>
                              {room.name}
                            </option>
                          ))}
                    </select>
                  </div>

                  <div className="formInput">
                    <button type="button" onClick={handleNextStep}>
                      Next
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="checkboxSection">
                    {hotelInputs
                      .filter((input) => input.type === "checkbox")
                      .map((input) => (
                        <div className="formCheckbox" key={input.id}>
                          <label>
                            <input
                              id={input.id}
                              onChange={handleChange}
                              type="checkbox"
                            />
                            {input.label}
                          </label>
                        </div>
                      ))}
                  </div>

                  <div className="formButtons">
                    <button type="button" onClick={handlePreviousStep}>
                      Previous
                    </button>
                    <button onClick={handleClick}>Send</button>
                  </div>
                </>
              )}
            </form>
            {/* Render the modal */}
            <CustomModal open={openModal} handleClose={handleCloseModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
