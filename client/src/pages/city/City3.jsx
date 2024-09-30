import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import MessengerIcon from '../../components/messenger/messenger';
import './city.css';

const City = () => {
  const messengerLink = "m.me/286507847871480";
  const location = useLocation(); 

  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [minD, setMinD] = useState(undefined);
  const [maxD, setMaxD] = useState(undefined);
  const [amenities, setAmenities] = useState([]);

  const city = location.state?.city || 'hotel';
  const { data, loading } = useFetch(`/hotels?type=hotel&min=${min || 0}&max=${max || 999}&minD=${minD || 0}&maxD=${maxD || 999}&amenities=${amenities.join(',')}`);

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((amenity) => amenity !== value));
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <h1>{city}</h1>
          <div className="listSearch">
            <>
              <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMin(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMax(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min distance <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMinD(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max distance <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMaxD(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                </div>
              </div>
              <div className="lsItem">
                <label>Amenities</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <input
                      type="checkbox"
                      value="Free Wi-Fi"
                      onChange={handleAmenityChange}
                    />
                    <label>Free Wi-Fi</label>
                  </div>
                  <div className="lsOptionItem">
                    <input
                      type="checkbox"
                      value="Room Service"
                      onChange={handleAmenityChange}
                    />
                    <label>Room Service</label>
                  </div>
                  <div className="lsOptionItem">
                    <input
                      type="checkbox"
                      value="Pets Allowed"
                      onChange={handleAmenityChange}
                    />
                    <label>Pets Allowed</label>
                  </div>
                  <div className="lsOptionItem">
                    <input
                      type="checkbox"
                      value="Restaurant"
                      onChange={handleAmenityChange}
                    />
                    <label>Restaurant</label>
                  </div>
                  <div className="lsOptionItem">
                    <input
                      type="checkbox"
                      value="24-hour Reception"
                      onChange={handleAmenityChange}
                    />
                    <label>24-hour Reception</label>
                  </div>
                  <div className="lsOptionItem">
                    <input
                      type="checkbox"
                      value="Fitness Center"
                      onChange={handleAmenityChange}
                    />
                    <label>Fitness Center</label>
                  </div>
                  <div className="lsOptionItem">
                    <input
                      type="checkbox"
                      value="Swimming Pool"
                      onChange={handleAmenityChange}
                    />
                    <label>Swimming Pool</label>
                  </div>
                </div>
              </div>
            </>
          </div>
          <div className="listResult">
            {loading ? (
              'loading'
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <MessengerIcon messengerLink={messengerLink} />
      <MailList />
      <Footer />
    </div>
  );
};

export default City;
