import axios from "axios";
import React, { useState } from "react";

const Main = () => {
  const [searchText, setSearchText] = useState("");
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherDataFromApi();
  };
  const getWeatherDataFromApi = async () => {
    let apiKey = process.env.REACT_APP_API_KEY;
    let units = "metric";
    let lang = "tr";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${apiKey}&units=${units}&lang=${lang}`;
    try {
      const response = await axios.get(url);
      console.log(response);
      const { main, name, sys, weather } = response.data;
      // const iconUrl = `https://openweathermap.org/img/wn/${
      //         weather[0].icon}@2x.png`;
    } catch {}
  };
  return (
    <section className="main">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Search for a city"
          autoFocus
        />
        <button type="submit">SUBMIT</button>
        <span className="msg"></span>
      </form>
      <div className="container">
        <ul className="cities">Main</ul>
      </div>
    </section>
  );
};

export default Main;
