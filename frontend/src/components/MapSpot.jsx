import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "../App.css";

export default function MapSpot() {
  const position = [-8.8016023, 115.2312006];
  return (
    <div className="mapSpot z-20">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
