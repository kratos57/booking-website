import React, { useState } from "react";
import "./EditForm.scss";

const Imag = ({ item, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({ ...item });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="form">
      <div className="rContainer">
        <div className="editFormContainer">
          <h2>Edit Form</h2>
          <form onSubmit={handleSubmit} className="editForm">
            <div className="formRow">
              {Object.keys(formData).map((key, i) => (
                key === "photos" && (
                  formData[key].map((photo, index) => (
                    <div className="hotelImgWrapper" key={index}>
                      <img src={photo} alt="" className="hotelImg" />
                    </div>
                  ))
                )
              ))}
            </div>
            <div className="buttonGroupe">
              
              <button type="button" onClick={onCancel} className="updateButton">Return</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Imag;
