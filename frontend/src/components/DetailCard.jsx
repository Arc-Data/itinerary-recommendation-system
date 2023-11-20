import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function DetailCard(props) {
    return (
        <div className="detailPage--popularCard">
            <div className="card--dest-image">
                <Link to={`/location/${props.id}`}>
                    <img 
                    src={`http://127.0.0.1:8000${props.primary_image}`} 
                    className="card--image" alt="Location" 
                    />
                </Link>
            </div>
            <div className="detailPage--popDescription">
                <h1 className="font15 bold">{props.name}</h1>
                <div className="detailPage--star">
                    {[...Array(5)].map((star, i) => (
                        <FaStar
                            key={i}
                            className="star"
                            color={i + 1 < props.ratings ? "#ffc107" : "#e4e5e9"}
                        />
                    ))}
                    <span className="tags"> • 4.0 {props.rating} </span> {/* RATING FOR THE SPOT*/}
                </div>
                <span className="tags">
                    {props.tags.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                            {index < props.tags.length - 1 && (
                                <span className="tag-separator"> • </span>
                            )}
                        </span>
                    ))}
                </span>
            </div>
        </div>
    );
}
