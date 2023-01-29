/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Comment from "../components/Comment";
import ModalAddComment from "../components/ModalAddComment";
import Header from "../components/Header";
import Waves from "../assets/waves.png";
import Uluwatu from "../assets/1805114574.png";
import Meteo from "../assets/meteo.png";
import Flash from "../assets/icons/flash.svg";
import Video from "../assets/icons/video.svg";
/* import MapSpot from "../components/MapSpot"; */

export default function SpotPage({ open, setOpen }) {
  const [showModalAddComment, setShowModalAddComment] = useState(false);

  return (
    <div className="w-screen md:h-screen">
      <Header open={open} setOpen={setOpen} />
      <div className="w-11/12 m-auto">
        <div className="md:grid grid-cols-2 grid-rows-2 w-11/12 m-auto h-[300px] ">
          <div className="flex flex-col items-center mt-10">
            <h2 className="text-center text-3xl">Spot : Uluwatu - Bali</h2>
            <img src={Waves} alt="Waves" className="pt-5 w-44 " />
          </div>
          <div className="flex justify-between pt-10">
            <div className="pl-10 text-sm md:text-lg">
              Type de spot : <span className="font-bold">Reef</span>
            </div>
            <div className="pr-10 text-sm ">
              Niveau : <span className="font-bold">Avancé</span>
            </div>
          </div>
          <div className="w-auto pt-5 col-start-2 row-end-2 m-auto">
            <img src={Uluwatu} alt="Uluwatu" className="h-[250px] w-[700px]" />
          </div>
        </div>
      </div>
      <hr className="w-80 m-auto " />
      <div className="md:w-10/12 w-11/12 m-auto ">
        <div className="flex md:justify-between flex-col-reverse items-center md:flex-row md:mt-5 mt-40">
          <div className="flex flex-col w-full h-full">
            <div className="text-xl pt-5">Commentaires sur ce spot :</div>
            <div className=" h-2/5 md:w-10/12 w-full">
              <Comment />
              <Comment />
            </div>
            <div className="w-80 mb-5 md:mb-0">
              <button
                type="button"
                className="flex border-2 border-light-blue rounded-md text-white bg-light-blue p-2  mt-5  items-center"
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
              <img src={Meteo} alt="météo" className="w-80" />
            </div>
            {/*             <div className="border-2 border-gray-200 mt-5 rounded-md flex flex-col p-2 h-32 w-80">
              <MapSpot />
            </div> */}
            <div className="text-xl pt-5 flex justify-around ">
              <div className="flex items-center ">
                <button
                  type="button"
                  className="flex border-2 border-light-blue rounded-md text-white bg-light-blue p-2 w-34 h-10 items-center"
                >
                  Prévisions <img src={Flash} alt="flash" className="pl-2" />
                </button>
              </div>
              <div className="flex items-center justify-center ">
                <button
                  type="button"
                  className="flex border-2 border-light-blue rounded-md text-white bg-light-blue p-2 w-34 h-10 items-center"
                >
                  Webcam <img src={Video} alt="video" className="pl-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
