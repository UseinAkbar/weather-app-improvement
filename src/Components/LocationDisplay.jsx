import React from "react";
import { useState } from "react";
import icon from "../icon/sprite.svg";
import MapMarker from "./MapMarker";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const LocationDisplay = ({lat, lon, city, city_block = '', city_district, road, neighbourhood, suburb, country, temp, main, description, humidity, wind_speed, icon_weather, isLoading, blobHidden}) => {
    const [clock, setClock] = useState('')

    const customDate = (d) => {
        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        var year = d.getFullYear();
    
        return `${day}, ${date} ${month} ${year}`;
      }

    const time = () => {
        let timeTerm = 'AM'
        let time = []
        new Date().toLocaleTimeString().split(':').forEach( (item, i) => {
            if(i !== 2) {
                 time.push(item)
            } else {
                timeTerm = item.slice(-2)
            }
        })

        setClock(`${time.join(':')} ${timeTerm}`)
    }

    setInterval(time, 1000)

    return (
        <div className="location-display display">
            <div className="location-display__main display__main">
                <div className="location-display__main-top display__main-top">
                    <div className="location-display__main-time display__main-time">
                        {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={150} height={30} /></SkeletonTheme> : <span className="location-display__main-clock display__main-clock">{clock}</span>}
                        {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={150} height={30} /></SkeletonTheme> : <span className="location-display__main-date display__main-date">{customDate(new Date())}</span>}
                    </div>
                    {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={180} height={60} /></SkeletonTheme> :<h1 className="location-display__main-city display__main-city">{city}, {country}</h1>}
                </div>

                <div className="location-display__main-center display__main-center">
                    <div className="location-display__main-temp-container display__main-temp-container">
                        {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={180} height={180} /></SkeletonTheme> : <svg className="location-display__main-temp-icon display__main-temp-icon">
                                                                                            <use xlinkHref={`${icon}${icon_weather}`}></use>
                                                                                    </svg>}
                        {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={180} height={32} /></SkeletonTheme> : <span className="location-display__main-desc display__main-desc">{main}, {description}</span>}
                        {blobHidden && <svg className="location-display__main-blob display__main-blob">
                            <use xlinkHref={`${icon}#icon-blob-weather`}></use>
                        </svg>}
                    </div>

                    <div className="border-gutter"></div>

                     <div className="location-display__main-detail display__main-detail" style={{gridTemplateColumns: isLoading && 'max-content'}}>
                        {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={190} height={50} /></SkeletonTheme> : 
                        <div className="location-display__temp display__temp">
                            <svg className="location-display__temp-icon display__temp-icon">
                                    <use xlinkHref={`${icon}#icon-display-thermometer`}></use>
                                </svg>
                            <span className="location-display__temp-text display__temp-text">{temp}°C</span>
                         </div>}

                         {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={190} height={50} /></SkeletonTheme> : 
                         <div className="location-display__humidity display__humidity">
                            <svg className="location-display__humidity-icon display__humidity-icon">
                                <use xlinkHref={`${icon}#icon-display-humidity`}></use>
                            </svg>
                            <span className="location-display__humidity-text display__humidity-text">{humidity}%</span>
                         </div>}

                         {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={190} height={50} /></SkeletonTheme> : 
                         <div className="location-display__wind display__wind">
                            <svg className="location-display__wind-icon display__wind-icon">
                                <use xlinkHref={`${icon}#icon-display-wind`}></use>
                            </svg>
                            <span className="location-display__wind-text display__wind-text">{wind_speed} km/h</span>
                         </div>}
                     </div>
                </div>

                {!isLoading && <MapMarker lat={lat} lon={lon} city_block={city_block} city_district={city_district} road={road} neighbourhood={neighbourhood} suburb={suburb} />}
            </div>

            {!isLoading && <a href="/weather" className="location-display__link display__link">
            <svg className="location-display__link-icon display__link-icon">
                <use xlinkHref={`${icon}#icon-left-arrow`}></use>
            </svg>
            <span className="location-display__link-text display__link-text">search a city</span>
            </a>}
        </div>
    )
}

export default LocationDisplay