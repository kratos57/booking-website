import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const { data, loading } = useFetch("/hotels?featured=true");

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          <div className="fp">
  {loading ? (
    "Loading"
  ) : (
    <>
      <div className="fp">
  {loading ? (
    "Loading"
  ) : (
    <>
      {data.slice(-4).reverse().map((item) => (
        <div className="fpItem" key={item._id}>
          <Link to={`/hotels/${item._id}`}><img
            src={item.photos[0]}
            alt=""
            className="fpImg"
          /></Link>
          <span className="fpName">{item.name}</span>
          <span className="fpCity">{item.city}</span>
          <span className="fpCity">{item.tupe}</span>
          <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
         
          
        </div>
      ))}
    </>
  )}
</div>

    </>
  )}
</div>

        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
