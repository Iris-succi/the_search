/* eslint-disable react/prop-types */
import React from "react";

export default function SessionCard({ session }) {
  return (
    <div className="w-80 border h-40 rounded-lg mb-4 md:ml-10">
      <div className="flex flex-col items-center relative">
        <div className="flex flex-col items-center justify-center pt-2 ">
          <h2 className="text-xl ">{session.name_spot}</h2>
          <img
            className="w-72 h-28 rounded-lg"
            src={`http://localhost:5000/api/sessions/${session.picture}`}
            alt={session.name_spot}
          />
        </div>
      </div>
    </div>
  );
}
