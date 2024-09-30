import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import MessengerIcon from "../../components/messenger/messenger";
import Chart from "../../components/chart/Chart";
const Home = () => {
  const messengerLink = "m.me/286507847871480";
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
        </div>
        <div className="charts">
        <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <MessengerIcon messengerLink={messengerLink} />
      </div>
    </div>
  );
};

export default Home;
