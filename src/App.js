import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./features/auth/login/Login";
import Home from "./features/home/Home";
import ActivateAccount from "./features/auth/activateAccount/ActivateAccount";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Profile from "./features/profile/Profile";
import ForgotPassword from "./features/auth/forgotPassword/ForgotPassword";
import ResetPassword from "./features/auth/resetPassword/ResetPassword";
import SinglePost from "./features/home/singlePost/SinglePost";

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
          <Route exact path="/forgot" component={ForgotPassword} />
          <Route exact path="/reset" component={ResetPassword} />
          <Route exact path="/profile/:userId" component={Profile} />
          <Route exact path="/post/:postId" component={SinglePost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
