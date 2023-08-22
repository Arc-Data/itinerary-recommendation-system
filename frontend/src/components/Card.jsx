import React from "react"
import { Link } from 'react-router-dom';

export default function Card(props) {
    return (
        <div className="card--destination">
            <div className="card--dest-image">
            <Link to="/detailPage">
                <img src={`../images/${props.img}`} className="card--image" alt="Card" />
            </Link>
            </div>
            <div className="card--text">
                <h1 className="card--title">{props.title}</h1>
                <p className="card--description" >{props.description}</p>
            </div>
        </div>
    )
}

