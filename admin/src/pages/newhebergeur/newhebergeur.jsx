import "./newhebergeur.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import ErrorDialog from "../../components/messageuser/message"; // Import your ErrorDialog component

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog visibility

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Check if required fields are filled
    const requiredFields = ["username", "email", "phone", "password", "city","country","rib"];
    for (const field of requiredFields) {
      if (!info[field]) {
        setErrorMessage(`Please fill in ${field}`);
        setDialogOpen(true);
        return;
      }
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dhpnjtv5f/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("/auth/register", newUser);
      setSuccessMessage("User has been added successfully.");
      setErrorMessage(""); // Clear any previous error message
      setDialogOpen(true);
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.message);
        setDialogOpen(true);
      } else {
        console.error("Error:", err.message);
      }
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "POST https://api.cloudinary.com/v1_1/dhpnjtv5f/image/upload"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
      <ErrorDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        message={errorMessage || successMessage}
      />
    </div>
  );
};

export default New;
