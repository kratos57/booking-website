// AboutUs.jsx

import React from 'react';
import './Team.css'; // Import the CSS file for styling
import Navbar from '../../components/navbar/Navbar';
import '@fortawesome/fontawesome-free/css/all.css';
import Footer from '../../components/footer/Footer';
import MailList from '../../components/mailList/MailList';



const team = () => {
  return (
    <div>
      
      <Navbar />
      
  <div class="container">
    
  <div class="card-wrapper">
    
    <div class="card">
      
      <div class="card-image">
        <img src="https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/277806944_1019809408952216_5570190700584193353_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=u1CLmVXGFKgAb7IMltj&_nc_ht=scontent.ftun16-1.fna&oh=00_AfCmzc1asaFf0PPT2BluVA0iFUtzqtPxaVEvlnvLVSKBxA&oe=6628CD04" alt="profile one"></img>
      </div>

    <ul class="social-icons">
      <li>
        <a href="https://www.facebook.com/profile.php?id=100027695002242">
          <i class="fab fa-facebook-f"></i>
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/ahmed__abdellii">
          <i class="fab fa-instagram"></i>
        </a>
      </li>
      <li>
        <a href="">
          <i class="fab fa-twitter"></i>
        </a>
      </li>
      <li>
        <a href="">
        <i className="fab fa-linkedin"></i>

        </a>
      </li>
    </ul>

    <div class="details">
      <h2>Ahmed Abdeli
        <br></br>
        <span class="job-title">UI Developer</span>
      </h2>
    </div>
  </div>
</div>
  
  
<div class="card-wrapper">
    
    <div class="card profile-two">
      
      <div class="card-image profile-img--two">
        <img src="https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/239190425_3042346102717289_5284124851034006077_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=me70UYBEoscAb49mpdi&_nc_ht=scontent.ftun16-1.fna&oh=00_AfDkSXfcWgoG1xMnEymUsAktDqUWdGlI7cL79qO1OqCBXg&oe=66271061"  alt="profile two"></img>
      </div>

      <ul class="social-icons">
        <li>
          <a href="https://www.facebook.com/ghaith.awachri.9">
            <i class="fab fa-facebook-f"></i>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/ghaithawachri/">
            <i class="fab fa-instagram"></i>
          </a>
        </li>
        <li>
          <a href="">
            <i class="fab fa-twitter"></i>
          </a>
        </li>
        <li>
          <a href="">
          <i className="fab fa-linkedin"></i>

          </a>
        </li>
      </ul>

      <div class="details jane">
          <h2>Ghaith Awachri
            <br></br>
            <span class="job-title">UI Designer</span>
          </h2>
      </div>
  </div>
</div>
   
</div>
<MailList/>
        <Footer/>
</div>
  );
};

export default team;
