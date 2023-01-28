/* eslint-disable react/prop-types */
import React from "react";
import Header from "../components/Header";
import MapSearch from "../components/MapSearch";
import Wave from "../assets/wave.svg";

export default function SearchPage({ open, setOpen }) {
  return (
    <div>
      <Header open={open} setOpen={setOpen} />
      <h2 className="text-4xl font-oxygen pt-10 pb-14 text-center ">
        Choisis ta destination :
      </h2>
      <div className="w-screen">
        <MapSearch />
      </div>
      <img src={Wave} alt="header bottom" className="absolute bottom-0 " />
    </div>
  );
}
