/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useCurrentUserContext } from "../context/userContext";

export default function ModalSessionDetails({
  showModalDetails,
  setShowModalDetails,
  id,
}) {
  const { token } = useCurrentUserContext();
  const [sessionDetails, setSessionDetails] = useState();

  const formatDate = (date) => {
    return date.slice(0, 10).split("-").reverse().join("-");
  };

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:5000/api/session/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setSessionDetails(result[0]))
      .catch((error) => console.warn("error", error));
  }, []);

  console.warn(id);
  return (
    <div>
      {showModalDetails ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[600px] my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-center">
                    Details de ta session
                  </h3>
                </div>
                <div className="relative flex items-center justify-center">
                  <div className="flex flex-col">
                    <div className="p-4">
                      Spot :{" "}
                      <span className="font-bold">
                        {sessionDetails?.name_spot}
                      </span>
                    </div>
                    <div className="p-4">
                      Board :{" "}
                      <span className="font-bold">{sessionDetails?.board}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="p-4">
                      Date : <span className="font-bold">{}</span>
                    </div>
                    <div className="p-4">{sessionDetails?.conditions}</div>
                  </div>
                </div>
                <div>
                  <div>{sessionDetails?.content}</div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="border rounded-md text-red-500 hover:border-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalDetails(false)}
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
