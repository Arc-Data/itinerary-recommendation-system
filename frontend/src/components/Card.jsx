import React from "react"

export default function Card(props) {
    return (
        <div className="card--destination">
            <div className="card--dest-image">
                <img src={`../images/${props.img}`} className="card--image" alt="Card" />
            </div>
            <div className="card--text">
                <h1 className="card--title">{props.title}</h1>
                <p className="card--description" >{props.description}</p>
            </div>
        </div>
    )
}

