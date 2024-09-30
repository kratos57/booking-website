import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationDialogue from "../notificationdialogue/dialouge";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../../../admin/src/context/AuthContext";
import { useContext, useState, useEffect } from "react";

const Navbar = () => {
  const [showDialogue, setShowDialogue] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0); // Initialize notificationCount state
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(DarkModeContext);

  const toggleDialogue = () => {
    setShowDialogue(prevState => !prevState);
  };

  useEffect(() => {
    async function fetchNotificationCount() {
      try {
        const response = await fetch(`/notification/sum/admin`); // Assuming user.id is the 'to' parameter
        const data = await response.json();
        setNotificationCount(data.sum);
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    }

    fetchNotificationCount();
  }, [user.id]); // Trigger fetch when user.id changes

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search"></div>
        <div className="items">
          <div className="item" onClick={toggleDialogue}>
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">{notificationCount}</div>
          </div>
          <div className="item">
            <h1>Hello {user.username}</h1>
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <img
              className="avatar"
              src={user.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
              alt="avatar"
            />
          </div>
        </div>
      </div>
      {showDialogue && (
        <div className="overlay" onClick={toggleDialogue}>
          <NotificationDialogue onClose={toggleDialogue} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
