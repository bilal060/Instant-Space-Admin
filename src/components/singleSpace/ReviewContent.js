import React from 'react';
import '../../assets/css/reviews.css';
import userimage from '../../assets/images/user-image.png';
import Rating from 'react-rating';
import ImageDisplay from '../messages/Image.js';
import ratingEmpty from '../../assets/images/icons/ratingEmpty.svg';
import ratingFull from '../../assets/images/icons/ratingFull.svg';
import { Image } from 'react-bootstrap';

const ReviewContent = (props) => {
  return (
    <div className="px-sm-4 px-2 w-100">
      <div className="d-flex align-items-start border-bottom w-100 pb-2 gap-3">
        <div className="main">
          <div className="content-head d-flex justify-content-between align-items-center">
            <div>
              <div className="d-flex align-items-center">
                <Image
                  src={
                    props?.item?.userId?.photo
                      ? `${process.env.REACT_APP_SERVER_URL}${props?.item?.userId?.photo}`
                      : userimage
                  }
                  alt="user-image"
                  loading="lazy"
                  style={{ width: '40px', height: '40px', borderRadius: '6px' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="ps-3 ps-md-0">
          <div className="d-flex flex-column">
            <p className="p-0 m-0 custom-heading-font fw-bold">{props?.item?.userId?.fullName}</p>
            <div className="d-flex align-items-center">
              <span className="pe-2 text-grey text-16">{props?.item?.rating?.toFixed(1)}</span>
              <Rating
                start={0}
                stop={5}
                step={1}
                direction="ltr"
                readonly={true}
                initialRating={props?.item?.rating}
                emptySymbol={
                  <ImageDisplay
                    src={ratingEmpty}
                    alt=""
                    className="me-1"
                    style={{ height: '12px', width: '12px' }}
                  />
                }
                fullSymbol={
                  <ImageDisplay
                    src={ratingFull}
                    alt=""
                    className="me-1"
                    style={{ height: '12px', width: '12px' }}
                  />
                }
              />
              {/* <Image src={Rating} /> */}
            </div>
          </div>
          <p className="text-16 line-20 mb-0 mt-3">{props?.item?.review}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewContent;
