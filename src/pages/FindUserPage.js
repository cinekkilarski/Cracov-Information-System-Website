import React, { Component } from "react";
import UsersList from "../components/UsersList";
import Cookies from "js-cookie";
import "../styles/FindUserPage.css";

class FindUserPage extends Component {
  state = {
    users: [],
    first_name: "",
    last_name: "",
    email: "",
  };

  handleInputChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };

  handleFilter = () => {
    const { first_name, last_name, email } = this.state;
    fetch(
      `http://localhost:8080/api/users?first_name=${first_name}&last_name=${last_name}&email=${email}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          users: res.users,
          first_name: "",
          last_name: "",
          email: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleAllUsers = () => {
    fetch(`http://localhost:8080/api/users`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          users: res.users,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.handleAllUsers();
  }

  render() {
    const users = this.state.users.map((user) => {
      return <UsersList key={user._id} user={user} />;
    });
    return (
      <div id="maindivFind">
        <h2 id="h3Find">Find User</h2>
        <button className="resetBtn" onClick={this.handleAllUsers}>
          Display All
        </button>
        <div className="filterForm">
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            value={this.state.first_name}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={this.state.last_name}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <button className="filterBtn" onClick={this.handleFilter}>
            Check
          </button>
        </div>
        <table className="tableUser">
          <thead>
            <tr>
              <th> First Name </th>
              <th> Last Name </th>
              <th> Email </th>
              <th> Created At </th>
            </tr>
          </thead>
          <tbody>{users}</tbody>
        </table>
        {!this.state.users.length && (
          <div className="noresultsFilter"> No results</div>
        )}
      </div>
    );
  }
}

export default FindUserPage;
