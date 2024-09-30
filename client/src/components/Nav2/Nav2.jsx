// src/components/Nav2/Nav2.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Nav2.css'; // Import your CSS file for styling

const Nav2 = () => {
  const [data, setData] = useState([]);
  const [dropdown, setDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/hotels/hotels/type-and-cities');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMouseEnter = (type) => {
    setDropdown(type);
  };

  const handleMouseLeave = () => {
    setDropdown(null);
  };

  const handleCityClick = (city, type) => {
    navigate('/hotels', { state: { destination: city.toLowerCase(), type } });
  };

  return (
    <nav className="nav2">
      <ul className="navbar-list">
        {data.map((item) => (
          <li
            key={item.type}
            className="navbar-item"
            onMouseEnter={() => handleMouseEnter(item.type)}
            onMouseLeave={handleMouseLeave}
          >
            {item.type}
            {dropdown === item.type && (
              <ul className="dropdown">
                {item.cities.map((city) => (
                  <li
                    key={city}
                    className="dropdown-item"
                    onClick={() => handleCityClick(city, item.type)}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav2;
