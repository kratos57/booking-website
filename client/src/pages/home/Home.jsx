import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import Nav2 from "../../components/Nav2/Nav2";
import PropertyList from "../../components/propertyList/PropertyList";
import MessengerIcon from '../../components/messenger/messenger';

import TopRatedProperties from "../../components/toprateaproperties/toprateproperties";

import Totphotel from '../../components/topHotels/TopHotels';

import "./home.css";

const Home = () => {
  const messengerLink = "m.me/286507847871480";
  return (
    <div>
      <Navbar />
      <Nav2/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">laset ajouter</h1>
        <FeaturedProperties/>

        <h1 className="homeTitle">the most rated </h1>
        <TopRatedProperties />

        <h1 className="homeTitle">the most reserved</h1>
        <Totphotel/>

        <MessengerIcon messengerLink={messengerLink} />
        <MailList/>
        
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
