import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase-config";
import Alert from 'react-popup-alert';

import { 
  ImageContainer,
  GreaterFieldBox, 
  InputFieldBox, 
  LoginBox,
  Title,
  Button
} from "./styles.js";

function HomePage() {
  const navigate = useNavigate();

  const [success, setSuccess] = useState({
    type: 'success',
    text: 'Account Created Successfully',
    show: false
  });
  const [alert, setAlert] = useState({
    type: 'error',
    text: 'Invalid Email/Password',
    show: false
  });
  const [loginAlert, setLoginAlert] = useState({
    type: 'error',
    text: 'Invalid Email/Password',
    show: false
  });
  const [user, setUser] = useState({});
  const [registerEmail, setEmail] = useState("");
  const [registerPassword, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const openSuccessAlert = (type) => {
    setSuccess({
      type: type,
      text: 'Account Created Successfully',
      show: true
    })
  };

  const closeSuccessAlert = () => {
    setSuccess({
      type: '',
      text: '',
      show: false
    })
  };

  const openRegisterAlert = (type) => {
    setAlert({
      type: type,
      text: 'Invalid Email/Password',
      show: true
    })
  };

  const closeRegisterAlert = () => {
    setAlert({
      type: '',
      text: '',
      show: false
    })
  };

  const openLoginAlert = (type) => {
    setLoginAlert({
      type: type,
      text: 'Invalid Email/Password',
      show: true
    })
  };

  const closeLoginAlert = () => {
    setLoginAlert({
      type: '',
      text: '',
      show: false
    })
  };

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
      openSuccessAlert('success');
    } catch (error) {
      openRegisterAlert('error');
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
      openLoginAlert('error');
    }
  };

  const logoutUser = async () => {
    await signOut(auth);
  };

  return (
    <div className="HomePage">
      <Alert
        header={'Register Success'}
        btnText={'Close'}
        text={success.text}
        type={success.type}
        show={success.show}
        onClosePress={closeSuccessAlert}
        pressCloseOnOutsideClick={true}
        showBorderBottom={true}
        alertStyles={{}}
        headerStyles={{}}
        textStyles={{}}
        buttonStyles={{}}
      />
      <Alert
        header={'Register Failed'}
        btnText={'Close'}
        text={alert.text}
        type={alert.type}
        show={alert.show}
        onClosePress={closeRegisterAlert}
        pressCloseOnOutsideClick={true}
        showBorderBottom={true}
        alertStyles={{}}
        headerStyles={{}}
        textStyles={{}}
        buttonStyles={{}}
      />
      <Alert
        header={'Login Failed'}
        btnText={'Close'}
        text={loginAlert.text}
        type={loginAlert.type}
        show={loginAlert.show}
        onClosePress={closeLoginAlert}
        pressCloseOnOutsideClick={true}
        showBorderBottom={true}
        alertStyles={{}}
        headerStyles={{}}
        textStyles={{}}
        buttonStyles={{}}
      />
      <ImageContainer>
        <LoginBox>
          <GreaterFieldBox>
            <Title>
                Login
            </Title>
            <InputFieldBox>
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
              <Button onClick={loginUser}>
                Login
              </Button>
            </InputFieldBox>
          </GreaterFieldBox>
          <GreaterFieldBox>
            <Title>
              Register
            </Title>
            <InputFieldBox>
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

              <Button onClick={registerUser}>
                Create Account
              </Button>
            </InputFieldBox>
          </GreaterFieldBox>
        </LoginBox>
      </ImageContainer>
    </div>
  );
}

export default HomePage;