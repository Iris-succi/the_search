import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import LeafletControlGeocoder from "./LeafletControlGeocoder";

export default function MapSearch() {
  const position = [51.505, -0.09];
  return (
    <div className="leaflet-container z-20">
      <MapContainer center={position} zoom={2} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletControlGeocoder />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
