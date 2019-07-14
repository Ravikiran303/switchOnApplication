import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export class Register extends Component {
  state = {
    userName: "",
    userID: "",
    password: "",
    department: ""
  };

  onSubmit = e => {
    const user = {
      userID: this.state.userID,
      userName: this.state.userName,
      department: this.state.department,
      password: this.state.password
    };
    var apiUrl = "http://localhost:5000";
    axios
      .post(apiUrl + "/user/Register", user)
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          this.props.history.push("/login");
        }
      })
      .catch(err => {
        alert("Registration failed");
      });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const departments = ["CSE", "ECE", "MECH", "CIVIL"];
    return (
      <div className="form">
        <div className="form-in">
          <h2>REGISTER</h2>
          <input
            className="input"
            name="userID"
            type="text"
            placeholder="Enter userID"
            onChange={this.onChange}
          />
          <br />
          <input
            className="input"
            name="userName"
            placeholder="Enter Full Name"
            type="text"
            onChange={this.onChange}
          />
          <br />
          <input
            className="input"
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={this.onChange}
          />
          <br />
          <Dropdown
            options={departments}
            value={this.state.department}
            onChange={e => {
              this.setState({ department: e.value });
            }}
          />
          <br />
          <button className="button" onClick={this.onSubmit}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
