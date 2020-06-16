import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "../styles/Header.css";

const Header = () => {
  const headerData = [
    {
      id: 1,
      h1: "Cracov city!",
      p: "Discover the beuaty of the city",
      img: "http://localhost:8080/api/image/krakowheader1.jpg",
    },
    {
      id: 2,
      h1: "Find places to visit",
      p: "Where is my wallet?",
      img: "http://localhost:8080/api/image/krakowheader2.jpg",
    },
    {
      id: 3,
      h1: "Book & Travel",
      p: "Best Things To Do in Cracov City",
      img: "http://localhost:8080/api/image/krakowheader3.jpg",
    },
  ];

  return (
    <div>
      <Carousel className="testclass">
        {headerData.map((slide) => {
          return (
            <Carousel.Item key={slide.id}>
              <img className="img-carousel" src={slide.img} alt="First slide" />

              <Carousel.Caption className="header-text">
                <h1>{slide.h1}</h1>
                <p>{slide.p}</p>
                <Switch>
                  <Route
                    path="/explore"
                    exact
                    render={() => {
                      return (
                        <Link to="/things">
                          {" "}
                          <button>Things To Do</button>
                        </Link>
                      );
                    }}
                  />
                  <Route
                    render={() => {
                      return (
                        <Link to="/explore">
                          {" "}
                          <button>Explore</button>
                        </Link>
                      );
                    }}
                  />
                </Switch>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Header;
