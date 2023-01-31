/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import { render } from "react-dom";
import { useCurrentUserContext } from "../context/userContext";

export default function ModalAddComment({
  showModalAddComment,
  setShowModalAddComment,
}) {
  const [comment, setComment] = useState("");
  const [note, setNote] = useState(0);
  const { user, token } = useCurrentUserContext();
  const { id } = useParams();

  const ratingChanged = (newRating) => {
    setNote(newRating);
  };

  const handleComment = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      comment,
      note,
      user_id: user.id,
      spot_id: id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:5000/api/spots/3/comment`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.warn(result))
      .catch((error) => console.warn("error", error));
  };

  return (
    <div>
      {showModalAddComment ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[600px] my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-center">
                    Ajoute ton commentaire
                  </h3>
                  <button
                    type="button"
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalAddComment(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="pb-4">
                    <div className="absolute right-5 flex ">
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                      />
                    </div>
                  </div>
                  <div className="pb-4">
                    <label className=" text-slate-500 text-lg leading-relaxed">
                      Commentaire :
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setComment(e.target.value)}
                      name="text"
                      id="comment"
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-5"
                      placeholder="Ecris ton commentaire ici..."
                      required=""
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="border rounded-md mr-4 text-light-blue hover:border-light-blue background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModalAddComment(false);
                      handleComment();
                    }}
                  >
                    Envoyer
                  </button>
                  <button
                    className="border rounded-md text-red-500 hover:border-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalAddComment(false)}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </div>
      ) : null}
    </div>
  );
}
