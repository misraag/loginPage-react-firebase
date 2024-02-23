import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Signup.module.css';
import firebase from "firebase/compat/app";
import { FaLock, FaUser } from "react-icons/fa";

function Signup() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('Successfully registered!')
      navigate('/login');
    } catch (error) {
      console.log("unable to signup");
    }
  }


    return (
      <div className={styles.container}>
      <div className={styles.login}>
        
        <form className={styles.signupform} onSubmit={handleSignup}>
          <h1>Signup</h1>
          <div className={styles.inputbox}>
          <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
          <FaUser className={styles.icons}/>
          </div>
          <div className={styles.inputbox}>
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <FaLock className={styles.icons}/>
          </div>
          <button type="submit">Register</button>
        </form>

      </div>
      </div>
    );
  }
  
  export default Signup;