import React from "react";
import icon from "../icon/sprite.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header__heading-container">
        <h1 className="header__heading">_Weatherio App</h1>
        <h2 className="header__subheading">
          Search and Find Different Weather in Different Cities.
        </h2>
        <a href="#features" className="header__cta">
          <span className="header__cta--text">Search</span>
        </a>
      </div>

      <div className="header__icon-container">
        <svg className="header__icon header__icon--1">
          <use xlinkHref={`${icon}#icon-display`}></use>
        </svg>
        <svg className="header__icon header__icon--2">
          <use xlinkHref={`${icon}#icon-blob-display`}></use>
        </svg>
      </div>
    </header>
  );
};

export default Header