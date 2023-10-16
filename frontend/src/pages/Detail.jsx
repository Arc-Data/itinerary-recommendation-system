import React, { useEffect, useState } from "react";
/*Components*/
import Footer from '../components/Footer';
import Review from '../components/Review';
/*Data*/
import reviewData from "../reviewData";
import cardData from '../cardData';
/*Icon*/
import addressIcon from "/images/maps-and-flags.png";
import timeIcon from "/images/clock.png";
import bookmarkIcon from "/images/bookmark.png";
import { useParams } from "react-router-dom";



export default function DetailPage() {
 
    const [location, setLocation] = useState(null)
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [images, setImages] = useState(null)
    const [currentImage, setCurrentImage] = useState(null);

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
            setLoading(false)
            setLocation(data)
            setImages(data.images)
            setCurrentImage(`http://127.0.0.1:8000` + data.images[0])
        } 
        getLocationData();

    }, [id])

    const handleThumbnailClick = (image) => {
        setCurrentImage(`http://127.0.0.1:8000` + image);
    };

    if(loading) {
        return (
            <div>Loading</div>
        )
    }

    const limitedCardData = cardData.slice(0, 4);

    const detailCards = limitedCardData.map((item) => (
    <DetailCard key={item.id} {...item} />
    ));

    const limitedCardDataReview = reviewData.slice(0, 4);

    const reviews = limitedCardDataReview.map(item => (
        <Review key={item.id} {...item} />
    ));

    return (
        <div className='detailPage'>
            <div className="detailPage--text">
                <div className="detailPage--address-time"> 
                    <h1 className="detailPage--title">{location.name}</h1>
                    <p> <img className="detailPage--icon" src={addressIcon}  />
                        {location.address}
                    </p>
                    <p> <img className="detailPage--icon" src={timeIcon}  />
                        <span>Open at {location.details.opening_time} | Closes at {location.details.closing_time} </span>
                    </p> 
            
                </div>
                <button className="detailPage--bookmark">
                    <img src={bookmarkIcon} alt="Bookmark" />
                </button>
            </div>
            <div className="detailPage--sections">
                <div className="detailPage--about">
                    <h1 className="detailPage--title1">About</h1>
                    <p>{location.description}</p> 
                    <p className="font15 bold">Entrance Fee: <span className="bold1"> {location.details.max_fee} </span></p> 
                </div>
                <div className="detailPage--pictures">
                    <div className="detailPage--images">
                        <img className='detailPage--main-image' src={currentImage} />
                        <div className="detailPage--thumbnail">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    className="thumbnail"
                                    src={`http://127.0.0.1:8000${image}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    onClick={() => handleThumbnailClick(image)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="detailPage--popular">
                <h2>Also Popular with travelers</h2>
                <div className='detailPage--cards'>
					{detailCards}
                </div>
            </div>

            <div className='detailPage--review'>
                <div className="detailPage--reviews">
                    <h1>Reviews</h1>
                    
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
                    <textarea className="input--review" placeholder="How do you find this place?" rows="5"></textarea>
                    <div className="button--stars"> 
                        <button className='submit--review'>Submit Review</button> 
                        
                    </div>
                </div>    
            </div>
            <div className="user--review"> 
                {reviews}
            </div>
        </div>
    )
}   
