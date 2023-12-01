/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Slider from 'react-slick';
import { Image } from 'react-bootstrap';
import LogoImg from '../../assets/images/logowhite.svg';

const SpaceSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: 'slick-dots slick-dots-custom'
  };
  return (
    <div className="NewSpace p-0">
      <div className="NewSpace p-4 promotional-banner">
        <Slider {...settings}>
          <div className="d-flex justify-content-between align-items-start gap-3">
            <div>
              <h3>Lorem ipsum dolor sit amet consecr.</h3>
              <p className="font-weight-400">
                Ipsum has been the industry's standard dummy text ever since the 1500s
              </p>
            </div>
            <Image fluid className="mb-2" src={LogoImg} loading="lazy" />
          </div>
          <div className="d-flex justify-content-between align-items-start gap-3">
            <div>
              <h3>Lorem ipsum dolor sit amet consecr.</h3>
              <p className="font-weight-400">
                Ipsum has been the industry's standard dummy text ever since the 1500s
              </p>
            </div>
            <Image fluid className="mb-2" src={LogoImg} loading="lazy" />
          </div>
          <div className="d-flex justify-content-between align-items-start gap-3">
            <div>
              <h3>Lorem ipsum dolor sit amet consecr.</h3>
              <p className="font-weight-400">
                Ipsum has been the industry's standard dummy text ever since the 1500s
              </p>
            </div>
            <Image fluid className="mb-2" src={LogoImg} loading="lazy" />
          </div>
          <div className="d-flex justify-content-between align-items-start gap-3">
            <div>
              <h3>Lorem ipsum dolor sit amet consecr.</h3>
              <p className="font-weight-400">
                Ipsum has been the industry's standard dummy text ever since the 1500s
              </p>
            </div>
            <Image fluid className="mb-2" src={LogoImg} loading="lazy" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default SpaceSlider;
