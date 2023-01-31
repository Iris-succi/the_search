/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useCurrentUserContext } from "../context/userContext";
import Comment from "../components/Comment";
import ModalAddComment from "../components/ModalAddComment";
import Header from "../components/Header";
import Waves from "../assets/waves.png";
import Flash from "../assets/icons/flash.svg";
import Video from "../assets/icons/video.svg";
import Wind from "../assets/weather/wind.png";

export default function SpotPage({ open, setOpen }) {
  const [showModalAddComment, setShowModalAddComment] = useState(false);
  const { user, token } = useCurrentUserContext();
  const [spotWithComment, setSpotWithComment] = useState([]);
  const [weatherData, setWeatherData] = useState();
  const [addFavorite, setAddFavorite] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:5000/api/spots/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setSpotWithComment(data);
      })
      .catch((error) => console.warn(error));
  }, [token, showModalAddComment]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${spotWithComment?.latitude}&lon=${spotWithComment?.longitude}&units=metric&lang=fr&exclude={part}&appid=256faf36b0c507b30e5832b662f35446`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data.current);
      })
      .catch((error) => console.warn(error));
  }, [spotWithComment]);

  const handleAddFavorite = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user_id: user.id,
      spot_id: id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    toast
      .promise(fetch(`http://localhost:5000/api/addfavorite`, requestOptions), {
        success: " 🌊 Spot ajouté aux favoris",
        error:
          "Une erreur sur le serveur est survenue lors de l'ajout en favoris",
      })
      .then((response) => response.json())
      .then((result) => {
        console.warn(result);
        setAddFavorite(true);
      })
      .catch((error) => console.warn("error", error));
  };

  return (
    <div className="w-screen md:h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <Header open={open} setOpen={setOpen} />
      <div className="w-11/12 m-auto">
        <div className="md:grid grid-cols-2 grid-rows-2 w-11/12 m-auto h-[300px] ">
          <div className="flex flex-col items-center mt-10">
            <div className="flex ">
              <h2 className="text-center text-3xl">
                Spot : {spotWithComment?.name} - {spotWithComment?.country}
              </h2>
              <button type="button" onClick={handleAddFavorite}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  onClick={setAddFavorite}
                  fill={addFavorite ? "red" : "none"}
                  stroke="black"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-5"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
            <img src={Waves} alt="Waves" className="pt-5 w-44 " />
          </div>
          <div className="flex justify-between pt-10">
            <div className="pl-10 text-sm md:text-lg">
              Type de spot :{" "}
              <span className="font-bold">{spotWithComment?.type}</span>
            </div>
            <div className="pr-10 text-sm md:text-lg">
              Niveau :{" "}
              <span className="font-bold">{spotWithComment?.level}</span>
            </div>
          </div>
          <div className="w-auto pt-5 col-start-2 row-end-2 m-auto">
            <img
              src={`http://localhost:3000/src/assets/spots/${spotWithComment.picture}`}
              alt="Uluwatu"
              className="h-[250px] w-[700px]"
            />
          </div>
        </div>
      </div>
      <hr className="w-80 m-auto " />
      <div className="md:w-10/12 w-11/12 m-auto ">
        <div className="flex md:justify-between flex-col-reverse items-center md:flex-row md:mt-5 mt-40">
          <div className="flex flex-col w-full h-full ">
            <div className="text-xl pt-5 mb-5">Commentaires sur ce spot :</div>
            <div className="overflow-y-scroll h-64 md:mr-10">
              {spotWithComment?.comments?.map((comment) => (
                <div className=" h-2/5 md:w-10/12 w-full" key={comment.id}>
                  <Comment comment={comment} />
                </div>
              ))}
            </div>
            <div className="w-80 mb-5 md:mb-0">
              <button
                type="button"
                className="flex border-2 border-light-blue rounded-md text-white bg-light-blue p-2  mt-2  items-center"
                onClick={() => setShowModalAddComment(true)}
              >
                Ajoute ton commentaire
              </button>
              <ModalAddComment
                showModalAddComment={showModalAddComment}
                setShowModalAddComment={setShowModalAddComment}
              />
            </div>
          </div>
          <div className="flex flex-col md:w-1/3">
            <div className="border-2 border-gray-200 mt-5 rounded-md flex flex-col p-2 h-32 w-80">
              Météo du jour :
              <div className="flex w-16 h-16 m-2">
                <img
                  src={`http://localhost:3000/src/assets/weather/${weatherData?.weather[0]?.main}.png`}
                  alt="weather"
                />
                <div className="flex flex-col">
                  <div className="text-5xl ml-6">
                    {parseInt(weatherData?.temp, 10)}°
                  </div>
                  <div className="text-xs font-thin ml-2 text-center">
                    {" "}
                    ressenti {parseInt(weatherData?.feels_like, 10)}°
                  </div>
                </div>

                <img src={Wind} alt="wind" className="w-16 h-16 ml-6" />
                <div className="flex items-end ml-2">
                  <p className="font-bold text-xl">
                    {parseInt(weatherData?.wind_speed, 10)}{" "}
                    <span className="font-thin text-sm">km/h</span>
                  </p>
                </div>
              </div>
            </div>

            {/*             <div className="border-2 border-gray-200 mt-5 rounded-md flex flex-col p-2 h-32 w-80">
              <MapSpot />
            </div> */}
            <div className="text-xl pt-5 flex justify-around ">
              <div className="flex items-center ">
                <Link to={`${spotWithComment?.prevision}`}>
                  <div
                    type="button"
                    className="flex border-2 border-light-blue rounded-md text-white bg-light-blue p-2 w-34 h-10 items-center"
                  >
                    Prévisions <img src={Flash} alt="flash" className="pl-2" />
                  </div>
                </Link>
              </div>
              <div className="flex items-center justify-center ">
                <Link to={`${spotWithComment?.webcam}`}>
                  <div
                    type="button"
                    className="flex border-2 border-light-blue rounded-md text-white bg-light-blue p-2 w-34 h-10 items-center"
                  >
                    Webcam <img src={Video} alt="video" className="pl-2" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
