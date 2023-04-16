import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase-config";

import { ImageContainer, PennImage } from "./styles.js";
import penn from '../../media/penn.jpg';

function HomePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [registerEmail, setEmail] = useState("");
  const [registerPassword, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [])

  const registerUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setEmail("");
      setPassword("");
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const loginUser = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setLoginEmail("");
      setLoginPassword("");
      navigate("/rec");
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logoutUser = async () => {
    await signOut(auth);
  };

  return (
    <div className="HomePage">
      <ImageContainer>
        
      </ImageContainer>
      <div className="LoginBoxR">
        <div>
          <h3 style={{"font-size": "36px"}}>
            Login
          </h3>
        </div>

        <div>
          <input
            class="form-field"
            value={loginEmail}
            placeholder="Email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}/>
          <input
            class="form-field"
            value={loginPassword}
            type="password"
            placeholder="Password."
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}/>
          <button onClick={loginUser}>
            Login
          </button>
          <button onClick={logoutUser}>
            Logout
            </button>
        </div>

        <div>
          <h3> Register</h3>
          <input
            class="form-field"
            value={registerEmail}
            placeholder="Email" 
            onChange={(event) => {
              setEmail(event.target.value);
            }}/>
          <input 
            class="form-field"
            type="password"
            value={registerPassword}
            placeholder="Password" 
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            />

          <button onClick={registerUser}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;