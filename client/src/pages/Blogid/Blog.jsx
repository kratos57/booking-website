import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useParams } from 'react-router-dom'; 
import MailList from "../../components/mailList/MailList";
import './Blog.scss';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/posts/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    fetchBlog();

    return () => {
      setBlog(null);
    };
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="blog-post-container">
        {blog ? (
          <div>
            <h3 className="blog-post-title">{blog.title}</h3>
            <img
              src={blog.image}
              alt=""
              className="siImgp"
            />
           
            <p className="blog-post-description"><b></b>description {blog.description}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default BlogPost;
