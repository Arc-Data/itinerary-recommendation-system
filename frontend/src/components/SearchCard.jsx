import React from "react"

export default function SearchCard (props) {
    return (
        <div className="searchPage--details">  
            <img className="searchPage--pic" src={props.img}  />
            <div class="searchPage--info">
                <h2 class="searchPage--info-title">{props.title}</h2>
                <span class="searchPage--info-address">{props.address}</span>
            </div>
        </div>
    )
}