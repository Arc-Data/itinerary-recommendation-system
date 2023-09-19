import React, { useEffect, useState } from "react";
/*Components*/
import Footer from '../components/Footer';
import Review from '../components/Review';
/*Data*/
import detailsData from "../detailsData";
import reviewData from "../reviewData";
/*Icon*/
import addressIcon from "/images/maps-and-flags.png";
import timeIcon from "/images/clock.png";
import bookmarkIcon from "/images/bookmark.png";
import { useParams } from "react-router-dom";



export default function DetailPage() {
 
    const [location, setLocation] = useState(null)
    const { id } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getLocationData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/location/${id}`, {
                "method": "GET",
                headers: {
					'Content-Type': 'application/json',
				}
            })

            if(!response.ok) {
                throw new Error("Error fetching location data")
            }

            const data = await response.json()
            console.log("Loading over")
            setLoading(false)
            setLocation(data)
        } 

        getLocationData();

    }, [id])



    const details = detailsData[0];

    const [currentImage, setCurrentImage] = useState(details.images[0]);
    const handleThumbnailClick = (image) => {
        setCurrentImage(image);
    };

    const reviews = reviewData.map(item => (
        <Review key={item.id} {...item} />
    ));

    if(loading) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className='detailPage'>
            <div className="detailPage--text">
                <div className="detailPage--address-time"> 
                    <h1 className="detailPage--title">{location.name}</h1>
                    <p> <img className="detailPage--icon" src={addressIcon}  />
                        {location.address}
                    </p>
                    <p> <img className="detailPage--icon" src={timeIcon}  />
                        {details.time} {/* OPEN AND CLOSE FOR THE SPOT*/}
                    </p> 
            
                    <div className="detailPage--rating-category">
                        <span>  {[1, 2, 3, 4, 5].map((index) => (
                        <span key={index} className="detailPage--star">⭐</span> ))}</span>
                        <span> • {details.rating}</span> {/* RATING FOR THE SPOT*/}
                        <span> • {details.categories} </span> {/* CATEGORY FOR THE SPOT*/}
                    </div>
                </div>
                <button className="detailPage--bookmark">
                    <img src={bookmarkIcon} alt="Bookmark" />
                </button>
            </div>
            <div className="detailPage--sections">
                <div className="detailPage--about">
                    <h1 className="detailPage--title1">About</h1>
                    <p>{location.description}</p> {/* ABOUT FOR THE SPOT*/}
                    <p>{details.about}</p> {/* ABOUT FOR THE SPOT*/}
                    <p className="entrance--free bold">Entrance Fee: <span className="bold1">25 </span></p> {/* FEE FOR THE SPOT*/}
                </div>
                <div className="detailPage--pictures">
                    <div className="detailPage--images">
                        <img className='detailPage--main-image' src={currentImage} />
                        <div className="detailPage--thumbnail">
                            {details.images.map((image, index) => (
                                <img
                                    key={index}
                                    className="thumbnail"
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    onClick={() => handleThumbnailClick(image)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h1>Also Popular with travelers</h1>
                <h1>Also kineme</h1>
                
            </div>






            
            <div className='detailPage--review'>
                <div className="detailPage--review-stars">
                    <h1>Reviews</h1>
                    <div className="detailPage--star">
                        {[1, 2, 3, 4, 5].map((index) => (
                        <span key={index} className="star">⭐</span> ))}
                        <span> • {details.rating}</span>
                        <span> • {details.reviewCount} </span>
                    </div>
                    <div className="progress--bars">
                        {[1, 2, 3, 4, 5].map((index) => (
                            <div key={index} className="progress--bar">
                            <div key={index} className="progress--number">{6 - index}</div>
                            <div className="progress--fill"></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="write--review">
                    <input className="input--review" placeholder="How do you find this place?" rows="5"></input>
                    <div className="button--stars"> 
                        <button className='add--review'>Submit Review</button> 
                        <div className="detailPage--star">
                            {[1, 2, 3, 4, 5].map((index) => (
                            <span key={index} className="star">⭐</span> ))}
                        </div>
                    </div>
                </div>    
            </div>
            <div className="user--review"> 
                {reviews}
            </div>
        </div>
    )
}   
