/* eslint-disable react/prop-types */
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import LeafletControlGeocoder from "./LeafletControlGeocoder";

export default function MapSearch({ spots }) {
  const position = [51.505, -0.09];
  const navigate = useNavigate();

  return (
    <div className="leaflet-container z-20">
      <MapContainer center={position} zoom={2} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletControlGeocoder />
        {spots.map((spot) => {
          return (
            <Marker key={spot.id} position={[spot.latitude, spot.longitude]}>
              <Popup>
                <button
                  type="button"
                  onClick={() => navigate(`/spots/${spot.id}`)}
                >
                  {spot.name} {spot.country}
                </button>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
