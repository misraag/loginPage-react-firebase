import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCj38jwI6YA1AtDJKQuzzmoJvgcrUdD5Ho",
  authDomain: "login-imageupload.firebaseapp.com",
  projectId: "login-imageupload",
  storageBucket: "login-imageupload.appspot.com",
  messagingSenderId: "689419057967",
  appId: "1:689419057967:web:84d8d5764c86f2df7e7fda"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut();
  };


  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/home' element={<PrivateRoute user={user} handleLogout={handleLogout} />} />
        <Route index element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}


const PrivateRoute = ({user, handleLogout}) => {
  return user ? (
    <Home user={user} handleLogout={handleLogout} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default App;
