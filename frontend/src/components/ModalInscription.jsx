/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ModalInscription({
  showModalInscription,
  setShowModalInscription,
}) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInscription = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      firstname,
      lastname,
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    toast
      .promise(
        fetch("http://localhost:5000/api/user/inscription", requestOptions),
        {
          success: "Votre inscription a bien été prise en compte",
          error: "Une erreur est survenue",
        }
      )
      .then((response) => response.json())
      .then(() => {
        navigate("/home");
      })
      .catch((error) => console.warn(error));
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {showModalInscription ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[600px] my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-center">
                    Inscription
                  </h3>
                  <button
                    type="button"
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalInscription(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative grid grid-cols-2 grid-rows-2">
                  <div className="p-4">
                    <label className="text-slate-500 text-lg leading-relaxed col-start-1 col-end-2">
                      Prénom :
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setFirstname(e.target.value)}
                      name="firstname"
                      id="firstname"
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="pseudo@exemple.com"
                      required=""
                    />
                  </div>
                  <div className="p-4">
                    <label className="text-slate-500 text-lg leading-relaxed col-start-1 col-end-2">
                      Nom :
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setLastname(e.target.value)}
                      name="lastname"
                      id="lastname"
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="pseudo@exemple.com"
                      required=""
                    />
                  </div>
                  <div className="p-4">
                    <label className="text-slate-500 text-lg leading-relaxed col-start-1 col-end-2">
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
                  <div className="p-4">
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
                      setShowModalInscription(false);
                      handleInscription();
                    }}
                  >
                    Inscription
                  </button>
                  <button
                    className="border rounded-md text-red-500 hover:border-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalInscription(false)}
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
