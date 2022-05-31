import React, { useState } from "react";
import "./Login.css";
import Signup from "../Signup/Signup";

const Login = (props) => {
  const [endpoint, setEndpoint] = useState("login");

  const handleSignup = () => {
    setEndpoint("signup");
  }

  const handleLogin = () => {
    setEndpoint("login");
  }

  return (
    <div>
      {endpoint === "login" ? (
        <div className="login-container">
          <h1>LOGIN</h1>
          <div className="input-container">
            <p>Email</p>
            <input type="email" />
          </div>
          <div className="input-container">
            <p>Password</p>
            <input type="password" />
          </div>
          <button onClick={props.handleAuthenticate}>Log In</button>
          <p onClick={handleSignup}>Not a user? Sign up now!</p>
        </div>
      ) : (
        <Signup handleAuthenticate={props.handleAuthenticate} handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default Login;
