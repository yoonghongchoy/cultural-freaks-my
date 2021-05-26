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
          <Route
            exact
            path="/"
            render={() =>
              localStorage.getItem("accessToken") ? <Home /> : <Login />
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
