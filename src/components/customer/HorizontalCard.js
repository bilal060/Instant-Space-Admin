import React from 'react';
import Image from 'react-bootstrap/Image';
import '../../assets/css/space-card.css';
import { Col, Row } from 'react-bootstrap';
import gallery from '../../assets/images/icons/CardIcons/gallery.svg';
import phone from '../../assets/images/icons/CardIcons/phone.svg';
import flag from '../../assets/images/icons/CardIcons/flag.svg';
import location from '../../assets/images/icons/CardIcons/location.svg';
import space from '../../assets/images/icons/CardIcons/space.svg';
import dollar from '../../assets/images/icons/CardIcons/dollar.svg';
import rating from '../../assets/images/icons/CardIcons/rating.svg';

const HorizontalCard = (props) => {
  return (
    <Row className="horizontal-card mx-0" onClick={() => props.spaceClickHandler(props.id)}>
      <Col xl="6" className=" position-relative px-0">
        <Image src={props.src} className="w-100 horizontal-card-img" fluid />
        <div className="gallery position-absolute positioning ">
          <p className="d-flex align-items-center text-white rounded-lg mb-0 px-2 py-1 text-14 ">
            <Image alt="gallery" src={gallery} className=" pe-1" />
            {props.gallery}
          </p>
        </div>
      </Col>

      <Col xl="6" className="p-3">
        <div className="">
          <div className="text-18 fw-bolder text-truncate">{props.title}</div>
          <Row>
            <Col lg={12} xs={6} className="pe-0">
              <div className="phone pt-3 grey text-14">
                <Image alt="gallery" src={phone} className=" pe-1" />
                {props.phone}
              </div>
            </Col>
            <Col lg={12} xs={6} className="pe-0">
              <div className="capacity pt-3 grey text-14">
                <Image alt="gallery" src={flag} className=" pe-1" />
                <span>Capacity: </span>
                <span className="text-black text-14">{props.capacity}</span>
              </div>
            </Col>
          </Row>
          <div className="address pt-3 grey text-14 d-flex text-truncate">
            <Image alt="gallery" src={location} className=" pe-1" />
            {props.address}
          </div>
          <Row>
            <Col lg={12} xs={6} className="pe-0">
              <div className="type grey pt-3 text-14 ">
                <Image alt="gallery" src={space} className=" pe-1" />
                Type: <span className="text-black text-14">{props.type}</span>
              </div>
            </Col>
            <Col lg={12} xs={6} className="pe-0">
              <div className="rate grey pt-3 text-14">
                <Image alt="gallery" src={dollar} className=" pe-1" />
                Rate: <span className="text-black text-14">{props.rate}</span>
              </div>
            </Col>
          </Row>
        </div>

        <hr />
        <div className="footer d-flex justify-content-between pt-3">
          <div className="d-flex align-items-center gap-2 text-grey">
            <Image alt="gallery" src={rating} />
            {props.rating}
          </div>
          <div className="d-flex justify-content-between">
            <Image alt="gallery" src={props.icon1} className=" pe-2" />
            <Image alt="gallery" src={props.icon2} className=" pe-2" />
            <Image alt="gallery" src={props.icon3} className=" pe-2" />
            <Image alt="gallery" src={props.icon4} className=" pe-3" />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default HorizontalCard;
