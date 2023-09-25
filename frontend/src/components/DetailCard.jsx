import React from "react"
import star from "/images/star.png"

export default function DetailCard(props) {
    return (
        <div className="detailPage--popularCard">
            <div className="card--dest-image">
                <img src={`../images/${props.img}`} className="card--image" alt="Card" />
            </div>
            <div className="detailPage--popDescription">
                <h1 className="font15 bold">{props.title}</h1>
                <div className="detailPage--star">
                    {[1, 2, 3, 4, 5].map((index) => (
                    <img key={index} src={star} alt="Star" className="star" />))}
                    <span> • {props.rating}</span> {/* RATING FOR THE SPOT*/}
                </div>
                <p className="font12 bold1" >{props.category}</p>
                
            </div>
        </div>
    )
}

