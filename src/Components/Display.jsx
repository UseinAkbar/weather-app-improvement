import React from "react";
import { useState } from "react";
import icon from "../icon/sprite.svg";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Display = ({listData, city, country, temp, main, description, humidity, wind_speed, icon_weather, isLoading, blobHidden}) => {
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
        <div className="display">
            <div className="display__main">
                <div className="display__main-top">
                    <div className="display__main-time">
                        {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={180} height={30} /></SkeletonTheme> : <span className="display__main-clock">{clock}</span>}
                        {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={180} height={30} /></SkeletonTheme> : <span className="display__main-date">{customDate(new Date())}</span>}
                    </div>
                    {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={180} height={60} /></SkeletonTheme> :<h1 className="display__main-city">{city}, {country}</h1>}
                </div>

                <div className="display__main-center">
                    <div className="display__main-temp-container">
                        {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={180} height={180} /></SkeletonTheme> : <svg className="display__main-temp-icon">
                                                                                            <use xlinkHref={`${icon}${icon_weather}`}></use>
                                                                                    </svg>}
                        {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={180} height={32} /></SkeletonTheme> : <span className="display__main-desc">{main}, {description}</span>}
                        {blobHidden && <svg className="display__main-blob">
                            <use xlinkHref={`${icon}#icon-blob-weather`}></use>
                        </svg>}
                    </div>

                    <div className="border-gutter"></div>

                     <div className="display__main-detail" style={{gridTemplateColumns: isLoading && 'max-content'}}>
                        {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={180} height={50} /></SkeletonTheme> : 
                        <div className="display__temp" style={{gridTemplateColumns: isLoading && 'max-content'}}>
                            <svg className="display__temp-icon">
                                    <use xlinkHref={`${icon}#icon-display-thermometer`}></use>
                                </svg>
                            <span className="display__temp-text">{temp}°C</span>
                         </div>}

                         {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={180} height={50} /></SkeletonTheme> : 
                         <div className="display__humidity" style={{gridTemplateColumns: isLoading && 'max-content'}}>
                            <svg className="display__humidity-icon">
                                <use xlinkHref={`${icon}#icon-display-humidity`}></use>
                            </svg>
                            <span className="display__humidity-text">{humidity}%</span>
                         </div>}

                         {isLoading ? <SkeletonTheme color="#e6e6e6" highlightColor="#fdfeff"><Skeleton width={180} height={50} /></SkeletonTheme> : 
                         <div className="display__wind" style={{gridTemplateColumns: isLoading && 'max-content'}}>
                            <svg className="display__wind-icon">
                                <use xlinkHref={`${icon}#icon-display-wind`}></use>
                            </svg>
                            <span className="display__wind-text">{wind_speed} km/h</span>
                         </div>}
                     </div>
                </div>

                {!isLoading && <div className="display__main-bottom">
                    {listData.map((item, i) => {
                        const {day, temp, iconDaily} = item
                        return (
                            <div className="display__daily" key={i}>
                                <h3 className="display__daily-day">{day.substring(0,3)}</h3>
                                <svg className="display__daily-icon">
                                    <use xlinkHref={`${icon}${iconDaily}`}></use>
                                </svg>
                                <span className="display__daily-temp">{temp}°C</span>
                            </div>
                        )
                    })}
                </div>}
            </div>

            {!isLoading && <a href="/location" className="display__link">
            <svg className="display__link-icon">
                <use xlinkHref={`${icon}#icon-left-arrow`}></use>
            </svg>
            <span className="display__link-text">track location</span>
            </a>}
        </div>
    )
}

export default Display