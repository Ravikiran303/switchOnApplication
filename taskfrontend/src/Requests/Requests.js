import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import ls from "local-storage";
import "../Requests/Requests.css";
import Header from "../Header/Header";

export default class Requests extends Component {
  state = {
    requestedData: []
  };
  colums = [
    {
      Header: "Requested User",
      accessor: "requestedUserID"
    },
    {
      Header: "Requested To",
      accessor: "send_to"
    },
    {
      Header: "Requested User Dept",
      accessor: "req_to_department"
    },
    {
      Header: "Message",
      accessor: "message"
    },
    {
      Header: "Status",
      Cell: props => {
        const loggedinUser = ls.get("userID");
        return loggedinUser === props.original.send_to ? (
          <div className="req_buttons">
            <button
              onClick={event => {
                this.acceptRequest(props.original._id);
              }}
            >
              Accept
            </button>
            <button onClick={this.rejectRequest(props.original._id)}>
              Reject
            </button>
          </div>
        ) : (
          ""
        );
      }
    }
  ];
  updateTable = formID => {
    const filtered = this.state.requestedData.filter(form => {
      return form !== formID;
    });
    console.log(filtered);
  };
  acceptRequest = async formID => {
    const response = await axios.put(`/forms/${formID}/accept`);
    alert("accepted Successfully");
    console.log(response);
  };
  rejectRequest = async formID => {
    const response = await axios.put(`/users/${formID}/reject`);
    alert("rejected Request");
    console.log(response);
  };
  componentDidMount = async () => {
    const response = await axios.get(`/users/${requestedUserDept}/requests`);
    this.setState({ requestedData: response.data });
  };
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <ReactTable
          minRows={10}
          defaultPageSize={10}
          columns={this.colums}
          data={this.state.requestedData}
        />
      </div>
    );
  }
}
