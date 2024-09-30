import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import './BlogList.scss'; // Import your CSS file for styling
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import MessengerIcon from '../../components/messenger/messenger';
const BlogList = () => {
  const messengerLink = "m.me/286507847871480";
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/posts');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs(); // Fetch blogs on component mount
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <h2>Blog Posts</h2>
      {blogs.map((blog, index) => (
        <div key={blog._id} className={`blog-card ${index % 2 === 0 ? '' : 'alt'}`}>
          <div className="meta">
            <div className="photo" style={{backgroundImage: `url(${blog.image})`}}></div>
            <ul className="details">
              <li className="author"><a href="/contact">Contact</a></li>
              <li className="tags">
                <ul>
                  <li><a href={`/blog/${blog._id}`}>Learn</a></li>             
                </ul>
              </li>
            </ul>
          </div>
          <div className="description">
            <h1>{blog.title}</h1>
            <h2>{blog.category}</h2>
            <p>{truncateText(blog.description, 20)}</p>
            <p className="read-more">
              <a href={`/blog/${blog._id}`} className="read-more">Read More</a>
            </p>
          </div>
        </div>
      ))}
       <MessengerIcon messengerLink={messengerLink} />
       <MailList/>
      <Footer/>
    </div>
  );
};

export default BlogList;
