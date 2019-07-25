import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import ls from "local-storage";
import Header from "../Header/Header";
import "../PendingReq/PendingReq.css";

export default class PendingReq extends Component {
  state = {
    pendingData: []
  };
  colums = [
    {
      Header: "MyUserID",
      accessor: "requestedUserID"
    },
    {
      Header: "Requested User",
      accessor: "send_to"
    },
    {
      Header: "Requested User Dept",
      accessor: "req_to_department"
    },
    {
      Header: "Message",
      accessor: "message"
    }
  ];

  componentDidMount = async () => {
    const id = ls.get("userID");
    const response = await axios.get(`/users/${id}/pending`);
    this.setState({ pendingData: response.data });
    console.log(this.state.pendingData);
  };
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="table">
          <ReactTable
            minRows={10}
            defaultPageSize={10}
            columns={this.colums}
            data={this.state.pendingData}
          />
        </div>
      </div>
    );
  }
}
