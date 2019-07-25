import React, { Component } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/form" className="link">
              Forms
            </Link>
          </li>
          <li>
            <Link to="/pending" className="link">
              Pending
            </Link>
          </li>
          <li>
            <Link to="/accepted" className="link">
              Accepted
            </Link>
          </li>
          <li>
            <Link to="/requests" className="link">
              Request(for Approval)
            </Link>
          </li>
          <li
            className="logout"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </li>
        </ul>
      </div>
    );
  }
}
