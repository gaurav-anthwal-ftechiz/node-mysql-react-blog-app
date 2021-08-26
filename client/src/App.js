import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import Profile from "./components/Profile";
import BlogSingle from "./components/BlogSingle";

function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setAuth(true);
    }
  });
  return (
    <Router>
      <Header auth={auth} setAuth={setAuth} />
      <Switch>
        <div className="App">
          <Route exact path="/">
            {" "}
            <Home setAuth={setAuth} />
          </Route>
          <Route exact path="/login">
            <Login setAuth={setAuth} />
          </Route>
          <Route exact path="/register">
            <Register setAuth={setAuth} />
          </Route>
          <Route exact path="/blogs">
            <Blogs setAuth={setAuth} />
          </Route>
          <Route exact path="/user/:id">
            <Profile />
          </Route>
          <Route exact path="/blog/:id">
            <BlogSingle />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
