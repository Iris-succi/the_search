/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useCurrentUserContext } from "../context/userContext";
import MapSpotsVisited from "../components/MapSpotsVisited";
import Header from "../components/Header";
import PalmLeft from "../assets/palm_left.png";
import PalmRight from "../assets/palm_right.png";
import Search from "../assets/the_search_blue.png";

export default function MyMapVisited({ open, setOpen }) {
  const { token } = useCurrentUserContext();
  const [spotsVisited, setSpotsVisited] = useState();

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/spots-visited", requestOptions)
      .then((response) => response.json())
      .then((data) => setSpotsVisited(data))
      .catch((error) => console.warn(error));
  }, [token]);

  return (
    <div>
      <Header open={open} setOpen={setOpen} />
      <h2 className="text-4xl font-oxygen md:pt-10 md:pb-10 pt-20 pb-20 text-center ">
        Mes spots visités :
      </h2>
      <div className="w-screen">
        <MapSpotsVisited spotsVisited={spotsVisited} />
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
