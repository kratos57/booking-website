import React, { useContext, useState, useEffect, useRef } from "react";
import {
  faInfoCircle,
  faBed,
  faBookOpen,
  faHeart,
  faEnvelope,
  faCalendarDays,
  faPerson,
  faMicrophone
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import axios from 'axios';

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const navigate = useNavigate();
  const destinationInputRef = useRef(null);

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

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleVoiceSearch = () => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser. Please type your destination manually.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition(); // Initializing SpeechRecognition API
    recognition.lang = "en-US"; // Set language to English
    recognition.start(); // Start speech recognition

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript; // Get the transcribed text
      setDestination(transcript); // Set the transcribed text to destination input
      recognition.stop(); // Stop speech recognition
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error occurred: ", event.error);
      alert("Speech recognition error occurred. Please try again or type your destination manually.");
    };
  };

  const handleSearch = () => {
    // Validate if destination is entered
    if (!destination.trim()) {
      alert("Please enter a destination");
      return; // Exit function if destination is not entered
    }

    // Convert destination to lowercase
    const lowerCaseDestination = destination.toLowerCase();

    // Dispatch the action with the lowercase destination
    dispatch({ type: "NEW_SEARCH", payload: { destination: lowerCaseDestination, type: selectedType, dates, options } });

    // Navigate to the hotels page with the lowercase destination
    navigate("/hotels", { state: { destination: lowerCaseDestination, type: selectedType } });

  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free PlaceHolder account
            </p>

            <div className="headerList">
              <a href="about">
                <div className="headerListItem active">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>À propos</span>
                </div>
              </a>
              <a href="blog">
                <div className="headerListItem active ">
                  <FontAwesomeIcon icon={faBookOpen} />
                  <span>Blog</span>
                </div>
              </a>
              <a href="favorites">
                <div className="headerListItem active">
                  <FontAwesomeIcon icon={faHeart} />
                  <span>Favoris</span>
                </div>
              </a>
              <a href="contact">
                <div className="headerListItem active">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>Contact</span>
                </div>
              </a>
            </div>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  ref={destinationInputRef}
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
                {("SpeechRecognition" in window || "webkitSpeechRecognition" in window) && (
                  <button
                    className="headerVoiceSearchBtn"
                    onClick={handleVoiceSearch}
                  >
                    <FontAwesomeIcon icon={faMicrophone} />
                  </button>
                )}
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

              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="headerIcon"
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="datey"
                    minDate={new Date()}
                  />
                )}
              </div>

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
