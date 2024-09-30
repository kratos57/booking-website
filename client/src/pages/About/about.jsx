import React from 'react';
import './about.css'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faFacebook, faPinterest } from '@fortawesome/free-brands-svg-icons'; // Assuming you're using Font Awesome Free version
import Navbar from '../../components/navbar/Navbar';
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
const AboutUs = () => {
    return (<div>
        <Navbar />
        <div className='body'>
        
       
        
        <div className='section'>
            
            <div className="image">
                {/* Image here */}
            </div>

            <div className="content">
                <h2>About Us</h2>
                <span>bouking</span>

                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis aspernatur voluptas inventore ab voluptates nostrum minus illo laborum harum laudantium earum ut, temporibus fugiat sequi explicabo facilis unde quos corporis!</p>

                <ul className="links">
                    <li><a href="#">work</a></li>

                    <div className="vertical-line"></div>

                    <li><a href="team">team</a></li>

                    <div className="vertical-line"></div>
                    
                    <li><a href="contact">contact</a></li>
                </ul>

                <ul className="icons">
                    <li>
                        <FontAwesomeIcon icon={faGithub} />
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faTwitter} />
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faFacebook} />
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faPinterest} />
                    </li>
                </ul>
            </div>
        </div></div>
        <MailList/>
        <Footer/>
        
        </div>
       
    );
};

export default AboutUs;
