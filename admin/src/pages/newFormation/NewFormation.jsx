import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import useFetch from "../../hooks/useFormaion";
import { FormationInputs } from "../../formSource";
import CustomModal from "../../components/messageuser/message"; // Import the modal component

const NewFormatin = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [openModal, setOpenModal] = useState(false); // State variable for modal
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message

  const { data, loading } = useFetch("/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Check if all required fields are filled
      const requiredFields = ["gmail", "tel", "map", "address", "distance"];
      const missingFields = requiredFields.filter((field) => !info[field]);
      if (!files || !files.length) {
        missingFields.push("files");
      }
      if (!file) {
        missingFields.push("file");
      }

      if (missingFields.length > 0) {
        setErrorMessage("Please fill in all required fields.");
        return;
      }

      const list = await Promise.all(
        Array.from(files).map(async (file) => {
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

      const singleFileData = new FormData();
      singleFileData.append("file", file);
      singleFileData.append("upload_preset", "upload");
      const uploadSingleFileRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dhpnjtv5f/image/upload",
        singleFileData
      );
      const singleFileUrl = uploadSingleFileRes.data.url;

      const newhotel = {
        ...info,
        rooms,
        photos: list,
        img: singleFileUrl,
        att: "en attente",
        type: "formation",
      };

      const notificationData = {
        img: user.img,
        namee: `admin ${user.username}`,
        message: `has added a new formation ${newhotel.name}`,
        to: newhotel.namek, // Assuming newhotel.namek holds the desired value
      };

      // Send data to your backend
      await axios.post("/hotels", newhotel);
      await axios.post("/notification/creat", notificationData);

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

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Formation</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files.length > 0
                  ? URL.createObjectURL(files[0])
                  : "https://via.placeholder.com/150"
              }
              alt=""
            />
          </div>
         
          <div className="left">
            
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://via.placeholder.com/150"
              }
              alt=""
            /> <p>image formature </p>
          </div>
          <div className="right">
            {/* Render the error message */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form>
              <div className="formInput">
                <label htmlFor="files">
                  Images: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="files"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label htmlFor="file">
                Image Formature: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {FormationInputs.map((input) => (
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
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
            {/* Render the modal */}
            <CustomModal open={openModal} handleClose={handleCloseModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFormatin;
