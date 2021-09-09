import React from "react";
import icon from "../icon/sprite.svg";
import { Map, TileLayer, Marker } from "react-leaflet";

const MapMarker = ({lat, lon, city_block = '', city_district, road, neighbourhood, suburb}) => {
    const position = [lat, lon]
  return (
    <div className="map">
      <Map center={position} zoom={17} scrollWheelZoom={true} id='leaf'>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}></Marker>
      </Map>
      <div className="map__detail">
        <svg className="map__icon">
          <use xlinkHref={`${icon}#icon-marker`}></use>
        </svg>
        <h3 className="map__address">{road}, {city_block}, {neighbourhood}, {suburb}, {city_district}</h3>
      </div>
    </div>
  );
};

export default MapMarker
