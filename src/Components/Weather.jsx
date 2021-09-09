import React, { useState } from "react";
import _ from 'lodash'
import icon from "../icon/sprite.svg";
import Display from "./Display";
import Search from "./Search";
import SearchTop from "./SearchTop";
import Data404 from "./Data404";
import cities from "cities.json";

const Weather = () => {
  const [cityInput, setCityInput] = useState("");
  const [mainData, setMainData] = useState({city: '', country: '', temp: '', humidity: '', wind_speed: '', main: '', description: '', icon: ''})
  const [listData, setListData] = useState([])
  const [listCity, setListCity] = useState([])
  const [isFetched, setFetched] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [inputLoad, setInputLoad] = useState(false)
  const [blobHidden, setBlobHidden] = useState(false)
  const [dataError, setDataError] = useState(false)
  const APIKEY = "4a94fb528eeaf4b3b66eb915ff8b5f05";
  const {city, country, temp, humidity, wind_speed, main, description, icon: icon_weather} = mainData

  const iconTemp = (icon_weather) => {
    if (['01d', '01n'].includes(icon_weather)) {
        return '#icon-display-clear'
  
      } else if (['02d', '02n', '03d', '03n', '04d', '04n'].includes(icon_weather)) {
        return '#icon-display-cloud'
  
      } else if (['09d', '09n', '10d', '10n'].includes(icon_weather)) {
          return '#icon-display-rain'
  
      } else if (['11d', '11n'].includes(icon_weather)) {
          return '#icon-display-storm'
  
      } else if (['13d', '13n'].includes(icon_weather)) {
          return '#icon-display-snow'
  
      } else if (['50d', '50n'].includes(icon_weather)) {
          return '#icon-display-mist'
      }
  }
  
  function fetchCoord() {
      return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${_.capitalize(cityInput)}&units=metric&appid=${APIKEY}`)
        .then(res => {
            return res.json()
        })
        .then(response => {
          if(!response) {
            throw new Error('Please check your city name again.')
          } else {
            handleMainData(response)
            const {coord} = response
            return coord
          }
        })
  }

  function fetchWeatherData({lat, lon}) {
      return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${APIKEY}`)
          .then(res => {
              return res.json()
          })
          .then(response => {
            return response
          })
  }

  function handleMainData(data) {
    const {main: {temp, humidity}, sys: {country}, wind: {speed}, weather} = data
    const {main, icon, description} = weather[0]
    setMainData(preValue => {
      return {
        ...preValue,
        city: _.capitalize(cityInput),
        country,
        temp: Math.ceil(temp),
        humidity,
        wind_speed: speed,
        main,
        description,
        icon: iconTemp(icon)
      }
    })
  }

  function handleData({daily}) {
    const listed = []
    daily.forEach((item, i) => {
      const {dt, temp: {max, min}, weather} = item
      const {main, description, icon} = weather[0]
      const temp = (max + min) / 2

      if(i > 0 && i !== daily.length - 1) {
          listed.push({
            day: new Date(dt*1000).toLocaleDateString("en", {weekday: "long"}),
            temp: Math.ceil(temp),
            main,
            description,
            iconDaily: iconTemp(icon)
          })
          setListData(() => [...listed])
        }
    })
  }

  // Convert into days name
  // new Date(1630382400*1000).toLocaleDateString("en", {
  //   weekday: "long"
  // });

  const fetchCityList = (val) => {
    const theCity = cities.filter(city => city.name.toLowerCase() === val.toLowerCase());
    setListCity(theCity)
    if(listCity.length !== 0 || listCity.length === 0) {
      setTimeout(() => {
        setInputLoad(false)
      }, 1500)
    }
  }

  const handleChange = (e) => {
    const input = e.target.value 
    if(input.length >= 4) {
      setInputLoad(true)
      fetchCityList(input)
    } else if(input.length <= 3) {
      setInputLoad(false)
      setListCity([])
    }
    setCityInput(input);
  };
  
  async function handleSubmit() {
    setFetched(true)
    setLoading(true)
    if(blobHidden) {
      setBlobHidden(false)
    }
    
    // Try Catch block
    try {
      const coordinat = await fetchCoord(); 
      const data = await fetchWeatherData(coordinat)
      handleData(data)
    } catch (err) {
      console.log(err);
      setDataError(!dataError)
      setMainData({city: '', temp: '', humidity: '', wind_speed: '', main: '', description: '', icon: ''})
      setListData([])
      setFetched(false)
    }
    
    setLoading(false)
    setBlobHidden(true)
    setCityInput("");
    setListCity([])
    setInputLoad(false)
  }

  const handleDataError = () => {
    setDataError(!dataError)
  }

  return (
    <div className={`weather ${isFetched && 'weather__gap'}`}>
      <div className="weather__topbar">
        <a href="/" className="weather__link">
          <svg className="weather__link-icon">
            <use xlinkHref={`${icon}#icon-left-arrow`}></use>
          </svg>
          <span className="weather__link-text">back</span>
        </a>
        <SearchTop toggleHidden={isFetched} inputLoad={inputLoad} listCity={listCity} value={cityInput} handleChange={handleChange} handleSubmit={handleSubmit}/>
      </div>
      
      <Search toggleHidden={isFetched} inputLoad={inputLoad} listCity={listCity} value={cityInput} handleChange={handleChange} handleSubmit={handleSubmit}/>
      {isFetched && <Display isLoading={isLoading} blobHidden={blobHidden} listData={listData} city={city} country={country} temp={temp} main={main} description={description} humidity={humidity} wind_speed={wind_speed} icon_weather={icon_weather} />}
      {dataError && <Data404 handleDataError={handleDataError}/>}
    </div>
  );
};

export default Weather;
