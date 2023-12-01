import React from 'react';
import { Row } from 'react-bootstrap';
import ReviewContent from './ReviewContent';
import { useSelector } from 'react-redux';

const Reviews = () => {
  const singleSpace = useSelector((state) => state.space.singleSpace);

  return (
    <Row className="bg-white py-3 radius-10 mt-4">
      <div className="main my-4 ">
        <div className="content-head d-flex px-3 justify-content-between align-items-center">
          <div className={`heading text-24 `}>
            Customer Reviews <span className="text-primary fst-italic"></span>
          </div>
        </div>

        <hr />
      </div>
      <div className="d-flex flex-column gap-4 align-items-start">
        {singleSpace?.reviews && singleSpace.reviews.length > 0 ? (
          singleSpace.reviews.map((item, index) => {
            return <ReviewContent key={index} item={item} />;
          })
        ) : (
          <div className="d-flex justify-content-center align-items-center pt-5 pb-3 w-100 flex-column">
            <p className="mb-3 auth-special font-weight-700 font-24">opps!</p>
            <p className="mb-5 font-24 font-weight-500 text-center">
              You don’t have any Review Yet
            </p>
          </div>
        )}
      </div>
    </Row>
  );
};

export default Reviews;
