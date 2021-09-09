import React from "react";
import ReactLoading from "react-loading";

const SearchTop = ({ value, listCity, handleChange, handleSubmit, toggleHidden, inputLoad }) => {
  return (
    <form className={`search__form search__form--top ${toggleHidden && 'toggle'}`}>
      {inputLoad && <ReactLoading
          className='searchTop__input-loading'
          type={"spin"}
          color={"#113F67"}
          width={"25px"}
          height={"25px"}
      />}
      <input
        required
        autoComplete="off"
        list=""
        type="text"
        placeholder="Search a city name"
        value={value}
        className="search__input search__input--top"
        onChange={handleChange}
      />
      {/* <datalist id="city-lists">
          {listCity.flat(Infinity).map((item, i) => {
            const {name, country} = item
            return (
              <option key={i} value={name}>{name}, {country}</option>
            )
          })}
      </datalist> */}
      <button type="button" className="search__button search__button--top" onClick={handleSubmit}>
        Search
      </button>
    </form>
  );
};

export default SearchTop;
