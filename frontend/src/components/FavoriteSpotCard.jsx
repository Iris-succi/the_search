/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Teahupoo from "../assets/1805114574.png";

export default function FavoriteSpotCard({ favorite }) {
  const [favoriteSpot, setFavoriteSpot] = useState(true);
  return (
    <div className="w-80 border h-40 rounded-lg mb-4">
      <div className="flex flex-col items-center relative">
        <div className="flex items-center justify-center pt-2 ">
          <button type="button" onClick={() => setFavoriteSpot(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={favoriteSpot ? "red" : "none"}
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-heart absolute top-3 left-4"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <h2 className="text-xl ">
            {favorite.name} - {favorite.country}
          </h2>
        </div>
        <img src={Teahupoo} alt="spot" className="w-72 h-28 rounded-lg" />
      </div>
    </div>
  );
}
