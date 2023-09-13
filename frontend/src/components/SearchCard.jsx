import React from "react"

export default function SearchCard (props) {
    return (
        <div className="searchPage--details">  
            <div className="searchPage--picture"> 
                <img className="searchPage--pic" src={props.image}  />
            </div>
            
            <div className="searchPage--info">
                <h2 className="searchPage--info-title">{props.name}</h2>
                <span className="searchPage--info-address">{props.address}</span>
            </div>
        </div>
    )
}