import { DateRange } from "react-date-range";
import { format } from "date-fns";
import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import Reserve from "../../components/reserve/Reserve";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import MessengerIcon from '../../components/messenger/messenger';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Import axios for API requests
import "./hotel.css";

const Hotel = () => {
  const messengerLink = "m.me/286507847871480";
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [ratingValue, setRatingValue] = useState(0); // State for rating value
  const [averageRating, setaverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0); // State for total ratings
  const [userRating, setUserRating] = useState(null); // State to store user's rating
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [amenities, setAmenities] = useState([]); // State for amenities
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`/hotels/find/${id}`);
        if (response.data.startDate && response.data.endDate) {
          // If startDate and endDate exist, update the dates state
          setDates([
            {
              startDate: new Date(response.data.startDate),
              endDate: new Date(response.data.endDate),
              key: "selection",
            },
          ]);
        }
        setAmenities(response.data.amenities); // Set amenities from response
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotelData();
  }, [id]);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  };
  const days = dates && dates.length > 0 && dates[0].endDate
    ? dayDifference(new Date(dates[0].endDate), new Date(dates[0].startDate)) + 1
    : 0;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber =
      direction === "l" ? (slideNumber === 0 ? 5 : slideNumber - 1) : slideNumber === 5 ? 0 : slideNumber + 1;
    setSlideNumber(newSlideNumber);
  };

  const { dispatch } = useContext(SearchContext);
  const handleClick = () => {
    dispatch({ type: "NEW_SEARCH", payload: { dates } });
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  // Function to handle rating change
  const handleRatingChange = (value) => {
    setRatingValue(value);
  };

  const handleRatingSubmit = async () => {
    if (!user) {
      console.error("User not authenticated. Please log in to submit a rating.");
      return;
    }
  
    try {
      const notificationData = {
        img: user.img,
        namee: `${user.username}`,
        message: `your ${data.type} ${data.name} has new rating =${ratingValue} `,
        to: data.namek, 
      };
      await axios.post("/notification/creat", notificationData);
      const response = await axios.post(`/hotels/${id}/rate`, {
        userId: user._id, // Change user.id to user._id to ensure correct user ID
        ratingValue: ratingValue,
      });
  
      if (response.status === 201) {
        console.log("Rating submitted successfully!");
        setUserRating(ratingValue); // Update userRating state to prevent further rating
      } else {
        console.error("Failed to submit rating:", response.data.message);
      }
      setShowSuccessMessage(true); // Show success message
      setTimeout(() => {
        setShowSuccessMessage(false); // Hide success message after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error submitting rating:", error);
      // Handle specific error cases if needed
      if (error.response && error.response.data && error.response.data.message) {
        // Display the error message from the server response in a window
        window.alert(error.response.data.message);
      } else {
        // Display a generic error message
        window.alert("An error occurred while submitting the rating. Please try again later.");
      }
    }
  };
  

  
  


  // Fetch total ratings for the hotel
  useEffect(() => {
    const fetchTotalRatings = async () => {
      try {
        const response = await axios.get(`/hotels/${id}`);
        setTotalRatings(response.data.totalRatings);
        setaverageRating(response.data.averageRating);
      } catch (error) {
        console.error("Error fetching total ratings:", error);
      }
    };

    fetchTotalRatings();
  }, [id]);

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(`http://localhost:8800/api/auth/user/favorites/add`, {
        username: user.username,
        hotelId: id,
      });
      console.log(response.data.message); // Log success message
      setShowSuccessMessage(true); // Show success message
      setTimeout(() => {
        setShowSuccessMessage(false); // Hide success message after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };


  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
              <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
              <div className="sliderWrapper">
                <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
            </div>
          )}
          <div className="hotelWrapper">
            <div className="bookNow">
              <div className="ratingSection">
                <h3>Rate </h3>
                <div className="ratingStars">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <FontAwesomeIcon
                      key={value}
                      icon={faStar}
                      className={value <= ratingValue ? "filled" : ""}
                      onClick={() => setRatingValue(value)}
                    />
                  ))}
                </div>
                <button disabled={!user} onClick={handleRatingSubmit}>
                  Submit Rating
                </button>
              </div>
              {showSuccessMessage && (
                <div className="success-message">
                  Rating submitted successfully!
                </div>
              )}
              <div className="totalRatingSection">
                <h3>averageRating: {(averageRating / totalRatings).toFixed(1)}/5</h3>
                <h3>Total Ratings: {totalRatings}</h3>
              </div>
            </div>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">Excellent location – {data.distance}m from center</span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img onClick={() => handleOpen(i)} src={photo} alt="" className="hotelImg" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.type} title : {data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
                <br />
                
                {data.img ? (
  <>
    <h1>formature</h1>
    <div className="fir-image-figure">
      <img
        className="avatar"
        src={data.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
        alt="avatar"
      />
      <figcaption>
        <div className="fig-author-figure-titlee">{data.nameformature}</div>
        <div className="fig-author-figure-titlee">{data.gmailformature}</div>
        <div className="fig-author-figure-titlee">{data.telformature}</div>
      </figcaption>
    </div>
  </>
) : null}
<di className="messenger-icone">
<h1>Contact Us</h1>
<div className="fir-image-figure">
  <br /><br /><br />
  <a className="fir-imageover" rel="noopener" target="_blank" href="/contact">
<img className="fir-author-image fir-clickcircle" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDw8NDw8NDQ0NDQ4NDQ0NDQ8NDg0NFREWFiARExUYHSggGBomGxUVIj0hJSkrLi4uFx8zODMuOCgtLisBCgoKDg0OGhAQFS8lIB8yLSssKy83Ny0tListLy0tKy0rLys3LS0rKy0tLSsrKysrLS0tLSstLS0rLS0tKy0rLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEAAQUBAAAAAAAAAAAAAAAABgECAwUHBP/EAEEQAAEDAgEFCwsDAwUBAAAAAAABAgMREgQFBiExcRMUFjJBUVJhkrHRIjNCU3KBkaGywdIjJGIHc4I0Q6Lw8VT/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQQFAwIG/8QAMREBAAIAAwUIAgEFAAMAAAAAAAECAxExBBIyUrETIVFxgZHB0UFhMwUiQqHwFCND/9oADAMBAAIRAxEAPwDuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApUBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVAqAAAAAAAAAAAAGGfENjRVcqIiJVVVaIgmciZyaPE5eV2iFtU9Y+rWrsTWvyKttp5Iz/AGr22iP8YeJ2PxDtctvVHG1E/wCVTl22JP5/195uXa3n8/8Af7U33N6+Tsw/gO1xObp9I7W/N0N9Tevk7MP4DtcTm6fR2t+bob6m9fJ2YfwI7XE5un0drfm6G+pvXydmH8Ce1xObp9Ha35uhvqb18nZh/Adric3T6O1vzdDfU3r5OzD+A7XE5un0drfm6G+pvXydmH8B2uJzdPo7W/N0N9Tevk7MP4DtcTm6fR2t+bob6m9fJ2YfwI7XE5un0drfm6G+pvXydmH8Ce1xObp9Ha35uhvqb18nZh/Adric3T6O1vzdDfU3r5OzD+A7XE5un0drfm6G+pvXydmH8B2uJzdPo7W/N0N9Tevk7MP4DtcTm6fR2t+bob7n9fJ72xfiR2uJzdDtb83RmiytiGa9zlTYsbvjVUX4Ie67ReNcp/09xj3jXvbfJ+V2TeTpa9NbHaHJ19adaFnDxa3018HemJW+jZItTo6KgAAAAAAAYcTMjGqq6KIBEMZjFxLrlruSL+mzkd/N32T3mfi4naT+uv7+lHExN+f0sqc3gqSFSAqAqSFSAqAqSFSAqAqSFSAqAqSFSAqAqSFSBa9K00qiotWuboc1edFCG9yJlNX1jfRJG6+ZydJC9g4u/HfrC7hYm/HfrDeIp2dVQAAAAAKBGM5cUq2wovHWjvYTSvh7yvtNsqZR+f8ApcNotlXLxampSVC4kLgFwCoC4gLiQuAXALgFQFxAXEhcAuAXAKgLiAuJC4CiTLG9kqeg5Ed1sXQv2X3Hqlt28S9Utu2iU2wUt7UXqNJoPQAAAAAFsi6FAg2VZLsSv8WL81QpbVxV9fhU2nij1YaldXKgKgKgKgKgKgKgKgKgKgKgKgKgKgKgKgKgKgKgWTrVjvZXuPNtJROiV5uS3RN9lO41o0acaNySkAAAAGOfiqBAcoL+5f7H3KO1cUevwp7TxQsuK7gXBBcAuAo59CBs8FkTETNvo2Jq8XdKo5yc9ETQd6YF7Rno7VwbWjNnXNrEIi+XCujVV2nq1Hr/AMa3i9f+PbxaZ1WucxyWuaqtci8ioV5iYnKXCe6cpLgguAXALgFwSXBBcAuAXALgFwSXBCyV3ku9le4820lFtJSjNRf0m7ENeNGpGiQEpAAAABjn4qgc/wApr+4d7H3KO18VfX4U9p4o9WG4rK5UBcAuA22bGT0xEqyPSsUNKIup0nJ7k8Dvs+HvWznSHbApvTnP4TQ0F4AhmdmF3LEJKnFnbp/uNRE7qfAobTXK294qO0Vytn4tRcV3EuAVAXALgFQFwC4BUBcAuAVAtkXyXeyvcebaSi2iV5qeabsQ2I0akaJCSkAAAAGOfiqBz3Ky/uHex9yjtfFX1+FPauKPV57iqrFwC4Cj3aFIE3zShswca8sl0q9dzlp/xoaWzxlhwv7PGVIbg7uwBqc6MFu+GfRKvi/WZtai1T4Kpxx6b1J/Tjj03qeSCsfVKmZmz11xKS4BcAuAXALgFwC4BcAuAXAWyO8ldi9x5tpKJ0S/NTzTdiGzGjVjRISUgAAAAxz8VQOd5ZWmId7P3KG2cVfX4Utq4o9XjuKisXALgLJneSoRLo+byouDwyp/88f0oa2D/HXyaeFwR5NgdHQAAczynhd7YiWHU1rro/7a6U8PcZGLTcvMMvEruWmHnuPDyXALgFwC4BcAuAXALgFwC4Cj3aF2L3EW0lE6Jpmp5puxDajRrRokJKQAAAAY5+KoHN8vLTEL7P3M/beKvr8KO18UerwXlPNVLwF4FHuqgE7zFxO6YNrF40Mj412VuT5Op7jT2S2eHl4NDZrZ4eXgkJZWACjnIiKqqiIiVVV0Iic6gcsyrlBMTiZpmrVjnWxrq/TalEX7+8x8W+/eZhlYl9+8ywXnN4LwF4C8ZheAvAXgLwF4C8ZheBR79C7FItPdKJ0TvNTzTdiG5GjYjRISUgAAAAxz8VQOWZ4OVJkVFoqVMr+o8dPKfhnbbxV9fhqocdyO+KFSL+KrFnpbIi6UWqHrN6VvJzC8ZiQ5gY/c8TJh14s7L2/3Gcnvaq9kt7HfK018VnZb5Wmvi6CaTQAIR/UDLD0cmAZVqPY2Sd3K5iqqIxOrRVfcUNsxZj+yPVS2rFnghEmLRKFBTXXk5heMwvGYXjMLxmF4zC8ZheMwvGYXjMFkGY88mMTU3TXRXkOWJfKs5PFrdzpOanmm7EPoY0bcaJCSkAAAAGOfiqByvPHzye8yv6jx08p+Gdt3FX1+EeKCmq1ypqVU2AZm4lya9PyPW9Kc2VuJTrQneTmvixiwyMnjVL4no9umlaci9S6vee633Zi0fhMW3ZiY/DseCxTZ4mTMWrJGI9uxU1G5W0WiJj8titotGcM56ekC/qDk1zZGY1Kqx6Nhk5bHJWi7F0pt2mdtuHlMX9FDa6d++id5RzVC8ZheMwvGYXjMLwF4zC8ZiiyonKnxIzRmsXEInXsG8ZsbsUvIlNp53kZsL3q7WqqRmhRutDnfhl5to6vmp5puxD6aNG9GiQkpAAAABjn4qgcszw88mxe8yv6jx08p+GftvFX1+GgoUVIoAoAoBRWgTn+mmV6X4B7tNVlw9eb0mJ9XvU0thxf/AJz6L2x4n+E+ifGivsOMwrJ43wyJcyRqtcnUebVi0ZSi1YtGUuP5aydLgZ3QPWvpRvpokjrodtMPFw7YVt2WPiUnDtlLxbopzzeDdFGYboozC9RmKXrzjOQuXnUgWrUIKAKAKAKAETSeMThlFtJdVzU803Yh9LGjdjRISUgAAAAxz8VQOW52p+v7l7zK/qHHTyn4Z+28VfX4aO0pKZQBaAtAWgVilfC9k0a2yROR7F60+x6raazEx+ExM1nOHYchZVZjYGTs0KqUkZyxyJrapuYWJGJWLQ18LEi9d6GwOjo1ecGRY8fFub/Je3yopETSx33ReVDjjYMYtcpcsXCjErlLlWUcny4WRYZm2vTUutr29Jq8qGNiYdqTlaGVek0nKXmoeHktAvggdI9sbGq573I1rU1qqkxWbTlCYiZnKG4x2aWNgZesbZGpr3F17mpzqlEX4VLF9kxaxnl7O1tmxKxnk0lCs4FoCgC0BaAoAoeMTgl5tpLqOanmm7EPpI0bsaJCSkAAAAGOfiqBy/Ovz/uXvMv+ofyU8p+GftvFX1+GltKSoWgLQFoC0ArQNlm1lp2TprtLsPKqNnYnInTanOlV2nfZ8acK36nV1wcXs7fqXWMPOyVjZI3Nex6I5rmrVHIvKhsxMWjOGrExMZwyEpeHK+SYcZHucra0rY9ND43c7V5DniYVcSMrQ8YmHW8ZS5rl3NyfAqqqiywV8mZrdCdT09FfkZONs9sP9x4s3FwLYfk1CnBxdEzJze3uzfMqfrytSxqpphjXk9peX4c5q7Lgbkb1tZ/00dmwd2N6dZSsuLTSZazYw2Mq5W7lMv8AvRoiKq/yTU7vK+Ls1MT9T4uOJgUv5oJljNnE4Srlbu0Sf7sSKqInO5utvd1mdi7NfD/cKGJgXp+4adEK7iWgLQFoBUPGJwS820l03NTzTdiH0caNyNEhJSAAAADHPxVA5hnQn7j/ABXvMvb/AOSnlPwz9s4q+vw1NpUVC0BaQFpIWgLSBRzKgbbNnOF+Tn2Pukwj1q5iaXROVeOz7py99jZ9onCnKdHfBxpw5ynR0/DYhkzGyRuR8b0q1zVqioa9bRaM4acTExnDKSlRzUVFRURUXQqKlUVANRh82cFHLuzYG31uaiucrGLztaq0T4HCNmw4tvRVxjAw4nOIbg7uwAAoqV0c4HGZWIj5ETU2WRqbEcqGDaP7pYsx3yttPKC0kLQKPboXYc8XgnyRbSXSc1PNN2IfRRo240SElIAAAAMc/FUDmWcv+o/xXvQy9v8A5KeU/ChtnFX1+GsoVVQoAoAoAoAoAoBRzKkD2ZEyzPk59Y/Lgc6ssC6l/k3mcdsHGthT3aeDphYtsOe7R0rI+V4MazdIX1pS9i6Hxu5nJ/1DVw8WuJGdZaeHiVvGcPedHsAAAAGDG4lsEUkz1oyNjnuXqRO882tFYmZ/Dza0ViZlyBi3Krl0K5znfFamHPfObH1711AFAFALZE8ldinPF4J8nm3DLouanmm7EPoY0bcaJCSkAAAAGOfiqBzTOJP3P+Du9DM27+SnlPwobZxV9fhr7SqqloC0BaAtAWgLQFoFFYBbCskD0mge6KRvpNWlU5nJyp1KTWZrOdZImaznWUyyLnux1I8YiQP1bsldxf1r0O7rL+FtkT3X7ui9h7VE91+5Lo5GvRHNc1zVSqOaqORU50VC5E56LUTnouJSAYcXio4GLLK9scbdbnLRP/eo82tFYzmUWtFYzmXOc5M4X4925x3R4Vrqoi6HTKnpO5k6v+pmY+0Tid0adWbjY84ndGjVtZQruKtoC0BaBZM3yXbFOeLwT5PN+GXQc1PNN2IfQRo2o0SElIAAAAMc/FUDmuX/APU/4O70Mzbv5KeU/ChtnHX1+HioVlYoAoQFCQoAoQFCQoAoQFpIsfCi60IyRkrhJsRhlrh5pIeW1q1ZXratU+R6re9OGck1tanDLaw535QZoduEvW6NWuXsqifI7xteLGuTtG1YkLps8ce9KNbh4v5IxzlTZVafITteJOmSZ2rEnTJqMTJPiHI/ESvmVNVy0amxqURPchwta1+Kc3C1rW4pVayh5QrQlJQgKEhQCydPId7K9xzxeC3k8X4ZT3NTzTdiG/GjajRISUgAAAAxzcVQOb5eT90nsO70M3bo/wDZSf1PwobXxV9fh5bSsrFoC0BaAtAWgLQFoC0BaAtAWgLAFgC0BaAtAWgLQFoGPEt8h3sqc8WP7Jeb8Mp1mqn6TdiG9GjZjRICUgAAAAtkSqKBzzOuPc5mSciLRdi6ClttM6Rfl7/TSVXa6503vB5bSkpFgC0BaAsAWgLQFgC0BaAsAWgLQFgC0BaAsAWgLQFgHmxnoxpre5Pgi1Fab9609fSHqld68V/7udBzfhtjbsQ2mq24AAAAAAI3nRk3dWLo00ImM4ylExn3ShWAxFrlgk0Pboaq6nIZGJhzg23Z0nSfhmYmHOFbKdPx9NjYQgsAWALAFgCwBYAsAWALAFgCwBYAsAWALAFgCwDHiJGxtVzloifPqQi0xWETOSzN/COxU27OSjU0MTmQv7LgTSN62s/6jwXdnwZpG9bWXSMLFa1E6i2ss4AAAAAAMc0aOSigQvOXNvdKualHJVUVNaHm1IvG7aO55tWLRlMIsmMxOFWyViysTQjk41ChfZL1/jnOPCftTvsto4J9J+2dmcWHXjXMXmVKd5xmmJGuHPXo5TTEjWk9V/CHC9P6fEjK/JPsjK/JPscIcL0/p8Rlfkn2Mr8k+xwhwvT+nxGV+SfYyvyT7HCHC9P6fEZX5J9jK/JPscIcL0/p8Rlfkn2Mr8k+xwhwvT+nxGV+SfYyvyT7HCHC9P6fEZX5J9jK/JPscIcL0/p8Rlfkn2Mr8k+xwhwvT+nxGV+SfYyvyT7HCHC9P6fEZX5J9jK/JPscIcL0/p8Rlfkn2Mr8k+xwhwvT+nxGV+SfYyvyT7HCHC9P6fEZX5J9jK/JPscIcL0/p8Rlfkn2Mr8k+xwhwvTVfh4jK/JPsbt+SfZgkzgR2iGN715FVFRD3XAxrf45ef1D3GDi2/GXmzZPyPPi3o+atORiakLmDs1cOd6e+fH6WsLZ60nOe+fH6dDyTk1sLURELLu2oAAAAAAAACx8aO1gazGZGjk1tT4AaafNGJ3op8APPwMi6KfABwMj6KdkBwMj6KdkBwMj6KdkBwMj6KdkBwMj6KdkBwMj6KdkBwMj6KdkBwMj6KdkBwMj6KdkBwMj6KdkBwMj6KdkBwMj6KdkBwMj6KdkC5mZsSeinwA2ODzZjZ6KfADdYfBNj1IgHpRAKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/9k=" alt="David East - Author"></img>
<div className="fir-imageover-color"></div>
<img className="fir-imageover-image fir-clickcircle" src="data:image/jpeg;base64,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" />
  </a>
  <figcaption>
    <div className="fig-author-figure-title">{data.namek}</div>
    <div className="fig-author-figure-title">{data.gmail}</div>
    <div className="fig-author-figure-title">{data.tel}</div>
  </figcaption>
</div></di>

                <iframe
                  src={data.map}
                  width="550"
                  height="450"
                  style={{ border: '0' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days || 1}-night stay!</h1>
                <span>Located in the real heart of Krakow, this property has an excellent location score of 9.8!</span>
                <h2>
                  <b>${days * data.cheapestPrice}</b> ({days || 1} nights)
                </h2>
                <FontAwesomeIcon icon={faHeart} className="heartIcon" onClick={handleAddToFavorites} />
                <div className="headerSearchItem">
                  <span
                    onClick={() => !data.startDate && !data.endDate && setOpenDate(!openDate)}
                    className="headerSearchText"
                  >
                    {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                      dates[0].endDate,
                      "MM/dd/yyyy"
                    )}`}
                  </span>
                  {openDate && !data.startDate && !data.endDate && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDates([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      className="date"
                      minDate={new Date()}
                    />
                  )}
                </div>
                {showSuccessMessage && (
                  <div className="success-message">
                    Added to favorites successfully!
                  </div>
                )}
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
            <br></br>
            <hr />
            <br></br>
            <div className="hotelAmenities">
      <h2>Amenities</h2>
      <div className="amenities-container">
      <ul className="amenities-list">
        {amenities.map((amenity, index) => (
          <li key={index}>
            {amenity.name}
            <FontAwesomeIcon icon={faCheck} />
          </li>
        ))}
      </ul>
    </div>
    </div>

          </div>
          <MessengerIcon messengerLink={messengerLink} />
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} hotelName={data.name} hoteltype={data.type}namek={data.namek} />}
    </div>
  );
};

export default Hotel;
