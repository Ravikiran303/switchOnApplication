import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../Form/Form.css";
import axios from "axios";
export default class Form extends Component {
  state = {
    department: "",
    Message: "",
    users: [],
    selectedUser: ""
  };
  fetchUsers = dept => {
    axios.get(`/department/${dept}/users`).then(res => {
      let user = res.data.map(m => {
        return m.userName;
      });
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
  render() {
    const departments = ["CSE", "ECE", "MECH", "CIVIL"];
    return (
      <div className="form">
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
        <button>Submit</button>
      </div>
    );
  }
}
