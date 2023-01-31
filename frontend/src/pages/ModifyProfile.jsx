/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useCurrentUserContext } from "../context/userContext";
import FavoriteSpotCard from "../components/FavoriteSpotCard";
import Heart from "../assets/icons/heart.svg";
import Avatar from "../assets/iris.png";
import PalmLeft from "../assets/palm_left.png";
import PalmRight from "../assets/palm_right.png";

export default function ModifyProfile({ open, setOpen }) {
  const { user, token, setUser } = useCurrentUserContext();
  const [favorites, setFavorites] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [localisation, setLocalisation] = useState("");
  const navigate = useNavigate();

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

  const handleModify = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      firstname,
      lastname,
      email,
      localisation,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:5000/api/users/modify/${user.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUser(result);
        navigate("/myprofile");
      })
      .catch((error) => console.warn("error", error));
  };

  return (
    <div className="w-screen">
      <Header open={open} setOpen={setOpen} />
      <div className="flex">
        <h2 className="text-3xl mt-5 ml-20">Mon profil :</h2>
      </div>
      <div className="md:w-1/2 w-11/12 m-auto">
        <form className="flex md:flex-row flex-col mt-10 justify-between items-center">
          <img src={Avatar} alt="avatar" className="w-32 h-32" />
          <div className="flex md:flex-col flex-row mt-10 md:mt-0">
            <div className="pt-5">
              <label>Prénom :</label>
              <input
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
                name="firstname"
                id="firstname"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder={user.firstname}
                required=""
              />
            </div>
            <div className="pt-5">
              <label>Email :</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder={user.email}
                required=""
              />
            </div>
          </div>
          <div className="flex md:flex-col flex-row">
            <div className="pt-5">
              <label>Nom :</label>
              <input
                type="text"
                onChange={(e) => setLastname(e.target.value)}
                name="Nom"
                id="Nom"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder={user.lastname}
                required=""
              />
            </div>
            <div className="pt-5">
              <label>Localisation :</label>
              <input
                type="text"
                onChange={(e) => setLocalisation(e.target.value)}
                name="Localisation"
                id="Localisation"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder={user?.location}
                required=""
              />
            </div>
          </div>
        </form>
        <div className="flex items-end justify-end">
          <button
            className="border rounded-md mt-4 text-light-blue hover:border-light-blue background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={(e) => {
              handleModify(e);
            }}
          >
            Envoyer
          </button>
        </div>
      </div>
      <hr className="w-80 m-auto  mt-5" />
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
      <div className="w-8/12 m-auto flex flex-col items-center justify-center mt-10 md:grid grid-cols-2 place-items-center">
        {favorites?.map((favorite) => (
          <button type="button" key={favorite.id}>
            <FavoriteSpotCard favorite={favorite} />
          </button>
        ))}
      </div>
    </div>
  );
}
