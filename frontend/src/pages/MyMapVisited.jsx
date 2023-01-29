/* eslint-disable react/prop-types */
import React from "react";
import MapSpotsVisited from "../components/MapSpotsVisited";
import Header from "../components/Header";
import PalmLeft from "../assets/palm_left.png";
import PalmRight from "../assets/palm_right.png";
import Search from "../assets/the_search_blue.png";

export default function MyMapVisited({ open, setOpen }) {
  return (
    <div>
      <Header open={open} setOpen={setOpen} />
      <h2 className="text-4xl font-oxygen md:pt-10 md:pb-10 pt-20 pb-20 text-center ">
        Mes spots visités :
      </h2>
      <div className="w-screen">
        <MapSpotsVisited />
      </div>
      <div className="hidden md:block md:absolute md:bottom-0">
        <img src={PalmLeft} alt="palmier" className="h-64" />
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 ">
        <img src={Search} alt="palmier" className="w-72" />
      </div>
      <div className="hidden  md:block md:absolute md:bottom-0 md:right-0">
        <img src={PalmRight} alt="palmier" className="h-64" />
      </div>
    </div>
  );
}
