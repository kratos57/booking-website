import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './landing.css'; // Assuming you have the corresponding CSS file

function LandingPage() {
  return (
    <header>
      <nav>
        <div className="logo">
          Place Holder
        </div>
        <div className="menu">
          {/* Use Link instead of <a> for navigation */}
          <Link to="/">Home</Link>
          <Link to="#">Explore</Link> {/* Assuming you have an ExplorePage component */}
          <Link to="/contact">Contact</Link> {/* Assuming you have a ContactPage component */}
        </div>
        <div className="register">
          {/* Link to the register page */}
          <Link to="/signup">Register</Link>
        </div>
      </nav>
      <section className="h-text">
        <span>Enjoy</span>
        <h1>Explore the World</h1>
        <br />
        <Link to="#">Visit Now</Link> {/* Link to the ExplorePage */}
      </section>
    </header>
  );
}

export default LandingPage;
