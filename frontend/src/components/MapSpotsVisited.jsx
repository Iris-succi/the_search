/* eslint-disable react/prop-types */
import React from "react";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
} from "react-leaflet";
import LeafletControlGeocoder from "./LeafletControlGeocoder";

export default function MapSpotsVisited({ spotsVisited }) {
  const position = [12.65, -8.0];
  const pos = [];
  spotsVisited?.forEach((spot) => {
    pos.push([spot.latitude, spot.longitude]);
  });

  return (
    <div className="leaflet-container z-20">
      <MapContainer center={position} zoom={1.5} scrollWheelZoom={false}>
        {/* <Polyline positions={} color="blue" /> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletControlGeocoder />
        <FeatureGroup>
          {pos?.map((mark) => (
            <Marker position={mark} />
          ))}
          <Polyline positions={pos} color="#00989E" />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
}
