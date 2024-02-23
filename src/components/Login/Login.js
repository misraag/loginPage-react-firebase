import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import firebase from "firebase/compat/app";
import { FaLock, FaUser } from "react-icons/fa";

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
      <div className={styles.login}>
        
        <form className={styles.loginform} onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className={styles.inputbox}>
          <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
          <FaUser className={styles.icons}/>
          </div>
          <div className={styles.inputbox}>
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <FaLock className={styles.icons}/>
          </div>
          <button type="submit">Login</button>
        </form>

        <p>Don't have an account ?<Link to='/signup' className={styles.signuplink}>Register</Link></p>

      </div>
    );
  }
  
  export default Login;