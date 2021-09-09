import React from "react";
import openweather from "../images/openweather.png";
import locationiq from "../images/locationiq.png";

const Powered = () => {
  return (
    <div className="powered">
      <h2 className="powered__heading">Powered by:</h2>
      <div className="powered__logos">
        <img
          src={openweather}
          alt="openWeatherMap"
          className="powered__logo powered__logo--1"
        />
        <img
          src={locationiq}
          alt="openCage"
          className="powered__logo powered__logo--2"
        />
      </div>
    </div>
  );
};

export default Powered