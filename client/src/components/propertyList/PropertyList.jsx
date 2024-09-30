import useFetch from "../../hooks/useFetch";
import "./propertyList.css";
import { Link } from 'react-router-dom';

const PropertyList = () => {
  const { data, loading } = useFetch("/hotels/countByType");

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];
  const name = [
   "hotel",
   "maison d'hotes",
   "evenements",
   "formation",
   "camping",
   
  ];

  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data && data.map((item, i) => (
              <div className="pListItem" key={i}>
                <Link to={item.type === 'hotel' ? "/city3" : item.type === 'maison' ? "/city4" : item.type === 'evenements' ? "/city5"   : item.type === 'formation' ? "/city6" : "/city7"}>
                  <img
                    src={images[i]}
                    alt=""
                    className="pListImg"
                  />
                </Link>
                <div className="pListTitles">
                  <h1>{name[i]}</h1>
                  <h2>{item.count}  {name[i]}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
