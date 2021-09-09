import React from "react";
import icon from "../icon/sprite.svg";

const Feature = () => {
  return (
    <div className="features">
      <div className="features__box features__box--1">
        <svg className="features__icon">
          <use xlinkHref={`${icon}#icon-feature-color-weather`}></use>
        </svg>
        <h3 className="features__heading">Based On City</h3>
        <p className="features__desc">
          Search and know more about the cities weather
        </p>
        <a href="/weather" className="features__cta">
          <span className="features__cta--text">Go</span>
          <span className="features__cta--arrow">&rarr;</span>
        </a>
      </div>

      <span className="features__text">or</span>

      <div className="features__box features__box--2">
        <svg className="features__icon">
          <use xlinkHref={`${icon}#icon-feature-color-location`}></use>
        </svg>
        <h3 className="features__heading">Based On Location</h3>
        <p className="features__desc">
          Know the weather where you are right now
        </p>
        <a href="/location" className="features__cta">
          <span className="features__cta--text">Go</span>
          <span className="features__cta--arrow">&rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default Feature