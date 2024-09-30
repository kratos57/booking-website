import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import "./signup.css";

const SignupHebergeur = () => {
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    country: "",
    city: "",
    phone: "",
    rib: "",
    password: "",
    taype: [], // Change to an empty array
  });
  
  const [error, setError] = useState(""); // State pour stocker les erreurs
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox'
        ? checked
          ? [...prevFormData[name], value] // If checked, add the value to the array
          : prevFormData[name].filter(item => item !== value) // If unchecked, remove the value from the array
        : value
    }));
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
        message: "a new hebergeur has been registered",
        to: "admin",
      };

      await axios.post("/notification/creat", notificationData);
      // Enregistrer les données utilisateur avec l'URL de l'image dans la base de données
      await axios.post("/auth/register", userData);
      navigate("/");
    } catch (err) {
      console.log(err);
      // Affichage du message d'erreur
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred during signup. Please try again later.");
      }
    }
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
          <input
            type="text"
            placeholder="Rib"
            name="rib"
            value={formData.rib}
            onChange={handleChange}
            className="sInput"
          />

          <div className="checkboxContainer">
            <label>
              <input
                type="checkbox"
                name="taype"
                value="hotel"
                checked={formData.taype.includes("hotel")}
                onChange={handleChange}
                className="sCheckbox"
              />
              Hôtel
            </label>
            <label>
              <input
                type="checkbox"
                name="taype"
                value="maison d'hôtes"
                checked={formData.taype.includes("maison d'hôtes")}
                onChange={handleChange}
                className="sCheckbox"
              />
              Maison d'hôtes
            </label>
            <label>
              <input
                type="checkbox"
                name="taype"
                value="evenements"
                checked={formData.taype.includes("evenements")}
                onChange={handleChange}
                className="sCheckbox"
              />
              Événements
            </label>
            <label>
              <input
                type="checkbox"
                name="taype"
                value="formation"
                checked={formData.taype.includes("formation")}
                onChange={handleChange}
                className="sCheckbox"
              />
              Formation
            </label>
            <label>
              <input
                type="checkbox"
                name="taype"
                value="camping"
                checked={formData.taype.includes("camping")}
                onChange={handleChange}
                className="sCheckbox"
              />
              Camping
            </label>
          </div>

          <button onClick={handleClick} className="sButton">
            Sign Up
          </button>
          <br />
          {error && <span className="error-message">{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default SignupHebergeur;
