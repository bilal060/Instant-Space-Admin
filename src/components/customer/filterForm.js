import React, { useState } from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import filterRadius from '../../assets/images/icons/filterRadius.svg';
import filterFeature from '../../assets/images/icons/filterFeature.svg';
import cctv from '../../assets/images/icons/featureCctv.svg';
import gated from '../../assets/images/icons/gated.svg';
import featureFuel from '../../assets/images/icons/cctv.svg';
import electricity from '../../assets/images/icons/electricity.svg';
import Rating from 'react-rating';
import ratingFull from '../../assets/images/icons/ratingFull.svg';
import ratingEmpty from '../../assets/images/icons/ratingEmpty.svg';

const distance = [
  {
    id: '1',
    text: 'All'
  },
  {
    id: '2',
    text: '1 Km'
  },
  {
    id: '3',
    text: '3 Km'
  },
  {
    id: '4',
    text: '4 Km'
  },
  {
    id: '5',
    text: '5 Km'
  },
  {
    id: '6',
    text: '7 Km'
  }
];

const features = [
  {
    id: '1',
    text: 'All'
  },
  {
    id: '2',
    text: 'Electricity',
    imgSrc: electricity
  },
  {
    id: '3',
    text: 'CCTV',
    imgSrc: cctv
  },
  {
    id: '4',
    text: 'Gated',
    imgSrc: gated
  },
  {
    id: '5',
    text: 'Fuel Availability',
    imgSrc: featureFuel
  }
];
const CustomerHomeFilterForm = ({ setLgShow }) => {
  const [Distance, setDistance] = useState('All');
  const [rating, setRating] = useState(4);

  const [userinfo, setUserInfo] = useState({
    features: [],
    response: []
  });

  const handleChange = (e) => {
    const { value, checked } = e.target;
    const { features } = userinfo;
    if (checked) {
      setUserInfo({
        features: [...features, value],
        response: [...features, value]
      });
    } else {
      setUserInfo({
        features: features.filter((e) => e !== value),
        response: features.filter((e) => e !== value)
      });
    }
  };
  const ratingHandler = (rating) => {
    setRating(rating);
  };
  return (
    <div className="form-space px-0">
      <Form className="p-3" onSubmit={(e) => e.preventDefault(e)}>
        <div className="d-flex align-items-center gap-3 space-type mb-4">
          {distance.map((data, index) => {
            return (
              <div className="cutomer-home cutomer-home-filter" key={index}>
                <div className="d-flex button align-items-center w-auto gap-3 modal-tabs">
                  <Form.Check
                    checked={Distance === data.text}
                    onChange={() => {
                      setDistance(data.text);
                    }}
                    inline
                    label={<>{data.text}</>}
                    name="distance"
                    type="radio"
                    id={`inline-distance-${data.id}`}
                    className="p-0 m-0 "
                  />
                </div>
              </div>
            );
          })}
        </div>
        <h3 className="fw-bolder fs-5 mb-3 d-flex align-items-center gap-2">
          <Image src={filterFeature} alt="" fluid /> Filter by Features
        </h3>
        <div className="d-flex align-items-center gap-3 space-type mb-4">
          {features.map((data, index) => {
            return (
              <div className="cutomer-home cutomer-home-filter" key={index}>
                <div className="d-flex button align-items-center w-auto gap-3 modal-tabs">
                  <Form.Check
                    onChange={handleChange}
                    value={data.text}
                    inline
                    label={
                      <>
                        <Image src={data.imgSrc} alt="" fluid />
                        {data.text}
                      </>
                    }
                    name="features"
                    type="checkbox"
                    id={`features-${data.id}-12`}
                    className="p-0 m-0"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <h3 className="fw-bolder fs-5 mb-3 d-flex align-items-center gap-2">
          <Image src={filterRadius} alt="" fluid /> Filter by Price
        </h3>
        <div className="d-flex flex-column align-items-start justify-content-center w-100 gap-2 mb-4">
          <input
            type="range"
            className="form-control-range w-100"
            min="5"
            max="45"
            step="5"></input>
          <p className="rangetext d-flex w-100 justify-content-between m-0">
            <span>$5</span>
            <span>$10</span>
            <span>$15</span>
            <span>$20</span>
            <span>$25</span>
            <span>$30</span>
            <span>$35</span>
            <span>$40</span>
            <span>$45</span>
          </p>
        </div>
        <h3 className="fw-bolder fs-5 mb-3 d-flex align-items-center gap-2">
          <Image src={filterRadius} alt="" fluid /> Filter by Ratings
        </h3>
        <div className="d-flex align-items-center gap-2">
          <Rating
            start={0}
            stop={5}
            step={1}
            direction="ltr"
            readonly={false}
            initialRating={rating}
            emptySymbol={<Image src={ratingEmpty} alt="" className="me-2" fluid />}
            fullSymbol={<Image src={ratingFull} alt="" className="me-2" fluid />}
            onChange={ratingHandler}
          />
          <p className="fw-bold fs-6 m-0">{rating}.0</p>
        </div>
        <Row className="justify-content-end mt-5 gap-sm-0 gap-3">
          <Col md="6" sm="4">
            <Button
              type="submit"
              className="btn-orange-outline w-100"
              onClick={() => setLgShow(false)}>
              Reset All
            </Button>
          </Col>
          <Col md="6" sm="4">
            <Button type="submit" className="btn-blue w-100">
              Apply
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CustomerHomeFilterForm;
