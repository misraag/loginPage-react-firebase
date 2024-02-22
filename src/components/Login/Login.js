import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import firebase from "firebase/compat/app";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Successfully Logged In!')
      navigate('/home');

    } catch (error) {
      console.log("Credentials not matching");
    }
  }

    return (
      <div className="Login">
        
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>

        <p>New User? <Link to='/signup'>Register here</Link></p>

      </div>
    );
  }
  
  export default Login;