import React from "react"

export default function SearchCard (props) {
    return (
        <div className="searchPage--details">  
            <img className="searchPage--pic" src={props.img}  />
            <div className="searchPage--info">
                <h2 className="searchPage--info-title">{props.title}</h2>
                <span className="searchPage--info-address">{props.address}</span>
            </div>
        </div>
    )
}