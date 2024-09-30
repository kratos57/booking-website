import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import SearchItem from "../../components/searchItem/SearchItem";// Import the SearchItem component
import "./favoritesPage.css"; // Import CSS for styling
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";

const FavoritesPage = () => {
  const { user } = useContext(AuthContext); // Get user object from AuthContext
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (user) { // Check if user is available
          const response = await axios.get(`http://localhost:8800/api/auth/user/favorites/${user.username}`);
          setFavorites(response.data.favorites);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [user]); // Add user to dependency array to re-fetch favorites when user changes

  const removeFromFavorites = async (hotelId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to remove this hotel from favorites?");
      if (confirmed) {
        await axios.post("http://localhost:8800/api/auth/user/favorites/remove", {
          username: user.username,
          hotelId: hotelId,
        });
        // Filter out the removed hotel from the favorites array
        setFavorites(favorites.filter(favorite => favorite._id !== hotelId));
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };
  
  return (
    <div>
      <Navbar />
    <div className="favoritesPage">
      
      <h1 className="favoritesTitle">My Favorite</h1>
      <div className="favoritesList">
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <div key={favorite._id} className="favoriteItem">
              <SearchItem item={favorite} /> {/* Render the SearchItem component with the favorite hotel details */}
              <button className="removeButton" onClick={() => removeFromFavorites(favorite._id)}>Remove from Favorites</button>
            </div>
          ))
        ) : (
          <p className="emptyMessage">You haven't added any hotels to favorites yet.</p>
        )}
      </div>
    </div>
    <MailList/>
        <Footer/>
    </div>
  );
};

export default FavoritesPage;
