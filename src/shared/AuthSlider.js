import React from 'react';
import { Image } from 'react-bootstrap';
import Junction from '../assets/images/auth-section2-image.svg';

import '../assets/css/auth-slider.css';

const AuthSlider = () => {
  return (
    // <Carousel
    //   controls={false}
    //   indicators={false}
    //   interval={3000}
    //   data-aos="fade-left"
    // >
    //   {slides.map((slide, index) => {
    //     return (
    //       <Carousel.Item key={index}>
    //         <img className="d-block w-100" src={slide.img} alt="Slide" />
    //         <div class="overlay"></div>
    //         <Carousel.Caption className="slide-caption">
    //           <h3 className="slide-title">{slide.title}</h3>
    //           <p className="slide-description">{slide.description}</p>
    //         </Carousel.Caption>
    //       </Carousel.Item>
    //     );
    //   })}
    // </Carousel>

    <div className="slider-section d-flex justify-content-around h-100 flex-column">
      <div className="d-lg-block d-none">
        <h3 className="slide-title text-white mb-3">Lorem ipsum dolor sit amet</h3>
        <p className="slide-description text-white">
          Lorem ipsum dolor sit amet consectetur. Non sit volutpat egestas tempus molestie posuere
          nullam cursus. Egestas venenatis fusce turpis aenean sem sit bibendum. Libero sit
          tincidunt dui phasellus adipiscing fermentum molestie urna.
        </p>
      </div>
      <Image
        fluid
        src={Junction}
        alt="Logo"
        loading="lazy"
        xs="12"
        md="6"
        className="d-none d-lg-block"
      />
    </div>
  );
};

export default AuthSlider;
