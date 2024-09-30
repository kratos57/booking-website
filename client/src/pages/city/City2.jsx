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
  
  // Use city in the URL for fetching data
  const city = location.state?.city || 'manoba'; 
  const { data, loading } = useFetch(`/hotels?city=${city}&min=${min || 0}&max=${max || 999}&minD=${minD || 0}&maxD=${maxD || 999}`);

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
                    minimom 9reb <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMinD(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max bo3ed <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMaxD(e.target.value)}
                    className="lsOptionInput"
                  />
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
      <MailList/>
        <Footer/>
    </div>
  );
};

export default City;