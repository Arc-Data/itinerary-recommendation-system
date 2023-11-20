	import React, { useContext, useEffect, useState } from "react";
	/*Components*/
	import DetailCard from "../components/DetailCard";
	import Review from "../components/Review";
	/*Icon*/
	import addressIcon from "/images/carbon_location-filled.svg";
	import timeIcon from "/images/wi_time-4.svg";
	import money from "/images/fluent_money-20-regular.svg";
	import bookmarkIcon from "/images/bookmark-icon-4.png";
	import star from "/images/star.png";
	import { useParams } from "react-router-dom";
	import {
	FaEllipsisH,
	FaStar,
	FaTrash,
	FaEdit,
	FaArrowLeft,
	FaArrowRight,
	} from "react-icons/fa";
	import AuthContext from "../context/AuthContext";
	import timeToNow from "../utils/timeToNow";

	export default function DetailPage() {
	const { authTokens, user } = useContext(AuthContext);
	const [location, setLocation] = useState(null);
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const letter = user.email[0].toUpperCase();
	// Thumbnail
	const [selectedImage, setSelectedImage] = useState("");
	const [images, setImages] = useState(null);
	// Bookmark
	const [isBookmarked, setBookmarked] = useState(false);
	// this will be the object to be used when the user does not
	// have any reviews yet
	const [formData, setFormData] = useState({
		comment: "",
		rating: 0,
	});

	// an object that contains the user's review data
	const [userReview, setUserReview] = useState();
	// contains all the reviews data
	const [reviewData, setReviewData] = useState([]);
	
	const [editMode, setEditMode] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// Recommended location
	const [recommendedLocations, setRecommendedLocations] = useState([]);

	

	const handleReviewChange = (name, value) => {
		setFormData((prev) => ({
		...prev,
		[name]: value,
		}));
	};

	useEffect(() => {
		const getLocationData = async () => {
		const response = await fetch(
			`http://127.0.0.1:8000/api/location/${id}/`,
			{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authTokens.access}`,
			},
			}
		);

		const data = await response.json();
		setLoading(false);
		setBookmarked(data.details.is_bookmarked);
		setLocation(data);
		setImages(data.images);
		setSelectedImage(`http://127.0.0.1:8000` + data.images[0]);
		};

		// GET LOCATION REVIEW
		const getLocationReviewData = async () => {
		const response = await fetch(
			`http://127.0.0.1:8000/api/location/${id}/reviews/?page=${currentPage}`,
			{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authTokens.access}`,
			},
			}
		);

		const locationData = await response.json();

		setReviewData(locationData.results);
		setTotalPages(Math.ceil(locationData.count / 5)); // Assuming 5 reviews per page
		};

		// GET REVIEW OF USER
		const getReviewData = async () => {
		try {
			const response = await fetch(
			`http://127.0.0.1:8000/api/location/${id}/reviews/user/`,
			{
				method: "GET",
				headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authTokens.access}`,
				},
			}
			);
			if (!response.ok) {
			throw new Error("Error fetching user review data");
			}

			const userReviewData = await response.json();
			console.log(userReview);
			setUserReview(userReviewData);
		} catch (error) {
			console.error("Error while fetching user review data: ", error);
		}
		};

		// GET RECOMMENDED LOCATIONS
		const getRecommendedLocations = async () => {
			try {
			  const response = await fetch(
				`http://127.0.0.1:8000/api/recommendations/location/${id}/`,
				{
				  method: "GET",
				  headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authTokens.access}`,
				  },
				}
			  );
	  
			  if (!response.ok) {
				throw new Error("Error fetching recommended locations data");
			  }
	  
			  const data = await response.json();
			  setRecommendedLocations(data.recommendations);
			} catch (error) {
			  console.error("Error while fetching recommended locations data: ", error);
			}
		  };
	  
		  
		getRecommendedLocations();
		getReviewData();
		getLocationReviewData();
		getLocationData();
	}, [id, authTokens.access, currentPage]);

	// SUBMIT REVIEW
	const submitReview = async () => {
		try {
		const response = await fetch(
			`http://127.0.0.1:8000/api/location/${id}/reviews/create/`,
			{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authTokens.access}`,
			},
			body: JSON.stringify(formData),
			}
		);

		if (!response.ok) {
			throw new Error(`Error while submitting the review: `);
		}
		const errorData = await response.json();

		console.log("Review submitted successfully");
		alert(
			"Review submitted successfully! You can no longer submit reviews for this location."
		);

		setLoading(true);
		window.location.reload();
		} catch (error) {
		console.error("Error while submitting the review: ", error);
		}
	};

	// EDIT REVIEW
	const handleEditReview = () => {
		setEditMode(true);
	};

	const saveEditedReview = async () => {
		try {
		const response = await fetch(
			`http://127.0.0.1:8000/api/location/${id}/reviews/edit/`,
			{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authTokens.access}`,
			},
			body: JSON.stringify(formData),
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(`Error while updating the review: ${errorData.detail}`);
		}

		console.log("Review updated successfully");
		setEditMode(false);
		} catch (error) {
		console.error("Error while updating the review: ", error);
		}
	};

	// DELETE REVIEW 
	const deleteReview = async () => {
		try {
		  const response = await fetch(
			`http://127.0.0.1:8000/api/location/${id}/reviews/delete/`,
			{
			  method: "DELETE",
			  headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authTokens.access}`,
			  },
			}
		  );
	  
		  if (!response.ok) {
			throw new Error("Error while deleting the review");
		  }
	  
		  console.log("Review deleted successfully");
		  alert(
			"Review deleted successfully"
		);

		setLoading(true);
		window.location.reload();
		} catch (error) {
		  console.error("Error while deleting the review: ", error);
		}
	  };

	// BOOKMARK
	const handleBookmarkSave = async (value) => {
		try {
		const response = await fetch(
			`http://127.0.0.1:8000/api/location/${id}/bookmark/`,
			{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authTokens.access}`,
			},
			}
		);

		if (!response.ok) {
			throw new Error("Error while updating bookmark");
		}
		} catch (error) {
		console.log("Error while updating bookmark: ", error);
		}
	};

	const toggleBookmark = () => {
		const value = isBookmarked;
		setBookmarked((prev) => !prev);
		handleBookmarkSave(value);
	};

	// MAIN IMAGE AND THUMBNAIL
	const handleThumbnailClick = (image) => {
		setSelectedImage(image); // SELECTED IMAGE FOR THE THUMBNAIL
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

	// POPULAR LOCATION (DATA)
	const recommendedCards = recommendedLocations.map((location) => (
		<DetailCard key={location.id} {...location} />
	  ));

	// DROPDOWN
	const handleEllipsisClick = () => {
		setDropdownOpen(!dropdownOpen);
	};

	//PAGINATION
	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
		setCurrentPage(newPage);
		}
	};

	const handlePrevPage = () => {
		const newPage = currentPage - 1;
		if (newPage >= 1) {
		setCurrentPage(newPage);
		}
	};

	const handleNextPage = () => {
		const newPage = currentPage + 1;
		if (newPage <= totalPages) {
		setCurrentPage(newPage);
		}
	};

	const resultStart = (currentPage - 1) * 5 + 1;
	const resultEnd = Math.min(currentPage * 5, reviewData.length);

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
					<p>
						{" "}
						<img className="detailPage--icon" src={money} />
						<span>
						Entrance Fee: {location.details.max_fee}  
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
				<button
				className={`detailPage--bookmark ${isBookmarked ? "true" : "false"}`}
				onClick={toggleBookmark}
				>
				<div className="bookmark-content">
					<img src={bookmarkIcon} alt="Bookmark" />
					<div className="bookmark-text">Bookmark</div>
				</div>
				</button>
			</div>
		<div className="detailPage--sections">
			<div className="detailPage--about">
				<h1 className="detailPage--title1">About</h1>
				<p>{location.description}</p>
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
			<div className="detailPage--cards">{recommendedCards}</div>
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
			{userReview ? (
				<div className="user--reviewContainer">
					<div className="flex mb15px">
						<div className="d-flexCenter">
							<div className="user--profile font15">
								<p>{letter}</p>
							</div>
							<p className="user--username  font14">{`${userReview.user.first_name} ${userReview.user.last_name}`}</p>
						</div>
						<div className="d-flexCenter">
							<div className="detailPage--star j-end">
								{[...Array(5)].map((star, i) => (
								<FaStar
									key={i}
									className="star"
									color={
									i + 1 < userReview.rating ? "#ffc107" : "#e4e5e9"
									}
								/>
								))}
							</div>
							<p className="date--posted font15">
								{" "}
								Posted: {timeToNow(userReview.datetime_created)}
							</p>
							<div className="relative">
								<FaEllipsisH
								className="ellipsis-icon"
								onClick={handleEllipsisClick}
								/>
								{dropdownOpen && (
								<div className="userReview-dropContent">
									<div 
										className="plan--day-dropcontent-item"
										onClick={deleteReview}>
										
										<FaTrash />
										<p>Delete review</p>
									</div>
									<div className="plan--day-dropcontent-item" onClick={handleEditReview}>
										<FaEdit />
										<p>Edit review</p>
									</div>
								</div>
								)}
							</div>
						</div>
					</div>
					<p className="user--reviews font15">{userReview.comment}</p>
				</div>
			) : (
				<div>
					<textarea
						className="input--review"
						placeholder="How do you find this place?"
						rows="5"
						value={formData.comment}
						onChange={(e) => handleReviewChange("comment", e.target.value)}
					></textarea>
					<div className="button--stars">
						<button className="submit--review" onClick={submitReview}>
						Submit Review
						</button>
						<div className="detailPage--star">
						{[...Array(5)].map((star, i) => {
							return (
							<label key={i}>
								<input
								type="radio"
								className="star--radioBtn"
								name="rating"
								value={i + 1}
								onClick={() => handleReviewChange("rating", i + 1)}
								/>
								<FaStar
								className="star"
								color={`${
									i + 1 <= formData.rating ? "#ffc107" : "#e4e5e9"
								}`}
								/>
							</label>
							);
						})}
						</div>
					</div>
				</div>
			)}
			</div>
		</div>
			<div className="user--review">
				<h1 className="mb15px">Reviews</h1>
				<hr></hr>
				{reviewData.map((item) => (
				<Review key={item.id} {...item} />
				))}
				<div className="pagination">
				{/* Previous Page Button */}
				<button
					id="pagination--button1"
					className={`plan--btn ${currentPage === 1 ? "" : ""}`}
					onClick={handlePrevPage}
					disabled={currentPage === 1}
				>
					<FaArrowLeft />
				</button>

				{/* Page Buttons */}
				{Array.from({ length: totalPages }, (_, index) => index + 1).map(
					(page) => (
					<button
						key={page}
						id="pagination--button"
						className={`plan--btn ${
						page === currentPage ? "btn-primary" : "btn-secondary"
						}`}
						onClick={() => handlePageChange(page)}
					>
						{page}
					</button>
					)
				)}

				{/* Next Page Button */}
				<button
					id="pagination--button1"
					className={`plan--btn ${currentPage === totalPages ? "" : ""}`}
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
				>
					<FaArrowRight />
				</button>
				</div>
				<p className="pagination--result">
				Showing results {resultStart}-{resultEnd} of {reviewData.length}
				</p>
			</div>
		</div>
	);
}
