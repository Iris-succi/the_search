/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo-wave.png";
import Menu from "../assets/Menu.png";
import Activity from "../assets/icons/activity.svg";
import Anchor from "../assets/icons/anchor.svg";
import Map from "../assets/icons/map.svg";
import Battery from "../assets/icons/battery.svg";
import Book from "../assets/icons/book-open.svg";
import ModalDeconnexion from "./ModalDeconnexion";

export default function Header({ open, setOpen }) {
  const [showModalDeconnexion, setShowModalDeconnexion] = useState(false);

  return (
    <div className="w-screen z-50 ">
      <div className="border-b flex items-center justify-between">
        <img src={Logo} alt="logo" className="w-20 h-20 pl-2" />
        <button type="button" onClick={() => setOpen(!open)}>
          <img src={Menu} alt="menu" className="w-8 h-8 md:mr-10 mr-5" />
        </button>
        {open ? (
          <div className="absolute top-20 right-0 w-screen md:w-80 h-screen bg-light-blue z-50 ">
            <div className="flex flex-col items-star mt-10 ml-20">
              <div className="flex flex-row items-center">
                <img
                  src={Activity}
                  alt="icon surf"
                  className="w-8 h-8 white mr-5"
                />
                <NavLink
                  to="/thesearch"
                  className="text-white text-2xl"
                  onClick={() => setOpen(false)}
                >
                  The search
                </NavLink>
              </div>
              <div className="flex flex-row items-center mt-10">
                <img
                  src={Anchor}
                  alt="icon surf"
                  className="w-8 h-8 white mr-5"
                />
                <NavLink
                  to="/myprofile"
                  className="text-white text-2xl"
                  onClick={() => setOpen(false)}
                >
                  Mon profil
                </NavLink>
              </div>
              <div className="flex flex-row items-center mt-10">
                <img src={Map} alt="icon surf" className="w-8 h-8 white mr-5" />
                <NavLink
                  to="/myspots"
                  className="text-white text-2xl"
                  onClick={() => setOpen(false)}
                >
                  Mes spots
                </NavLink>
              </div>
              <div className="flex flex-row items-center mt-10">
                <img
                  src={Book}
                  alt="icon surf"
                  className="w-8 h-8 white mr-5"
                />
                <NavLink
                  to="/my-sessions"
                  className="text-white text-2xl"
                  onClick={() => setOpen(false)}
                >
                  Mes sessions
                </NavLink>
              </div>
              <div className="flex flex-row items-center mt-10">
                <img
                  src={Battery}
                  alt="icon surf"
                  className="w-8 h-8 white mr-5"
                />
                <button
                  type="button"
                  className="text-white text-2xl"
                  onClick={() => setShowModalDeconnexion(true)}
                >
                  D??connecter
                </button>
                <ModalDeconnexion
                  showModalDeconnexion={showModalDeconnexion}
                  setShowModalDeconnexion={setShowModalDeconnexion}
                  setOpen={setOpen}
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
