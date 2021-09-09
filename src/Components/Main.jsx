import React from "react";
import icon from "../icon/sprite.svg";
import Feature from "./Feature";
import Powered from "./Powered";

const Main = () => {
  return (
    <main className="main" id="features">
      <div className="main__heading-container">
        <h2 className="main__heading">The Perks</h2>
        <svg className="main__icon">
          <use xlinkHref={`${icon}#icon-blob-text`}></use>
        </svg>
      </div>
      <Feature />
      <Powered />
    </main>
  );
};

export default Main;
