import React from "react";
import { FaStar } from "react-icons/fa";
import timeToNow from "../utils/timeToNow";

export default function Review(props) {
    const letter = props.user.first_name[0].toUpperCase();
  return (
    <>
      
      <div className="flex mb15px">
        <div className="w80 d-flexCenter">
            <div className="user--profile font15"><p>{letter}</p></div>
            <span className="user--username font14"> {props.user.first_name} {props.user.last_name} </span>
        </div>
        <div className="jc-end w80 d-flexCenter">
        {[...Array(5)].map((star, i) => (
        <FaStar
            key={i}
            className="star"
            color={i + 1 <= props.rating ? "#ffc107" : "#e4e5e9"}
        />
        ))}
          <span className="date--posted font15">Posted: {timeToNow(props.datetime_created)} </span>
        </div>
      </div>
      <p className="user--reviews font15">{props.comment}</p>
      <hr></hr>
    </>
  );
}
