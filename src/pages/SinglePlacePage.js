import React, { Component } from "react";
import "../styles/SinglePlacePage.css";
import OpenStreetMap from "../components/OpenStreetMap";
import Comments from "../components/Comments";
import StarRating from "../components/StarRating";
import { Card, Modal } from "react-bootstrap";
import jwt from "jwt-decode";
import Cookies from "js-cookie";

class SinglePlacePage extends Component {
  constructor(props) {
    super(props);
    this.childComments = React.createRef();
  }
  state = {
    exploreData: "",
    averageGrade: "",
    isLoaded: false,
    text: "",
    displayMessage: false,
    successMessage: false,
  };
  messages = {
    loginMessage: "This option is only available for logged users!",
    successMessage: "Thank you for your opinion",
  };

  handleInputChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };

  handleStarRating = (rate) => {
    if (Cookies.get("token")) {
      const updateRate = {
        newGrade: rate,
      };
      fetch(
        `http://localhost:8080/api/places/explore/${this.props.match.params.id}/updaterate`,
        {
          method: "PUT",
          body: JSON.stringify(updateRate),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              displayMessage: true,
              successMessage: true,
            });
            return res.json();
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .then((res) => {
          this.setState({
            averageGrade: res.newAveGrade,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({
        displayMessage: true,
        successMessage: false,
      });
    }
  };

  handleAddComment = (e) => {
    e.preventDefault();
    let decodeToken = "";
    if (Cookies.get("token")) {
      decodeToken = jwt(Cookies.get("token"));
      const commentData = {
        place: this.props.match.params.id,
        first_name: decodeToken.first_name,
        last_name: decodeToken.last_name,
        text: this.state.text,
      };
      fetch("http://localhost:8080/api/comments", {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
        .then((res) => {
          if (res.status === 201) {
            this.setState({
              text: "",
              displayMessage: true,
              successMessage: true,
            });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({
        displayMessage: true,
        successMessage: false,
      });
    }
    setTimeout(() => {
      this.childComments.current.handleLoadComments();
    }, 500);
  };

  componentDidMount() {
    fetch(
      `http://localhost:8080/api/places/explore/${this.props.match.params.id}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          averageGrade: res.result.rate.averageGrade,
          exploreData: res.result,
          isLoaded: true,
        });
      })
      .then(() => this.child.handleSetPlaceLocalisation())
      .catch((error) => this.setState({ error }));
  }

  render() {
    return (
      this.state.isLoaded && (
        <div className="backgroundSingle">
          <img
            className="imgPlace"
            src={this.state.exploreData.image}
            alt="place"
          />
          <div className="headerClass">
            <h1 className="h1Place">{this.state.exploreData.place}</h1>
          </div>
          <div className="mainPlaceDataContainer">
            <Card className="rateCss">
              <div id="singleAddress">
                Address: <br />
                {this.state.exploreData.address}
              </div>
              <StarRating
                className="starRating"
                handleStarRating={this.handleStarRating}
                grade={this.state.averageGrade}
              />
            </Card>
            <Card className="commentCss">
              <Card.Header
                style={{
                  color: "white",
                  fontSize: "25px",
                  height: "50px",
                }}
              >
                Comments
              </Card.Header>
              <Comments
                currentPlace={this.props.match.params.id}
                ref={this.childComments}
              />
              <div>
                <form
                  className="addCommentCss"
                  onSubmit={this.handleAddComment}
                >
                  <textarea
                    type="text"
                    id="text"
                    name="text"
                    placeholder="Add your opinion"
                    value={this.state.text}
                    onChange={this.handleInputChange}
                  ></textarea>
                  <button id="addButton">Comment</button>
                </form>
              </div>
            </Card>
          </div>
          <Card className="textFormat">
            <Card.Header>Some History</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p id="somehistorytext">
                  {this.state.exploreData.somehistory}{" "}
                </p>
              </blockquote>
            </Card.Body>
          </Card>
          <div className="mapPanel">
            <OpenStreetMap
              exploreData={this.state.exploreData}
              ref={(cd) => (this.child = cd)}
            />
          </div>
          <Modal
            variant="warning"
            size="sm"
            show={this.state.displayMessage}
            onHide={() => {
              this.setState({ displayMessage: false });
            }}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <div className="modalStyle">
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                  {this.state.successMessage ? "Success!" : "Acess denied!"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.state.successMessage
                  ? this.messages.successMessage
                  : this.messages.loginMessage}
              </Modal.Body>
            </div>
          </Modal>
        </div>
      )
    );
  }
}

export default SinglePlacePage;
