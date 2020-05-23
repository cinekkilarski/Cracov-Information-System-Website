import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import '../styles/Header.css'
import img1 from '../images/krakow_header_1.jpg'
import img2 from '../images/krakow_header_2.jpg'
import img3 from '../images/krakow_header_3.jpg'

const Header = () => {
  const headerData = [{
    id: 1,
    h1: 'Cracov city!',
    p: 'Discover the beuaty of the city',
    img: img1
  }, {
    id: 2,
    h1: 'Find places to visit',
    p: 'Where is my wallet?',
    img: img2
  }, {
    id: 3,
    h1: 'Book & Travel',
    p: 'Best Things To Do in Cracov City',
    img: img3
  }]

  const slides = headerData.map(slide => {
    return (
      <Carousel.Item key={slide.id} >
        <img
          className="img-carousel"
          src={slide.img}  //{img2}
          alt="First slide"
        />

        <Carousel.Caption className="header-text">
          <h1>{slide.h1}</h1>
          <p>{slide.p}</p>
          <Switch>
            <Route path="/explore" exact render={(props) => {// console.log(props);
              return (
                <Link to='/things'> <button>Things To Do</button></Link>
              )
            }} />
            <Route render={() => {
              return (
                <Link to='/explore'> <button>Explore</button></Link>
              )
            }} />
          </Switch>
        </Carousel.Caption>
      </Carousel.Item>
    )
  }

  )
  return (
    <div>
      <Carousel className="testclass">
        {slides}
      </Carousel>
    </div>
  );

}

export default Header;

