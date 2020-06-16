import React from "react";
import "../styles/StarRating.css";

const StarRating = (props) => (
  <div className="rate">
    <p id="topText">Rate</p>
    <input
      type="radio"
      id="star5"
      name="rate"
      value="5"
      onClick={() => props.handleStarRating(5)}
    />
    <label id="starLabel" htmlFor="star5" title="text">
      5 stars
    </label>
    <input
      type="radio"
      id="star4"
      name="rate"
      value="4"
      onChange={() => props.handleStarRating(4)}
    />
    <label id="starLabel" htmlFor="star4" title="text">
      4 stars
    </label>
    <input
      type="radio"
      id="star3"
      name="rate"
      value="3"
      onChange={() => props.handleStarRating(3)}
    />
    <label id="starLabel" htmlFor="star3" title="text">
      3 stars
    </label>
    <input
      type="radio"
      id="star2"
      name="rate"
      value="2"
      onChange={() => props.handleStarRating(2)}
    />
    <label id="starLabel" htmlFor="star2" title="text">
      2 stars
    </label>
    <input
      type="radio"
      id="star1"
      name="rate"
      value="1"
      onChange={() => props.handleStarRating(1)}
    />
    <label id="starLabel" htmlFor="star1" title="text">
      1 star
    </label>
    <p id="bottomText">Average Grade: {props.grade.toFixed(2)}</p>
  </div>
);

export default StarRating;
