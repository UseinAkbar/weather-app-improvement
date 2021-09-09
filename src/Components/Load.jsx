import React from "react";
import ReactLoading from "react-loading";
import icon from "../icon/sprite.svg";

export default function Load() {
  return (
    <div className="box-load">
        <svg className="icon-load-blob">
          <use xlinkHref={`${icon}#icon-load`}></use>
        </svg>
      <ReactLoading
        className='icon-loading'
        type={"bubbles"}
        color={"#fdfeff"}
        width={"65px"}
        height={"65px"}
      />
    </div>
  );
}
