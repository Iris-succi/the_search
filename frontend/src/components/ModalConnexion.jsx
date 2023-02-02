/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../context/userContext";

export default function ModalConnexion({
  showModalConnexion,
  setShowModalConnexion,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useCurrentUserContext();
  const notify = () => toast.error("Email ou mot de passe incorrect");

  const handleConnexion = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          setUser(result.user);
          localStorage.setItem("token", result.token);
          navigate("/myprofile");
        } else {
          notify();
        }
      })
      .catch((error) => console.warn(error));
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {showModalConnexion ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[600px] my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-center">
                    Connexion
                  </h3>
                  <button
                    type="button"
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalConnexion(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="pb-4">
                    <label className="text-slate-500 text-lg leading-relaxed">
                      Email :
                    </label>
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      id="email"
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="pseudo@exemple.com"
                      required=""
                    />
                  </div>
                  <div className="pb-4">
                    <label className="mt-4 text-slate-500 text-lg leading-relaxed">
                      Mot de passe :
                    </label>
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      id="password"
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="**********"
                      required=""
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="border rounded-md mr-4 text-light-blue hover:border-light-blue background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModalConnexion(false);
                      handleConnexion();
                    }}
                  >
                    Connexion
                  </button>
                  <button
                    className="border rounded-md text-red-500 hover:border-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalConnexion(false)}
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
