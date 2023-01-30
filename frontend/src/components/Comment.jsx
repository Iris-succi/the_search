/* eslint-disable react/prop-types */
import React from "react";
import Star from "../assets/icons/star.svg";
import Avatar from "../assets/iris.png";

export default function Comment({ comment }) {
  const formatDate = (date) => {
    return date.split("T")[0].split("-").reverse().join("-");
  };

  return (
    <div>
      <div className="relative border-2 border-gray-200 mt-5 rounded-md flex flex-col p-4">
        <div className="flex">
          <img src={Avatar} alt="avatar" className="w-10 h-10" />
          <div className="flex flex-col text-gray-400 md:ml-10 ml-5">
            <p className="text-gray-400 text-sm">
              Posté le : {formatDate(comment.date_creation)}
            </p>
            <p className="text-black">{comment.comment}</p>
          </div>
          <div className="absolute right-5 flex ">
            <img src={Star} alt="star" className="w-5 h-5" />
            <img src={Star} alt="star" className="w-5 h-5" />
            <img src={Star} alt="star" className="w-5 h-5" />
            <img src={Star} alt="star" className="w-5 h-5" />
            <img src={Star} alt="star" className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
