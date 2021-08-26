import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const url = "http://localhost:5000/api/user/login";
const Login = ({setAuth}) => {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(url, state, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.success) {
      setAuth(true)
      localStorage.setItem("user", JSON.stringify(data));
      history.push("/blogs");
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          type="text"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          placeholder="email"
        />
        <br />
        <br />
        <input
          type="text"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
          placeholder="password"
        />
        <br />
        <br />
        <button onClick={handleClick}>Login</button>
        <br />
        <br />
        <small>
          {" "}
          Dont have an account? <Link to="/register">Register</Link>
        </small>
      </form>
    </div>
  );
};

export default Login;
