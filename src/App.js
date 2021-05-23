import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./features/auth/login/Login";
import Home from "./features/home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact component={Login} path="/login" />
          <Route
            exact
            path="/"
            render={(props) =>
              localStorage.getItem("token") ? (
                <Home />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
