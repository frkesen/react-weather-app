import React from "react";

const Main = () => {
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <section className="main">
      <form>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Search for a city"
          autofocus
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
