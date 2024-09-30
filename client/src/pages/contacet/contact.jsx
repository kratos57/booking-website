import React, { useState } from 'react';
import './contact.css';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import MessengerIcon from '../../components/messenger/messenger';

function Contact() {
    const messengerLink = "m.me/286507847871480";
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        emailTo: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/send-email', formData);
            if (response.status === 200) {
                alert('Email sent successfully!');
                // Clear form fields after successful submission
                setFormData({
                    name: '',
                    email: '',
                    emailTo: '',
                    phone: '',
                    message: ''
                });
            } else {
                alert('Failed to send email. Please try again later.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again later.');
        }
    };

    return (
        <div>
        <Navbar />
        <div className="contact-container">
          
            <div className="contact-content">
                <div className="contact-photo">
                    <img src="https://cdn-icons-png.flaticon.com/512/1034/1034153.png" alt="Contact" />
                </div>
                <div className="contact-form">
                    <h4 className="third-text text">Contact Us</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailTo">Email to</label>
                            <input type="email" id="emailTo" name="emailTo" value={formData.emailTo} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
                        </div>
                        <button type="submit" className='btn'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
        <MessengerIcon messengerLink={messengerLink} />
      <MailList/>
        <Footer/>
        </div>
    );
}

export default Contact;
