import React from "react";
import icon from "../icon/sprite.svg";

const Data404 = ({handleDataError}) => {
    return (
        <div className="dataNotFound">
            <div className="dataNotFound__box">
                <svg className="dataNotFound__icon">
                    <use xlinkHref={`${icon}#icon-data-404`}></use>
                </svg>
                <div className="dataNotFound__desc">
                    <h2 className="dataNotFound__title">Data not found!</h2>
                    <button type='button' className="dataNotFound__btn" onClick={handleDataError}>Try again</button>
                </div>
            </div>
      </div>
    )
}

export default Data404