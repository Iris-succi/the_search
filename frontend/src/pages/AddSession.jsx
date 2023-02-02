/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useCurrentUserContext } from "../context/userContext";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/Header";
import PalmLeft from "../assets/palm_left.png";
import PalmRight from "../assets/palm_right.png";

export default function AddSession({ open, setOpen }) {
  const { user, token } = useCurrentUserContext();
  const [startDate, setStartDate] = useState(new Date());
  const [nameSpot, setNameSpot] = useState("");
  const [board, setBoard] = useState("");
  const [conditions, setConditions] = useState("");
  const pictureRef = useRef(null);
  const [content, setContent] = useState("");

  const dateConvertedToSqlFormat = (date) => {
    const dateConverted = new Date(date);
    const year = dateConverted.getFullYear();
    const month = dateConverted.getMonth() + 1;
    const day = dateConverted.getDate();
    const hour = dateConverted.getHours();
    const minutes = dateConverted.getMinutes();
    const seconds = dateConverted.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
  };

  const hSubmit = (e) => {
    e.preventDefault();
    if (pictureRef.current.files[0]) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const raw = JSON.stringify({
        user_id: user.id,
        name_spot: nameSpot,
        board,
        conditions,
        date: dateConvertedToSqlFormat(startDate),
        content,
      });

      const formData = new FormData();
      formData.append("picture", pictureRef.current.files[0]);
      formData.append("session", raw);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow",
      };

      fetch("http://localhost:5000/api/session", requestOptions)
        .then((response) => response.json())
        .then((results) => console.warn(results))
        .catch((error) => console.warn("error", error));
    }
  };

  return (
    <div>
      <Header open={open} setOpen={setOpen} />
      <h2 className="text-3xl mt-10 ml-20">Ajoute ta session :</h2>
      <div className="md:w-1/2 w-11/12 m-auto items-center">
        <form
          encType="multipart/form-data"
          className="pt-5 w-screen m-auto"
          onSubmit={(e) => hSubmit(e)}
        >
          <p className="pb-2">Tu souhaites ajouter une photo à ta session ?</p>
          <input
            type="file"
            name="avatar"
            ref={pictureRef}
            className=" text-light-blue hover:border-light-blue background-transparent mb-5 flex"
          />

          <div className="flex flex-col  ml-10 justify-between items-start">
            <div className="flex md:flex-row flex-col ">
              <div className="pt-5 mr-20">
                <label>Date :</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-[220px] p-2.5"
                />
              </div>
              <div className="pt-5">
                <label>Ta board :</label>
                <input
                  type="text"
                  onChange={(e) => setBoard(e.target.value)}
                  name="board"
                  id="board"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-[220px] p-2.5"
                  placeholder="Nom de ta board"
                  required=""
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-row">
              <div className="pt-5 mr-[122px]">
                <label>Spot :</label>
                <input
                  type="text"
                  onChange={(e) => setNameSpot(e.target.value)}
                  name="name_spot"
                  id="name_spot"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-[220px] p-2.5"
                  placeholder="Nom du spot"
                  required=""
                />
              </div>
              <div className="pt-5">
                <label>Conditions :</label>
                <input
                  type="text"
                  onChange={(e) => setConditions(e.target.value)}
                  name="Conditions"
                  id="Conditions"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-[220px] p-2.5"
                  placeholder="Conditions du jour"
                  required=""
                />
              </div>
            </div>
            <div className="flex flex-col mt-5 ">
              <label>Description :</label>
              <textarea
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-[440px] p-2.5 ml-20 mt-5"
                onChange={(e) => setContent(e.target.value)}
                name="Description"
                id="Description"
              />
            </div>
            <button
              type="submit"
              className="border rounded-md mr-4 text-light-blue hover:border-light-blue background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
      <div className="hidden md:block md:absolute md:bottom-0">
        <img src={PalmLeft} alt="palmier" className="h-64" />
      </div>

      <div className="hidden  md:block md:absolute md:bottom-0 md:right-0">
        <img src={PalmRight} alt="palmier" className="h-64" />
      </div>
    </div>
  );
}
