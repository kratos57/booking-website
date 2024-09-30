import "./chart.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../../../hebergeur/src/context/AuthContext";
import { useContext } from "react";
import useFetch from "../../hooks/useFormaion";


const Chart = ({ aspect, title }) => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch("/hotels");
  const [hotelName, setHotelName] = useState(""); // Change hotelId to hotelName
  const [datat, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get("/orders/years");
        setYears(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des années :", error);
      }
    };

    fetchYears();
  }, []);

  const fetchData = async () => {
    try {
      const username = user.username; // Replace with actual logged-in username
      const response = await axios.get(`/orders/totalname?year=${selectedYear}&username=${username}&hotelName=${hotelName}`);
      const chartData = Object.entries(response.data).map(([key, value]) => ({
        name: monthNames[parseInt(key.split("_")[0]) - 1],  // Extract month from key
        Total: value,
      }));
      setData(chartData);
    } catch (error) {
      console.error("Error fetching data for chart:", error);
    }
  };

  useEffect(() => {
    if (selectedYear && hotelName) {
      fetchData();
    }
  }, [selectedYear, hotelName]);

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
  };

  const handleHotelChange = (event) => {
    const selectedHotelName = event.target.value;
    setHotelName(selectedHotelName);
  };
  

  const transformedData = datat.map(item => ({
    name: item.name,
    Total: Math.floor((item.Total / 100) * 80 * 100) / 100, // Rounds down to two decimal places
  }));
  
  return (
    <div className="chart">
     
      <div>
        <label htmlFor="yearSelect">Sélectionner une année :</label>
        <select id="yearSelect" onChange={handleYearChange} value={selectedYear}>
          <option value="">Select an year</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="formInput">
        <label>Choose </label>
        <select
          id="hotelName" // Change id to hotelName
          onChange={handleHotelChange}
          value={hotelName}
        >
          <option value="">Select a hotel</option>
          {loading
            ? "Loading..."
            : data &&
              data.map((hotel) => (
                <option key={hotel._id} value={hotel.name}>{hotel.name}</option>
              ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={transformedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
