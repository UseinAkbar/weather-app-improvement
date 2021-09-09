import React, { useState } from "react";
import icon from "../icon/sprite.svg";
import LocationDisplay from "./LocationDisplay";

const Location = () => {
    const [isFetched, setFetched] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [blobHidden, setBlobHidden] = useState(false)
    const [userAddress, setUserAddress] = useState({lat: '', lon: '', road: '', city: '', city_block: '', neighbourhood: '', suburb: '', city_district: ''})
    const [userWeather, setUserWeather] = useState({country: '', temp: '', humidity: '', wind_speed: '', main: '', description: '', icon: ''})
    const {lat, lon, road, city, city_block, neighbourhood, suburb, city_district} = userAddress
    const {country, temp, humidity, wind_speed, main, description, icon: icon_weather} = userWeather

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

    function fetchCurrentCoord(lat, lon) {
        return fetch(`https://us1.locationiq.com/v1/reverse.php?lat=${lat}&lon=${lon}&key=005b5f421ee408&format=json`)
            .then(res => {
                return res.json()
            })
            .then(response => {
                if(!response) {
                    throw new Error('Location not found!')
                } else {
                    return response
                }
            })
    }

    function fetchCurrentWeather(lat, lon) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=4a94fb528eeaf4b3b66eb915ff8b5f05`)
            .then(res => {
                return res.json()
            })
            .then(response => {
                return response
            })
    }

    function handleUserAddress(data) {
        const {lat, lon, address: {city, city_block, city_district, road, neighbourhood, suburb}} = data
        setUserAddress(preValue => {
            return {
                ...preValue,
                lat,
                lon,
                city,
                city_block,
                city_district,
                road,
                neighbourhood,
                suburb
            }
        })
    }

    function handleUserWeather(data) {
        const {main: {temp, humidity}, sys: {country}, wind: {speed}, weather} = data
        const {main, icon, description} = weather[0]
        setUserWeather(preValue => {
            return {
                ...preValue,
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

    const handleSubmit = () => {
        setFetched(true)
        setLoading(true)
        if(blobHidden) {
        setBlobHidden(false)
        }
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( async (position) => {
                const {coords: {latitude, longitude}} = position
                try {
                    const dataLocation = await fetchCurrentCoord(latitude, longitude)
                    const weather = await fetchCurrentWeather(latitude, longitude)
                    console.log(dataLocation);
                    handleUserAddress(dataLocation)
                    handleUserWeather(weather)
                } catch(err) {
                    console.log(err);
                    setFetched(false)
                }
                setLoading(false)
                setBlobHidden(true)
            })
        }
    }

    return (
        <div className="location">
            <a href="/" className="location__link">
                <svg className="location__link-icon">
                    <use xlinkHref={`${icon}#icon-left-arrow`}></use>
                </svg>
                <span className="location__link-text">back</span>
            </a>
            {!isFetched && <div className="location__box">
                <svg className="location__blob-icon">
                    <use xlinkHref={`${icon}#icon-blob-search`}></use>
                </svg>
                <h2 className="location__title">_Search by Current Location</h2>
                <button type="button" className="location__btn" onClick={handleSubmit}>Search</button>
            </div>}
            {isFetched && <LocationDisplay 
            isLoading={isLoading} 
            blobHidden={blobHidden} 
            lat={lat}
            lon={lon}
            road={road}
            city_block={city_block}
            city_district={city_district}
            neighbourhood={neighbourhood}
            suburb={suburb}
            city={city} 
            country={country} 
            temp={temp} 
            main={main} 
            description={description} 
            humidity={humidity} 
            wind_speed={wind_speed} 
            icon_weather={icon_weather}/>}

        </div>
    )
}

export default Location