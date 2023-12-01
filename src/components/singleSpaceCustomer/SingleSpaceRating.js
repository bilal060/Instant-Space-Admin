import React from 'react';
import '../../assets/css/single-space.css';

const SingleSpaceRating = () => {
  return (
    <div className="add-ratings">
      <form className="rating">
        <label>
          <input type="radio" name="stars" value="1" />
          <span className="icon">★</span>
        </label>
        <label>
          <input type="radio" name="stars" value="2" />
          <span className="icon">★</span>
          <span className="icon">★</span>
        </label>
        <label>
          <input type="radio" name="stars" value="3" />
          <span className="icon">★</span>
          <span className="icon">★</span>
          <span className="icon">★</span>
        </label>
        <label>
          <input type="radio" name="stars" value="4" />
          <span className="icon">★</span>
          <span className="icon">★</span>
          <span className="icon">★</span>
          <span className="icon">★</span>
        </label>
        <label>
          <input type="radio" name="stars" value="5" />
          <span className="icon">★</span>
          <span className="icon">★</span>
          <span className="icon">★</span>
          <span className="icon">★</span>
          <span className="icon">★</span>
        </label>
      </form>
    </div>
  );
};

export default SingleSpaceRating;
