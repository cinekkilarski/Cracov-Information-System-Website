import React, { Component } from "react";
import Slider from "react-slick";
import '../styles/ThingsToDoPage.css'
import { Card } from 'react-bootstrap'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default class ThingsToDoPage extends Component {

    state = {
        restaurants: [],
        pubs: [],
        places: [],
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/places/restaurants')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    restaurants: res.restaurants,
                })
            }).catch(error => console.log(error));

        fetch('http://localhost:8080/api/places/pubs')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    pubs: res.pubs,
                })
            }).catch(error => console.log(error));

        fetch('http://localhost:8080/api/places/explore')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    places: res.result,
                })
            }).catch(error => console.log(error));
    }

    render() {
        // console.log(this.state.pubs);
        const settings = {
            infinite: true,
            slidesToShow: 4,
            // slidesToScroll: 3,
            speed: 500
        };

        const restaurants = this.state.restaurants.map(restaurant => (
            <Card key={restaurant.restaurantName} border="info" className="cardThings">
                <Card.Img variant="top" src={restaurant.image} />
                <Card.Body>
                    <Card.Title>{restaurant.restaurantName}</Card.Title>
                    <Card.Text>
                        Address:  {restaurant.address}
                    </Card.Text>
                </Card.Body>
            </Card>
        ))

        const pubs = this.state.pubs.map(pub => (
            <Card key={pub.pubName} border="danger" className="cardThings">
                <Card.Img variant="top" src={pub.image} />
                <Card.Body>
                    <Card.Title>{pub.pubName}</Card.Title>
                    <Card.Text>
                        Address:  {pub.address}
                    </Card.Text>
                </Card.Body>
            </Card>
        ))

        const places = this.state.places.map(place => (
            <Card key={place.place} border="success" className="cardThings">
                <Card.Img variant="top" src={place.image} />
                <Card.Body>
                    <Card.Title>{place.place}</Card.Title>
                    <Card.Text>
                        Address:  {place.address}
                    </Card.Text>
                </Card.Body>
            </Card>
        ))

        return (
            <div className="mainThings">
                <div className="headerThings"><h1>Kraków's waiting for You!</h1></div>
                <div className="slickCss">
                    <h2>Recommended Restaurants</h2>
                    <Slider {...settings}>
                        {restaurants}
                    </Slider>
                </div>
                <div className="slickCss">
                    <h2>Nightlife</h2>
                    <Slider {...settings}>
                        {pubs}
                    </Slider>
                </div>
                <div className="slickCss">
                    <h2>Must have to visit!</h2>
                    <Slider {...settings}>
                        {places}
                    </Slider>
                </div>
            </div>
        );
    }
}