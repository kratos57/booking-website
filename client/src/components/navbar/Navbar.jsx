import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import DashboardModal from "../dashboard/dashboard"; // Assuming the correct path to DashboardModal
import "./navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDashboardModalOpen, setDashboardModalOpen] = useState(false);

  const handleLogout = () => {
    // Call the logout function from the AuthContext
    logout();
  };

  const openDashboardModal = () => {
    setDashboardModalOpen(true);
  };

  const closeDashboardModal = () => {
    setDashboardModalOpen(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <span className="logo">PlaceHolder</span>
          </Link>
          {user ? (
            <div className="navItems">
              <span onClick={openDashboardModal} style={{ cursor: "pointer" }}>
                Dashboard
              </span>
              <span>Welcome, {user.username}</span>
              <button onClick={handleLogout} className="navButton">
                Logout
              </button>
            </div>
          ) : (
            <div className="navItems">
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <button className="navButton">Register</button>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button className="navButton">Login</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {isDashboardModalOpen && (
        <DashboardModal onClose={closeDashboardModal} />
      )}
    </>
  );
};

export default Navbar;
