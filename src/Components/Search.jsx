import React from "react";
import icon from "../icon/sprite.svg";
import ReactLoading from "react-loading";

const Search = ({value, listCity, handleChange, handleSubmit, toggleHidden, inputLoad}) => {

  return (
    <div className={`search ${!toggleHidden && 'toggle'}`}>
        <h2 className="search__title">_Search by City Name</h2>
        {inputLoad && <ReactLoading
            className='search__input-loading'
            type={"spin"}
            color={"#113F67"}
            width={"30px"}
            height={"30px"}
          />}
        <svg className="search__icon">
          <use xlinkHref={`${icon}#icon-blob-search`}></use>
        </svg>
        <form className="search__form">
          <input required autoComplete="off" type="text" list="" placeholder='Search a city name' value={value} className="search__input" onChange={handleChange}/>
          {/* <datalist id="city-lists">
            {listCity.flat(Infinity).map((item, i) => {
              const {name, country} = item
              return (
                <div><option className="search__option" key={i} value={name}>{name}, {country}</option></div>
              )
            })}
          </datalist> */}
          <button type="button" className="search__button" onClick={handleSubmit}>Search</button>
        </form>
    </div>
  );
};

export default Search;
