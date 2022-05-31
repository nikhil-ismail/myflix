import React, { useState } from "react";
import "./Signup.css";

const Signup = (props) => {
  return (
    <div>
      <div className="signup-container">
        <h1>SIGNUP</h1>
        <div className="input-container">
          <p>Name</p>
          <input type="text" />
        </div>
        <div className="input-container">
          <p>Email</p>
          <input type="email" />
        </div>
        <div className="input-container">
          <p>Password</p>
          <input type="password" />
        </div>
        <div className="input-container">
          <p>Confirm Password</p>
          <input type="password" />
        </div>
        <button onClick={props.handleAuthenticate}>Sign Up</button>
        <p onClick={props.handleLogin}>Already a user? Login here!</p>
      </div>
    </div>
  );
};

export default Signup;
