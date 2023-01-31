/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import { useCurrentUserContext } from "../context/userContext";
import FavoriteSpotCard from "../components/FavoriteSpotCard";
import Edit from "../assets/icons/edit.svg";
import Heart from "../assets/icons/heart.svg";
import Avatar from "../assets/iris.png";
import PalmLeft from "../assets/palm_left.png";
import PalmRight from "../assets/palm_right.png";

export default function MyProfile({ open, setOpen }) {
  const { user, token } = useCurrentUserContext();
  const [favorites, setFavorites] = useState();
  console.warn(user);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:5000/api/users/${user.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.warn(result))
      .catch((error) => console.warn("error", error));
  }, [token]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:5000/api/favorites`, requestOptions)
      .then((response) => response.json())
      .then((result) => setFavorites(result))
      .catch((error) => console.warn("error", error));
  }, [token]);

  return (
    <div className="w-screen md:h-screen">
      <Header open={open} setOpen={setOpen} />
      <div className="flex">
        <h2 className="text-3xl mt-5 ml-20">Mon profil :</h2>
        <NavLink to="/modify-profile" type="button" className="mt-7 ml-5">
          <img src={Edit} alt="pen" />
        </NavLink>
      </div>
      <div className="md:w-1/2 w-11/12 m-auto">
        <div className="flex md:flex-row flex-col mt-10 justify-between items-center">
          <img src={Avatar} alt="avatar" className="w-32 h-32" />
          <div className="flex md:flex-col flex-row mt-10 md:mt-0">
            <p className="mr-5 md:mr-0">
              Prénom : <span className="font-bold">{user.firstname}</span>
            </p>
            <p className="md:mt-10">
              Email : <span className="font-bold">{user.email}</span>
            </p>
          </div>
          <div className="flex md:flex-col flex-row">
            <p className="mr-5 md:mr-0">
              Nom : <span className="font-bold">{user.lastname}</span>
            </p>
            <p className="md:mt-10">
              Localisation :{" "}
              <span className="font-bold">{user?.localisation}</span>
            </p>
          </div>
        </div>
      </div>
      <hr className="w-80 m-auto  mt-10" />
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
      <div className="w-8/12 m-auto flex flex-col items-center justify-center mt-10 md:grid grid-cols-2 place-items-center md:h-80 md:overflow-y-auto">
        {favorites?.map((favorite) => (
          <button type="button" key={favorite.id}>
            <FavoriteSpotCard favorite={favorite} />
          </button>
        ))}
      </div>
    </div>
  );
}
