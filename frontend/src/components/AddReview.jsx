import React from "react";
import userIcon from "/images/user.png";
import detailsData from "../detailsData";

export default function AddReview({ isOpen, onClose }) {
    if (!isOpen) {
        return null;
    }

    const details = detailsData[0];

    return (
        <div className="modal--overlay">
            <div className="addReview--modal">
                <h2>{details.title}</h2>
                <p>{details.categories}</p>
                <div className="user--logo-and-name"> 
                    <img className="user--logo" src={userIcon} alt="User Icon" />
                    <span className='user--username'>Elaine Suganob</span> {/* PUT THERE THE USERNAME OF (THE ID OF THE USER)*/}
                </div>
                <textarea className="addReview--input" placeholder="Write a review..." rows="5"></textarea>
                <div className="addReview--rating">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <span key={index} className="star">⭐</span>
                    ))}
                    <button className="addReview--button">Post Review</button>
                </div>
                <button className="close-button" onClick={onClose}>X</button>
            </div>
        </div>
    );
}
