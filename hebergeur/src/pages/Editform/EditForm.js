import { useState } from "react";
import "./EditForm.scss"; 

const EditForm = ({ item, onUpdate, onCancel }) => {
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
          {Object.keys(formData).map((key) => (
            <div className="formInputs" key={key}>
              <label htmlFor={key} className="inputLabel">{key}</label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="inputField"
              />
            </div>
          ))}
        </div>
        <div className="buttonGroup">
          <button type="submit" className="updateButton">Update</button>
          <button type="button" onClick={onCancel} className="cancelButton">Cancel</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default EditForm;
