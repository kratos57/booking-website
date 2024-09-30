import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import MessengerIcon from '../../components/messenger/messenger';

import axios from 'axios';

const List = () => {
  const messengerLink = "m.me/286507847871480";
  const location = useLocation();
  const [destination, setDestination] = useState(
    location.state ? location.state.destination.toLowerCase() : localStorage.getItem("destination")
  );
  const [selectedType, setSelectedType] = useState(location.state ? location.state.type : "");
  const [dates, setDates] = useState(location.state?.dates || []);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state?.options || {});
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [types, setTypes] = useState([]);

  const { data, loading, error, refetch } = useFetch(
    `/hotels?city=${destination}&type=${selectedType || "hotel"}&min=${min || 0}&max=${max || 999}`
  );

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('/hotels/hotels/types');
        setTypes(response.data);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    if (location.state && location.state.destination) {
      setDestination(location.state.destination.toLowerCase());
    }
  }, [location.state.destination]);

  useEffect(() => {
    localStorage.setItem("destination", destination);
  }, [destination]);

  useEffect(() => {
    const inputDestination = document.getElementById("destinationInput");
    if (inputDestination) {
      inputDestination.value = destination;
    }
  }, [destination]);

  useEffect(() => {
    if (destination && selectedType) {
      fetchData();
    }
  }, [destination, selectedType]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/hotels?city=${destination}&type=${selectedType}&min=${min || 0}&max=${max || 999}`);
      // Handle the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                id="destinationInput"
                placeholder={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value.toLowerCase())}
              />
            </div>
            <div className="headerSearchItem">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="headerSelect"
              >
                <option value="">Select type</option>
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
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
              </div>
            </div>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
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

export default List;
