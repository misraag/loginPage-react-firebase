import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Signup.module.css';
import firebase from "firebase/compat/app";

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
      <div className="Signup">
        
        <form onSubmit={handleSignup}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <button type="submit">Signup</button>
        </form>

      </div>
    );
  }
  
  export default Signup;