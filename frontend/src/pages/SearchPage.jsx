/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useCurrentUserContext } from "../context/userContext";
import Header from "../components/Header";
import MapSearch from "../components/MapSearch";
import Wave from "../assets/wave.svg";

export default function SearchPage({ open, setOpen }) {
  const [spots, setSpots] = useState([]);
  const { token } = useCurrentUserContext();

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/spots", requestOptions)
      .then((response) => response.json())
      .then((data) => setSpots(data))
      .catch((error) => console.warn(error));
  }, [token]);

  return (
    <div>
      <Header open={open} setOpen={setOpen} />
      <h2 className="text-4xl font-oxygen pt-10 pb-14 text-center ">
        Choisis ta destination :
      </h2>
      <div className="w-screen">
        <MapSearch spots={spots} />
      </div>
      <img src={Wave} alt="header bottom" className="absolute bottom-0 " />
    </div>
  );
}
