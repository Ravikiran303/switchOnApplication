import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../Form/Form.css";
import axios from "axios";
import ls from "local-storage";
import Header from "../Header/Header";

export default class Form extends Component {
  state = {
    department: "",
    Message: "",
    users: [],
    selectedUser: "",
    requested_userDept: ""
  };

  fetchUsers = dept => {
    const requested_userID = ls.get("userID");
    axios.get(`/department/${dept}/users`).then(res => {
      let user = res.data
        .filter(m => {
          return m.userID !== requested_userID;
        })
        .map(m => m.userID);
      this.setState({ users: user });
    });
  };

  onSelect = event => {
    this.setState(
      {
        department: event.value
      },
      e => {
        this.fetchUsers(this.state.department);
      }
    );
  };
  componentDidMount = async () => {
    const requested_userID = ls.get("userID");
    const response = await axios.get(`/users/${requested_userID}`);
    this.setState({ requested_userDept: response.data.department });
    ls.set("dept", this.state.requested_userDept);
  };
  onSubmit = e => {
    e.preventDefault();
    const requested_userID = ls.get("userID");
    const request = {
      requested_userID: requested_userID,
      requestedUserDept: this.state.requested_userDept,
      department: this.state.department,
      selectedUser: this.state.selectedUser,
      Message: this.state.Message
    };
    axios
      .post("/form", request)
      .then(res => {
        alert("submitted successfully");
      })
      .catch(err => {
        alert(err + "submit failed");
      });
  };
  render() {
    const departments = ["CSE", "ECE", "MECH", "CIVIL"];
    return (
      <div className="form">
        <div>
          <Header />
        </div>
        <div id="form1" className="form_1">
          <h2>Form</h2>
          <Dropdown
            options={departments}
            value={this.state.department}
            onChange={this.onSelect}
          />
          <br />
          <Dropdown
            options={this.state.users}
            value={this.state.selectedUser}
            onChange={e => {
              this.setState({ selectedUser: e.value }, e => {});
            }}
          />
          <br />
          <input
            type="text"
            placeholder="Enter Message"
            onChange={e => {
              this.setState({ Message: e.target.value });
            }}
          />
          <br />
          <button onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}
