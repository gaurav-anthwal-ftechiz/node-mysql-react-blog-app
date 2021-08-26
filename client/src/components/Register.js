import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const url = "http://localhost:5000/api/user/register";
const Register = ({ setAuth }) => {
  const history = useHistory();
  const [state, setState] = useState({
    name: "",
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
    console.log(data);
    if (data.success) {
      setAuth(true);
      localStorage.setItem("user", JSON.stringify(data));
      history.push("/blogs");
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form>
        <input
          type="text"
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
          placeholder="name"
        />
        <br />
        <br />
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
        <button onClick={handleClick}>Register</button>
        <br />
        <br />
        <small>
          {" "}
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </form>
    </div>
  );
};

export default Register;
