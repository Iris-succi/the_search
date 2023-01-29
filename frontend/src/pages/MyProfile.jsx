/* eslint-disable react/prop-types */
import React from "react";
import Header from "../components/Header";
import FavoriteSpotCard from "../components/FavoriteSpotCard";
import Edit from "../assets/icons/edit.svg";
import Heart from "../assets/icons/heart.svg";
import Avatar from "../assets/iris.png";
import PalmLeft from "../assets/palm_left.png";
import PalmRight from "../assets/palm_right.png";

export default function MyProfile({ open, setOpen }) {
  return (
    <div className="w-screen">
      <Header open={open} setOpen={setOpen} />
      <div className="flex">
        <h2 className="text-3xl mt-10 ml-20">Mon profil :</h2>
        <button type="button" className="mt-10 ml-5">
          <img src={Edit} alt="pen" />
        </button>
      </div>
      <div className="md:w-1/2 w-11/12 m-auto">
        <div className="flex md:flex-row flex-col mt-10 justify-between items-center">
          <img src={Avatar} alt="avatar" className="w-32 h-32" />
          <div className="flex md:flex-col flex-row mt-10 md:mt-0">
            <p className="mr-5 md:mr-0">
              Prénom : <span className="font-bold">Iris</span>
            </p>
            <p className="md:mt-10">
              Email : <span className="font-bold">iris@gmail.com</span>
            </p>
          </div>
          <div className="flex md:flex-col flex-row">
            <p className="mr-5 md:mr-0">
              Nom : <span className="font-bold">Succi</span>
            </p>
            <p className="md:mt-10">
              Localisation : <span className="font-bold">Cannes</span>
            </p>
          </div>
        </div>
      </div>
      <hr className="w-80 m-auto md:mt-20 mt-10" />
      <div className="hidden md:block md:absolute md:bottom-0">
        <img src={PalmLeft} alt="palmier" className="h-72" />
      </div>
      <div className="hidden  md:block md:absolute md:bottom-0 md:right-0">
        <img src={PalmRight} alt="palmier" className="h-72" />
      </div>
      <div className="w-8/12 m-auto mt-10">
        <div className="flex items-center">
          <h2 className="text-xl font-thin md:text-start text-center">
            Mes spots préférés :{" "}
          </h2>
          <img src={Heart} alt="coeur" className="ml-5" />
        </div>
      </div>
      <div className="w-8/12 m-auto flex md:flex-row flex-col items-center justify-around mt-10">
        <FavoriteSpotCard />
        <FavoriteSpotCard />
      </div>
    </div>
  );
}