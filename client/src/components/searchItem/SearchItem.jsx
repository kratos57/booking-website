import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">Located {item.distance}m from <span className="siTyp">{item.city}</span> center</span><br />
        <br/>
        <span className="siType">{item.type}</span><br />
        <span className="siSubtitle">
          {item.description}
        </span><br />
        <span className="siFeatures">
          {item.features}
        </span>
        <span className="siCancelOp">Free Cancellation </span><br />
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.totalRatings!==0 && (
          <div className="siRating">
            <span>Rating</span>
            <button className="">{(item.averageRating / item.totalRatings).toFixed(1)}/5</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">Starting from  ${item.cheapestPrice}</span><br />
          <br />
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">Check Availability</button>
          </Link>
        </div>       
      </div>
    </div>
  );
};

export default SearchItem;
