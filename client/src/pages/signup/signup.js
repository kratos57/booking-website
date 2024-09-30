import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import "./signup.css";

const Signup = () => {
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    country: "",
    city: "",
    phone: "",
    rib: "",
    password: "",
  });
  const [error, setError] = useState(""); // State pour stocker les erreurs
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog visibility
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox status
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dhpnjtv5f/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const userData = {
        ...formData,
        img: url,
      };
      const notificationData = {
        img: url,
        namee: `${formData.username}`,
        message: "a new user has been register",
        to: "admin",
      };

      // Enregistrer les données utilisateur avec l'URL de l'image dans la base de données
      await axios.post("/auth/register", userData);
      await axios.post("/notification/creat", notificationData);

      navigate("/");
    } catch (err) {
      console.log(err);
      // Affichage du message d'erreur
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Please fill in all fields.");
      }
    }
  };

  const handleDialogAccept = () => {
    setDialogOpen(false);
    // Redirect to page hebergeur
    navigate("/sighebergeur");
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };


  return (
    <div className="signup">
      <div className="sContainer">
        <div className="left">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : "https://via.placeholder.com/150" // Placeholder image URL
            }
            alt=""
          />
        </div>
        <form>
          <div className="formInput">
            <label htmlFor="file">
              Image: <DriveFolderUploadOutlinedIcon className="icon" />
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="sInput"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="sInput"
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="sInput"
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="sInput"
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="sInput"
          />
          
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="sInput"
          />
              <button onClick={handleClick} className="sButton">
            Sign Up
          </button>
          <br />
          {/* Affichage du message d'erreur */}
          {error && <span className="error-message">{error}</span>}
          <br />
          <a href="#" className="link" onClick={() => setDialogOpen(true)}>Go to Page hebergeur</a>
        </form>
      </div>

      {/* Dialog for accepting terms */}
      {dialogOpen && (
        <div className="dialog">
          <h2>Terms and Conditions</h2>
          <p>Please read and accept the terms before proceeding.</p>
          <input type="checkbox" id="accept" checked={isChecked} onChange={handleCheckboxChange} />
          <label htmlFor="accept">I accept the terms and conditions</label>
          <button onClick={handleDialogAccept} disabled={!isChecked}>Accept</button>
        </div>
      )}
    </div>
  );
};

export default Signup;