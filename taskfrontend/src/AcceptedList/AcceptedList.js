import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import ls from "local-storage";
import Header from "../Header/Header";
import "../AcceptedList/AcceptedList.css";

export default class AcceptedList extends Component {
  state = {
    accptedList: []
  };
  colums = [
    {
      Header: "Requested User",
      accessor: "requestedUserID"
    },
    {
      Header: "Accepted User",
      accessor: "send_to"
    },
    {
      Header: "Accepted User Dept",
      accessor: "req_to_department"
    }
  ];
  componentDidMount = async () => {
    const loggedinUser = ls.get("userID");
    const responce = await axios.get(`/users/${loggedinUser}/acceptedBy`);
    this.setState({ accptedList: responce.data });
  };
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <ReactTable
          columns={this.colums}
          data={this.state.accptedList}
          minRows={10}
          defaultPageSize={10}
        />
      </div>
    );
  }
}
