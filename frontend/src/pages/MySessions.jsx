/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUserContext } from "../context/userContext";
import ModalSessionDetails from "../components/ModalSessionDetails";
import SessionCard from "../components/SessionCard";
import Header from "../components/Header";
import PalmLeft from "../assets/palm_left.png";
import PalmRight from "../assets/palm_right.png";
import Search from "../assets/the_search_blue.png";

export default function MySessions({ open, setOpen }) {
  const { token } = useCurrentUserContext();
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:5000/api/sessions`, requestOptions)
      .then((response) => response.json())
      .then((result) => setSessions(result))
      .catch((error) => console.warn("error", error));
  }, []);

  return (
    <div className="w-screen h-screen">
      <Header open={open} setOpen={setOpen} />
      <div className="flex">
        <h1 className="text-3xl mt-5 ml-20">Mes Sessions :</h1>
        <NavLink
          to="/add-session"
          type="button"
          className="border rounded-md h-10 ml-10 mt-5 text-light-blue hover:border-light-blue background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
        >
          Ajoute ta session
        </NavLink>
      </div>
      <button
        type="button"
        className="flex flex-col md:flex-row mt-5 w-1/2 m-auto"
        onClick={() => setShowModalDetails(true)}
      >
        {sessions.map((session) => (
          <button
            type="button"
            className="flex"
            onClick={() => {
              setId(session.id);
            }}
          >
            <SessionCard key={session.id} session={session} />
          </button>
        ))}
      </button>
      <ModalSessionDetails
        showModalDetails={showModalDetails}
        setShowModalDetails={setShowModalDetails}
        id={id}
      />
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
