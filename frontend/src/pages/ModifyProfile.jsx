/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useCurrentUserContext } from "../context/userContext";
import Header from "../components/Header";
import PalmLeft from "../assets/palm_left.png";
import PalmRight from "../assets/palm_right.png";
import TheSearch from "../assets/the_search_blue.png";

export default function ModifyProfile({ open, setOpen }) {
  const { user, token, setUser } = useCurrentUserContext();
  const avatarRef = useRef(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [avatarStatus, setAvatarStatus] = useState("");

  const navigate = useNavigate();
  const notifySuccesAvatar = () =>
    toast.success("Votre photo a bien été envoyée !");
  const notifyErrorAvatar = () =>
    toast.error("Une erreur est survenue, veuillez recommencer");

  /*   useEffect(() => {
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
  }, [token]); */

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

  const hSubmit = (evt) => {
    evt.preventDefault();

    if (avatarRef.current.files[0]) {
      // recupération des articles.
      const myHeader = new Headers();
      myHeader.append("Authorization", `Bearer ${token}`);

      const formData = new FormData();
      formData.append("avatar", avatarRef.current.files[0]);

      const requestOptions = {
        method: "POST",
        headers: myHeader,
        body: formData,
        redirect: "follow",
      };

      fetch(`http://localhost:5000/api/avatar`, requestOptions)
        .then((response) => {
          response.json();
        })
        .then((result) => {
          setUser({ ...user, avatar: result });
          notifySuccesAvatar();
        })
        .catch((error) => {
          notifyErrorAvatar();
          console.error(error);
        });
    } else {
      notifyErrorAvatar();
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/avatar/${user.avatar}`)
      .then((response) => setAvatarStatus(response))
      .catch((error) => console.warn(error));
  }, [user]);

  return (
    <div className="w-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <Header open={open} setOpen={setOpen} />
      <div className="flex">
        <h2 className="text-3xl mt-20 ml-20">Modifier mon profil :</h2>
      </div>
      <div className="md:w-1/2 w-11/12 m-auto items-center">
        <form className="flex md:flex-row flex-col mt-10 justify-between items-center">
          <div>
            <button type="button">
              {avatarStatus.status === 200 ? (
                <img
                  className="shadow rounded-full w-40 h-40 align-middle border-none hover:opacity-25 transition ease-in-out delay-50 "
                  src={`http://localhost:5000/api/avatar/${user.avatar}`}
                  alt={`avatar${user.firstname}-${user.id}`}
                />
              ) : null}
            </button>
          </div>
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
        <form
          encType="multipart/form-data"
          onSubmit={hSubmit}
          className="pt-5 w-52"
        >
          <input
            type="file"
            name="avatar"
            ref={avatarRef}
            className=" text-light-blue hover:border-light-blue background-transparent mb-5 flex flex-col"
          />

          <button
            type="submit"
            className="border rounded-md mr-4 text-light-blue hover:border-light-blue background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
          >
            Modifier
          </button>
        </form>
        <div className="flex items-end justify-end">
          <button
            className="border rounded-md mt-10 text-light-blue hover:border-light-blue background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={(e) => {
              handleModify(e);
            }}
          >
            Envoyer
          </button>
        </div>
      </div>

      <div className="hidden md:block md:absolute md:bottom-0">
        <img src={PalmLeft} alt="palmier" className="h-72" />
      </div>
      <div className="hidden  md:block md:absolute md:bottom-0 md:right-0">
        <img src={PalmRight} alt="palmier" className="h-72" />
      </div>
      <div className="w-8/12 m-auto flex flex-col items-center justify-center mt-10 md:grid grid-cols-2 place-items-center">
        <img
          src={TheSearch}
          alt="the serch"
          className="w-80 absolute bottom-0"
        />
      </div>
    </div>
  );
}
