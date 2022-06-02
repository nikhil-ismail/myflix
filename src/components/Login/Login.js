import React, { useState } from "react";
import "./Login.css";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "@firebase/auth";

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      props.successfulLogin();
    }
    catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="login-container">
      <h1>LOGIN</h1>
      <div className="input-container">
        <p>Email</p>
        <input type="email" onChange={(event) => {setEmail(event.target.value)}} />
      </div>
      <div className="input-container">
        <p>Password</p>
        <input type="password" onChange={(event) => {setPassword(event.target.value)}} />
      </div>
      <button onClick={login}>Log In</button>
      <p onClick={() => props.handleRouteChange('signup')}>Not a user? Sign up now!</p>
    </div>
  );
};

export default Login;
