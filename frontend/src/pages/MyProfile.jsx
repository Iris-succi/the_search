/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import { useCurrentUserContext } from "../context/userContext";
import FavoriteSpotCard from "../components/FavoriteSpotCard";
import Edit from "../assets/icons/edit.svg";
import Heart from "../assets/icons/heart.svg";
import PalmLeft from "../assets/palm_left.png";
import PalmRight from "../assets/palm_right.png";

export default function MyProfile({ open, setOpen }) {
  const { user, token } = useCurrentUserContext();
  const [favorites, setFavorites] = useState([]);
  const [favoriteSpot, setFavoriteSpot] = useState(true);
  const toggleFavoriteSpot = () => setFavoriteSpot(!favoriteSpot);

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
  }, [favorites]);

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
          <img
            className="shadow rounded-full w-40 h-40 align-middle border-none hover:opacity-25 transition ease-in-out delay-50 "
            src={`http://localhost:5000/api/avatar/${user.avatar}`}
            alt={`avatar${user.firstname}-${user.id}`}
          />
          <div className="flex md:flex-col flex-row mt-10 md:mt-0">
            <p className="mr-5 md:mr-0">
              Pr??nom : <span className="font-bold">{user.firstname}</span>
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
            Mes spots pr??f??r??s :{" "}
          </h2>
          <img src={Heart} alt="coeur" className="ml-5" />
        </div>
      </div>
      <div className="w-8/12 m-auto flex flex-col items-center justify-center mt-10 md:grid grid-cols-2 place-items-center md:h-80 md:overflow-y-auto">
        {favorites?.map((favorite) => (
          <div key={favorite.id}>
            <FavoriteSpotCard
              favorite={favorite}
              favoriteSpot={favoriteSpot}
              setFavoriteSpot={setFavoriteSpot}
              toggleFavoriteSpot={toggleFavoriteSpot}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
