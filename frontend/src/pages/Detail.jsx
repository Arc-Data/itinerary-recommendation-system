import React, { useContext, useEffect, useState } from "react";
/*Components*/
import Review from "../components/Review";
import DetailCard from "../components/DetailCard";
/*Data*/
import reviewData from "../reviewData";
import cardData from "../cardData";
/*Icon*/
import addressIcon from "/images/maps-and-flags.png";
import timeIcon from "/images/clock.png";
import bookmarkIcon from "/images/bookmark.png";
import star from "/images/star.png";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import arrow icons
import AuthContext from "../context/AuthContext";

export default function DetailPage() {
  const { authTokens } = useContext(AuthContext)
  const [location, setLocation] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [images, setImages] = useState(null);
  const [rating, setRating] = useState(null); // Add rating state

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3; // Number of reviews to display per page
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const getLocationData = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/location/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authTokens.access}`
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching location data");
      }

      const data = await response.json();
      setLoading(false);
      setLocation(data);
      setImages(data.images);
      setTotalReviews(reviewData.length);
      setSelectedImage(`http://127.0.0.1:8000` + data.images[0]);
    };
    getLocationData();
  }, [id]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image); // Set the selected image to the clicked thumbnail image
  };

  if (loading) {
    return <div>Loading</div>;
  }

  const thumbnails = images.map((image, index) => (
    <img
      key={index}
      className="thumbnail"
      src={`http://127.0.0.1:8000${image}`}
      alt={`Thumbnail ${index}`}
      onClick={() => handleThumbnailClick(`http://127.0.0.1:8000${image}`)}
    />
  ));

  const limitedCardData = cardData.slice(0, 4);

  const detailCards = limitedCardData.map((location) => (
    <DetailCard key={location.id} {...location} />
  ));

  // PAGINATION
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const paginatedReviews = reviewData.slice(
    indexOfFirstReview,
    indexOfLastReview
  );
  const showingResultsText = `Showing results ${
    indexOfFirstReview + 1
  }-${indexOfLastReview} of ${totalReviews}`;

  // Create navigation buttons for changing the current page
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reviewData.length / reviewsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <button
      id="pagination--button"
      key={number}
      onClick={() => setCurrentPage(number)}
      className={currentPage === number ? "active" : ""}
    >
      {number}
    </button>
  ));

  return (
    <div className="detailPage">
      <div className="detailPage--text">
        <div className="detailPage--address-time">
          <h1 className="detailPage--title">{location.name}</h1>
          <p>
            {" "}
            <img className="detailPage--icon" src={addressIcon} />
            {location.address}
          </p>
          <p>
            {" "}
            <img className="detailPage--icon" src={timeIcon} />
            <span>
              Open at {location.details.opening_time} | Closes at{" "}
              {location.details.closing_time}{" "}
            </span>
          </p>

          <div className="detailPage--rating-category">
            {[...Array(5)].map((i, index) => (
              <img key={index} src={star} alt="Star" className="star" />
            ))}
            <span> • 4.0 •</span> {/* RATING FOR THE SPOT*/}
            <span className="tags">
              {location.details.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                  {index < location.details.tags.length - 1 && (
                    <span className="tag-separator"> • </span>
                  )}
                </span>
              ))}
            </span>
          </div>
        </div>
        <button className="detailPage--bookmark">
          <img src={bookmarkIcon} alt="Bookmark" />
        </button>
      </div>
      <div className="detailPage--sections">
        <div className="detailPage--about">
          <h1 className="detailPage--title1">About</h1>
          <p>{location.description}</p>
          <p className="font15 bold">
            Entrance Fee:{" "}
            <span className="bold1"> {location.details.max_fee} </span>
          </p>
        </div>
        <div className="detailPage--pictures">
          <div className="detailPage--images">
            <img
              className="detailPage--main-image"
              src={selectedImage}
              alt="Main"
            />
            <div className="detailPage--thumbnail">{thumbnails}</div>
          </div>
        </div>
      </div>

      <div className="detailPage--popular">
        <h2>Also Popular with travelers</h2>
        <div className="detailPage--cards">{detailCards}</div>
      </div>

      <div className="detailPage--review">
        <div className="detailPage--reviews">
          <h1>Reviews</h1>
          <div className="detailPage--star">
            {[...Array(5)].map((i, index) => (
              <img key={index} src={star} alt="Star" className="star" />
            ))}
            <span> • 3 Reviews</span>
            <span> • 4.0 </span>
          </div>
          <div className="progress--bars">
            {[1, 2, 3, 4, 5].map((i, index) => (
              <div key={index} className="progress--bar">
                <div key={index} className="progress--number">
                  {5 - index}
                </div>
                <div className="progress--fill"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="write--review">
          <textarea
            className="input--review"
            placeholder="How do you find this place?"
            rows="5"
          ></textarea>
          <div className="button--stars">
            <button className="submit--review">Submit Review</button>
            <div className="detailPage--star">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                    />
                    <FaStar
                      className="star"
                      color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="user--review">
        {paginatedReviews.map((item) => (
          <Review key={item.id} {...item} />
        ))}
        <hr></hr>

        <div className="pagination">
          {currentPage > 1 && (
            <button
              id="pagination--button"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FaChevronLeft />
            </button>
          )}

          {renderPageNumbers}

          {currentPage < pageNumbers.length && (
            <button
              id="pagination--button"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FaChevronRight />
            </button>
          )}
          <p className="pagination--result">{showingResultsText}</p>
        </div>
      </div>
    </div>
  );
}
