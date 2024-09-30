import { useEffect, useState } from 'react';
import axios from 'axios';
import "./topRatedProperties.css";
import { Link } from "react-router-dom";

const TopRatedProperties = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/hotels/hotels/top-rated");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top-rated hotels:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <Link to={`/hotels/${item._id}`}>
                <img src={item.photos[0]} alt="" className="fpImg" />
              </Link>
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpCity">{item.type}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TopRatedProperties;
