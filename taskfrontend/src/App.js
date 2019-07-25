import React from "react";
import Register from "./User/Register/Register";
import Login from "./User/Login/Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import localStorage from "local-storage";
import PendingReq from "./PendingReq/PendingReq";
import Form from "./Form/Form";
import Requests from "./Requests/Requests";
import AcceptedList from "./AcceptedList/AcceptedList";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/accepted" component={AcceptedList} />
          <PrivateRoute path="/form" component={Form} />
          <PrivateRoute path="/requests" component={Requests} />
          <PrivateRoute path="/pending" component={PendingReq} />
          <Route exact path="/" component={Login} />
          <Route exact path="/Register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.get("auth_token") ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);
export default App;
