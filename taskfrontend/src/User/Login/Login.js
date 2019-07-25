import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import localstorage from "local-storage";

export class Login extends Component {
  state = {
    userID: "",
    password: ""
  };

  onSubmit = e => {
    const user = {
      userID: this.state.userID,
      password: this.state.password
    };
    var apiUrl = "http://localhost:5000";
    axios
      .post(apiUrl + "/user/login", user)
      .then(res => {
        if (!res.err) {
          localstorage.set("userID", this.state.userID);
          localstorage.set("auth_token", res.data.auth_token);
          this.props.history.push("/form");
        }
      })
      .catch(err => {
        alert("authentication failed");
      });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onClickRegister = e => {
    this.props.history.push("/Register");
  };
  render() {
    return (
      <div className="form">
        <div className="form-in">
          <h2>SIGNIN</h2>
          <br />
          <input
            className="input"
            name="userID"
            type="text"
            placeholder="Enter userID"
            onChange={this.onChange}
          />

          <input
            className="input"
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={this.onChange}
          />
          <button onClick={this.onSubmit} className="button">
            Signin
          </button>
          <button onClick={this.onClickRegister} className="button-register">
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
