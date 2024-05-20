import React from 'react';
import Slider from 'react-slick';
import deliciousFood from "../static/delicious-food.jpg";
import healthyFood from "../static/healthy-food.jpg";
import sandwich from "../static/sandwich.jpg";
import "../styles/Carousel.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

/**
 * CarouselBackground component that displays a background image carousel using react-slick.
 * 
 * @component
 * @example
 * return (
 *   <CarouselBackground />
 * )
 */
const CarouselBackground = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear"
  };

  return (
    <div className='carousel-background'>
      <Slider {...settings}>
        <div>
          <img src={deliciousFood} alt="Background 1" />
        </div>
        <div>
          <img src={healthyFood} alt="Background 2" />
        </div>
        <div>
          <img src={sandwich} alt="Background 3" />
        </div>
      </Slider>
    </div>
  );
};

export default CarouselBackground;
