import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Signup.module.css';


function Signup() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


    return (
      <div className="Signup">
        
        <form>
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