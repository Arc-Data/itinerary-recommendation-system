import React from "react"

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
                    <span key={index} className="star">⭐</span> ))}
                    <span> • {props.rating}</span> {/* RATING FOR THE SPOT*/}
                </div>
                <p className="font12 bold1" >{props.category}</p>
                
            </div>
        </div>
    )
}

