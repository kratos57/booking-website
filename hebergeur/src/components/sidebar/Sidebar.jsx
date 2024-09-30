import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { DarkModeContext } from "../../context/darkModeContext";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import React from "react";


import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { FaUserSecret,
  FaHotel,
 } from "react-icons/fa6";
 import { MdOutlineHotel } from 'react-icons/md';
 import { GiFamilyHouse } from "react-icons/gi";
 import { GiWoodenChair } from "react-icons/gi";
 import { MdCastForEducation } from "react-icons/md";
 import { GiCampingTent } from "react-icons/gi";
 import { PiTent } from "react-icons/pi";
 import { LuPartyPopper } from "react-icons/lu";
 import { IoTicketOutline } from "react-icons/io5";
 import { FaRegUser } from "react-icons/fa";
 import { MdHotel } from "react-icons/md";
 import { CgProfile } from "react-icons/cg";
 import { CiLogin } from "react-icons/ci";


const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="sidebar">
      <div className="center">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">PlaceHolder</span>
        </Link>
      </div>
        <ul>
          
          <div>
            {user.taype && user.taype.includes("hotel") && (
              
              <React.Fragment>
                <p className="title">LISTS Hotels</p>
                <Link to="/hotels" style={{ textDecoration: "none" }}>
                  <li>
                  <FaHotel />
                    <span>Hotels</span>
                  </li>
                </Link>
                <Link to="/rooms" style={{ textDecoration: "none" }}>
                  <li>
                  <MdOutlineHotel />
                    <span>Rooms</span>
                  </li>
                </Link>
              </React.Fragment>
            )}
          </div>
          <div>
            {user.taype && user.taype.includes("formation") && (
              <React.Fragment>
                <p className="title">LISTS Formation</p>
                <Link to="/formation" style={{ textDecoration: "none" }}>
                  <li>
                  <MdCastForEducation />
                    <span>Formation</span>
                  </li>
                </Link>
                <Link to="/place"  style={{ textDecoration: "none" }}>
                  <li>
                  <GiWoodenChair />
                    <span>place</span>
                  </li>
                </Link>
              </React.Fragment>
            )}
          </div>
          <div>
            {user.taype && user.taype.includes("maison d'hôtes") && (
              <React.Fragment>
                <p className="title">LISTS Maison D'hote</p>
                <Link to="/mison"  style={{ textDecoration: "none" }}>
                  <li>
                  <GiFamilyHouse />
                    <span>Maison D'hote</span>
                  </li>
                </Link>
                <Link to="/misonro"   style={{ textDecoration: "none" }}>
                  <li>
                  <MdHotel />
                    <span>Maison Room</span>
                  </li>
                </Link>
              </React.Fragment>
            )}
          </div>
          <div>
            {user.taype && user.taype.includes("camping" ) && (
              <React.Fragment>
                <p className="title">LISTS Camping</p>
                <Link to="/camping"   style={{ textDecoration: "none" }}>
                  <li>
                  <GiCampingTent />
                    <span>Camping</span>
                  </li>
                </Link>
                <Link to="/tont"   style={{ textDecoration: "none" }}>
                  <li>
                  <GiCampingTent />
                    <span>Tent</span>
                  </li>
                </Link>
              </React.Fragment>
            )}
          </div>
          <div>
            {user.taype && user.taype.includes("evenements" ) && (
              <React.Fragment>
                <p className="title">LISTS Evenements</p>
                <Link to="/evenements"   style={{ textDecoration: "none" }}>
                  <li>
                  <LuPartyPopper />
                    <span>Evenements</span>
                  </li>
                </Link>
                <Link to="/ticket"   style={{ textDecoration: "none" }}>
                  <li>
                  <IoTicketOutline />
                    <span>Ticket</span>
                  </li>
                </Link>
              </React.Fragment>
            )}
          </div>
          {/* Add other types as needed */}
          <p className="title">USEFUL</p>
          <Link to="/order" style={{ textDecoration: "none" }}>
            <li>
            <CreditCardIcon className="icon" />
              <span>order</span>
            </li>
          </Link>
          <Link to="/history" style={{ textDecoration: "none" }}>
            <li>
            <CreditCardIcon className="icon" />
              <span>history order</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <Link to="/profil" style={{ textDecoration: "none" }}>
            <CgProfile />
              <span>Profile</span>
            </Link>
          </li>
          <li onClick={() => dispatch({ type: "LOGOUT" })}>
          <CiLogin />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
