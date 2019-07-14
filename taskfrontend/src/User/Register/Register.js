import React, { Component } from "react";
import axios from "axios";
import "./style.css";

export class Register extends Component {
  state = {
    userName: "",
    userID: "",
    password: "",
    department:""
  };

  onSubmit = e => {
    const user = {
      userID : this.state.userID,
      userName: this.state.userName,
      department: this.state.department,
      password: this.state.password
    };
    var apiUrl = "http://localhost:5000";
    axios
      .post(apiUrl+"/user/Register", user)
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          this.props.history.push("/login")
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
          <input
            className="input"
            name="department"
            type="text"
            placeholder="Enter Deparment"
            onChange={this.onChange}
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
