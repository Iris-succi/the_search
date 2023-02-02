import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo-wave.png";
import Wave from "../assets/bg_wave.jpeg";
import TheSearchWhite from "../assets/the_search_white.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-screen flex justify-center ">
      <img src={Wave} alt="Wave" className="w-screen h-screen" />
      <img src={Logo} alt="Logo" className="absolute top-0 left-2 w-24" />
      <img
        src={TheSearchWhite}
        alt="title"
        className="absolute bottom-12 w-auto "
      />

      <button
        type="button"
        className="absolute bottom-4"
        onClick={() => navigate("/home")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 "
          color="white"
        >
          <path d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
    </div>
  );
}
