import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { DarkModeContext } from "../../context/darkModeContext";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
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




import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";




const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">PlaceHolder</span>
        </Link>
      </div>
      <hr />
      <div className="center">
  <ul>
    
    <p className="title">LISTS Users</p>
    <li>
      <Link to="/users" style={{ textDecoration: "none" }}>
      <FaRegUser />
        <span>Users</span>
      </Link>
    </li>
    <p className="title">LISTS Hebergeur</p>
    <li>
      <Link to="/hebergeur" style={{ textDecoration: "none" }}>
      <FaUserSecret />
        <span>Hebergeur</span>
      </Link>
    </li>
    <li>
      <Link to="/hebergeuratt" style={{ textDecoration: "none" }}>
      <FaUserSecret />
        <span>Hebergeur Attendre</span>
      </Link>
    </li>
    <p className="title">LISTS Hotels</p>
    <li>
      <Link to="/hotels" style={{ textDecoration: "none" }}>
      <FaHotel />
        <span>Hotels</span>
      </Link>
    </li>
    <li>
      <Link to="/rooms" style={{ textDecoration: "none" }}>
      <MdOutlineHotel />
        <span>Rooms</span>
      </Link>
    </li>
    <p className="title">LISTS Formation</p>
    <Link to="/formation" style={{ textDecoration: "none" }}>
            <li>
            <MdCastForEducation />
              <span>Formation</span>
            </li>
          </Link>
          <Link to="/place" style={{ textDecoration: "none" }}>
          <li>
          <GiWoodenChair />
            <span>place</span>
          </li>
          </Link>
          <p className="title">LISTS Maison d'hote</p>
          <Link to="/mison" style={{ textDecoration: "none" }}>
            <li>
            <GiFamilyHouse />

              <span>Maison d'hote</span>
            </li>
          </Link>
          <Link to="/misonro" style={{ textDecoration: "none" }}>
          <li>
          <MdHotel />
            <span>Maison room</span>
          </li>
          </Link>
          <p className="title">LISTS Camping</p>
          <Link to="/camping" style={{ textDecoration: "none" }}>
            <li>
            <GiCampingTent />
              <span>Camping</span>
            </li>
          </Link>
          <Link to="/tont" style={{ textDecoration: "none" }}>
          <li>
          <GiCampingTent />
            <span>tent</span>
          </li>
          </Link>
          <p className="title">LISTS Evenement</p>

          <Link to="/evenements" style={{ textDecoration: "none" }}>
            <li>
            <LuPartyPopper />

              <span>Evenement</span>
            </li>
          </Link>
          <Link to="/ticket" style={{ textDecoration: "none" }}>
          <li>
          <IoTicketOutline />
            <span>ticket</span>
          </li>
          </Link>
          <p className="title">LISTS Order</p>
    <li>
    

      <Link to="/order" style={{ textDecoration: "none" }}>
        <CreditCardIcon className="icon" />
        <span>Order</span>
      </Link>
    </li>
    
    <li>
      <Link to="/completed" style={{ textDecoration: "none" }}>
        <CreditCardIcon className="icon" />
        <span>completed</span>
      </Link>
    </li>
    <p className="title">LISTS Attendre</p>
    <li>
  

      <Link to="/attendre" style={{ textDecoration: "none" }}>
        <CreditCardIcon className="icon" />
        <span>Attendre</span>
      </Link>
    </li>
    <p className="title">BLOGS</p> {/* New section for Blogs */}
    <li>
      <Link to="/posts" style={{ textDecoration: "none" }}> {/* Assuming "/blogs" is the route for Blogs */}
        <ArticleOutlinedIcon className="icon" /> {/* Use the blog icon here */}
        <span>Blogs</span>
      </Link>
    </li>
  

    <p className="title">Profile</p>
    <li>
      <Link to="/profil" style={{ textDecoration: "none" }}> {/* Assuming "/blogs" is the route for Blogs */}
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
