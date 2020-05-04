import React from 'react';
import { Carousel, Button } from 'react-bootstrap'
import '../styles/Header.css'
import img1 from '../images/header/krakow_header_1.jpg'
import img2 from '../images/header/krakow_header_2.jpg'
import img3 from '../images/header/krakow_header_3.jpg'

const Header = () => {

  return (
    <div>
      <Carousel className="testclass">
        <Carousel.Item  >
          <img
            className="img-carousel"
            src={img2}
            alt="First slide"
          />
          <Carousel.Caption className="header-text">
            <h1>Cracov city!</h1>
            <p>Discover the beuaty of the city</p>
            <Button >Explore
        </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
          <img
            className="img-carousel"
            src={img1}
            alt="Third slide"
          />
          <Carousel.Caption className="header-text">
            <h1>Find places to visit</h1>
            <p>Where is my wallet?</p>
            <button>Explore</button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="img-carousel"
            src={img3}
            alt="Third slide"
          />
          <Carousel.Caption className="header-text">
            <h1>Book & Travel</h1>
            <p>Best Things To Do in Cracov City</p>
            <button>Explore</button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Header;