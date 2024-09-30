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

const Chart = ({ aspect, title }) => {
  const [data, setData] = useState([]);
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

  const handleYearChange = async (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
  
    try {
      const response = await axios.get(`/orders/totalprice?year=${selectedYear}`);
      const chartData = Object.entries(response.data).map(([key, value]) => ({
        name: monthNames[parseInt(key.split("_")[0]) - 1], // Extract month from key
        Total: value,
      }));
      setData(chartData);
    } catch (error) {
      console.error("Error fetching data for chart:", error);
    }
  };
  const transformedData = data.map(item => ({
    name: item.name,
    Totale: Math.floor((item.Total / 100) * 20 * 100) / 100, // Rounds down to two decimal places
  }));
  
  
  return [
    <div key="chart" className="chart">
      <div className="title">{title}</div>
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
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
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
    </div>,
    <div key="chart2" className="chart">
      <div className="title">ur money</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={transformedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
          <linearGradient id="totale" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8} />
  <stop offset="95%" stopColor="#ff0000" stopOpacity={0} />
</linearGradient>


          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Totale"
            stroke="#8884d8"
            fillOpacity={2}
            fill="url(#totale)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  ];
};

export default Chart;
