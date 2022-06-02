import React, { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "./Signup.css";
import { auth } from '../../firebase-config';
import { db } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const Signup = (props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usersCollectionRef = collection(db, "users");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(usersCollectionRef, { name: name, email: email });
      console.log(user);
      props.successfulLogin();
    }
    catch (error) {
      console.log(error.message);
    }
  }
 
  
  return (
    <div>
      <div className="signup-container">
        <h1>SIGNUP</h1>
        <div className="input-container">
          <p>Name</p>
          <input type="text" onChange={(event) => {setName(event.target.value)}} />
        </div>
        <div className="input-container">
          <p>Email</p>
          <input type="email" onChange={(event) => {setEmail(event.target.value)}} />
        </div>
        <div className="input-container">
          <p>Password</p>
          <input type="password" onChange={(event) => {setPassword(event.target.value)}} />
        </div>
        <button onClick={register}>Sign Up</button>
        <p onClick={() => props.handleRouteChange('login')}>Already a user? Login here!</p>
      </div>
    </div>
  );
};

export default Signup;
