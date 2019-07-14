import React from "react";
import Register from "./User/Register/Register";
import Login from "./User/Login/Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./Home/Home";
import localStorage from "local-storage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/Register" component={Register} />
          <PrivateRoute exact path="/home" component={Home} />
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
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
export default App;
