import React, { useState } from "react";
/*COMPONENTS*/
import Footer from '../components/Footer';
import Review from '../components/Review';
import AddReview from '../components/AddReview';
/*DATA*/
import detailsData from "../detailsData";
import reviewData from "../reviewData";
/*ICON*/
import addressIcon from "/images/maps-and-flags.png";
import timeIcon from "/images/clock.png";
import userIcon from "/images/user.png"



export default function DetailPage() {

    /*DATA FOR DETAIL DATA*/
    const details = detailsData[0];

    /*THUMBNAIL*/
    const [currentImage, setCurrentImage] = useState(details.images[0]);
    const handleThumbnailClick = (image) => {
        setCurrentImage(image);
    };

    /*DATA FOR REVIEW*/
    const reviews = reviewData.map(item => (
        <Review key={item.id} {...item} />
    ));

    /*MOODAL FOR ADD REVIEW*/
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className='detailPage'>
            <div className="detailPage--text">
                <h1 className="detailPage--title">{details.title}</h1>
                <div className="detailPage--address-time"> 
                    <p> <img className="detailPage--icon" src={addressIcon}  />
                        {details.address}
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
