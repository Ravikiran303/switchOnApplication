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
          alert("Registered Successfully");
          this.props.history.push("/");
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
        <div className="form-in1">
          <h2>REGISTER</h2>
          <input
            className="input"
            name="userID"
            type="text"
            placeholder="Enter userID"
            onChange={this.onChange}
          />

          <input
            className="input"
            name="userName"
            placeholder="Enter Full Name"
            type="text"
            onChange={this.onChange}
          />

          <input
            className="input"
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={this.onChange}
          />

          <Dropdown
            options={departments}
            value={this.state.department}
            onChange={e => {
              this.setState({ department: e.value });
            }}
          />

          <button className="button" onClick={this.onSubmit}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
