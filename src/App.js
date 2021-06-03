import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./features/auth/login/Login";
import Home from "./features/home/Home";
import ActivateAccount from "./features/auth/activateAccount/ActivateAccount";

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
          <Route exact path="/activation" component={ActivateAccount} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
