import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./HomePage.css";
import { auth } from "../firebase-config";

function HomePage() {
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
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logoutUser = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <div className="Title">
        <h1>PennCourseReq</h1>
      </div>
      <div className="HomePage">
        <div>
          <h3>
            Current User:
          </h3>
          {user?.email}
        </div>
        <div>
          <h3> Register Student</h3>
          <input
            value={registerEmail}
            placeholder="Email" 
            onChange={(event) => {
              setEmail(event.target.value);
            }}/>
          <input 
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

        <div>
          <h3> Login Student</h3>
          <input
            value={loginEmail}
            placeholder="Email."
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}/>
          <input
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

      </div>
    </div>
  );
}

export default HomePage;