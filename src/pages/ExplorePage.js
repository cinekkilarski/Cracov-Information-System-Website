import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../styles/ExplorePage.css";
class ExplorePage extends Component {
  state = {
    exploreData: [],
    isLoaded: false,
  };

  componentDidMount() {
    fetch("http://localhost:8080/api/places/explore")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          exploreData: res.result,
          isLoaded: true,
        });
      })
      .catch((error) => this.setState({ error }));
  }

  render() {
    const displayCards = this.state.exploreData.map((card) => (
      <div key={card.pageName}>
        <Card className="card">
          <Card.Img src={card.image} variant="top" className="cardImage" />
          <Card.Body>
            <Card.Title> {card.place}</Card.Title>
            <Card.Text>{card.shortDescription}</Card.Text>
            <Link to={`/explore/${card.pageName}`}>
              <button className="exploreButton">More</button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    ));
    return (
      this.state.isLoaded && (
        <div className="exploreMainDiv">{displayCards}</div>
      )
    );
  }
}

export default ExplorePage;
