import axios from "axios";
import React, { useState } from "react";
import WeatherCard from "./WeatherCard";

const Main = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherDataFromApi();
    setSearchText("");
  };
  const getWeatherDataFromApi = async () => {
    let apiKey = process.env.REACT_APP_API_KEY;
    let units = "metric";
    let lang = "tr";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${apiKey}&units=${units}&lang=${lang}`;
    try {
      const response = await axios.get(url);
      //   console.log(response);
      const { main, name, sys, weather, id } = response.data;
      const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

      const isExist = data.some((card) => card.id === id);
      if (isExist) {
        setError(
          `You already know the weather for ${name}, Please search for another city 😉`
        );
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        setData([{ main, name, sys, weather, iconUrl, id }, ...data]);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  console.log(data);
  return (
    <section className="main">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Search for a city"
          value={searchText}
          autoFocus
        />
        <button type="submit">SUBMIT</button>
        <span className="msg">{error}</span>
      </form>
      <div className="container">
        <ul className="cities">
          {data?.map((item) => (
            <WeatherCard key={item.id} data={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Main;
