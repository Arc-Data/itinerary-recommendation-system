import React, { useEffect, useState } from "react";
/*Components*/
import Footer from '../components/Footer';
import Review from '../components/Review';
import AddReview from '../components/AddReview';
/*Data*/
import detailsData from "../detailsData";
import reviewData from "../reviewData";
/*Icon*/
import addressIcon from "/images/maps-and-flags.png";
import timeIcon from "/images/clock.png";
import userIcon from "/images/user.png"
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

    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    if(loading) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className='detailPage'>
            <div className="detailPage--text">
                <h1 className="detailPage--title">{location.name}</h1>
                <div className="detailPage--address-time"> 
                    <p> <img className="detailPage--icon" src={addressIcon}  />
                        {location.address}
                    </p>
                    <p> <img className="detailPage--icon" src={timeIcon}  />
                        {details.time}
                    </p> 
                </div>
                <div className="detailPage--rating-stars">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <span key={index} className="detailPage--star">⭐</span>
                    ))}
                    <div className="detailPage--rating-category">
                        <span> • {details.rating}</span>
                        <span> • {details.categories} </span>
                    </div>
                </div>
            </div>
            <div className="detailPage--sections">
                <div className="detailPage--about">
                    <h1 className="detailPage--title1">About</h1>
                    <p>{details.about}</p>
                </div>
                <div className="detailPage--pictures">
                    <div className="detailPage--images">
                        <img className='detailPage--main-image' src={currentImage} alt="Main" />
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
                        {6 - index}
                        </div>
                        ))}
                    </div>
                </div>
                <div className="review--write">
                    <div className="user--logo-and-name">
                        <img className="user--logo" src={userIcon}  />
                        <span className='user--username'>Elaine Suganob</span> {/* PUT THERE THE USERNAME OF (THE ID OF THE USER)*/}
                    </div>
                    <div>
                        <button className='add--review' onClick={openModal}>Add a Review</button>
                    </div>
                </div>    
            </div>
            <div className="user--review"> 
                {reviews}
            </div>
            <Footer />
            <AddReview isOpen={isModalOpen} onClose={closeModal} /> 
        </div>
    )
}   
