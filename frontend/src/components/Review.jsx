import React from "react"
/*ICON*/
import userIcon from "/images/user.png"

export default function Review (props) {
    return (
        <>
            <hr></hr>
            <div className="review--row">
                <div className="user--logo-and-name">
                    <img className="user--logo" src={userIcon} alt="User Logo" />
                    <span className='user--username'> {props.username} </span>
                </div>
                <div className="star--rating-and-date">
                    {[1, 2, 3, 4, 5].map((index) => (
                    <span key={index} className="star">⭐</span> ))}
                    <span className="date--posted">Posted {props.date} </span>
                </div>
            </div>
                <p>{props.review}</p>
        </>
    )
}