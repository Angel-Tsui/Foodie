"use client";
import styles from "./nav.module.css";
import Link from "next/link";
import MyCollection from "../../components/myCollection/myCollection";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImExit } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import modalStyles from "../modal/modal.module.css";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signInOrSignOut, userToken } from "../../firebase/verify";

function SignIn() {
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal(!modal);
  }
  const [userStatus, setUserStatus] = useState({});

  async function fireSignIn(signInUserEmail, signInUserPw) {
    // Signin User in Firebase
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        signInUserEmail,
        signInUserPw
      );
      return {
        success: true,
        user: user.user,
      };
    } catch (err) {
      return {
        error: true,
        message: err.message,
      };
    }
  }

  async function handleSignIn(e) {
    e.preventDefault();
    const signInUserEmail = signInForm["signInUserEmail"].value;
    const signInUserPw = signInForm["signInUserPw"].value;
    if ((signInUserEmail == "") | (signInUserPw == "")) {
      setUserStatus({ error: true, message: "Please fill in all fields" });
      return;
    }

    const signInStatus = await fireSignIn(signInUserEmail, signInUserPw);
    if (Object.keys(signInStatus).includes("error")) {
      setUserStatus({ error: true, message: "Incorrect Username or Password" });
    } else {
      let userToken = {
        userId: signInStatus["user"].uid,
        userEmail: signInStatus["user"].email,
      };
      setUserStatus({ success: true, user: userToken });
      window.localStorage.setItem("token", JSON.stringify(userToken));
      let confirmUser = signInOrSignOut();
      if (confirmUser) {
        window.location.href = "/collection";
      }
    }
  }

  return (
    <>
      <div
        className={styles.nav__signUp}
        onClick={() => {
          toggleModal();
          setUserStatus("");
        }}
      >
        SIGN IN
      </div>

      {modal && (
        <div className={modalStyles.modal}>
          <div className={modalStyles.modal__overlay}>
            <div className={modalStyles.modal__content}>
              <div className={modalStyles.modal__title}>Sign In</div>
              <div
                className={modalStyles.modal__closeButton}
                onClick={toggleModal}
              >
                X
              </div>
              <form className={modalStyles.modal__form} id="signInForm">
                <input
                  type="text"
                  placeholder="Email Address"
                  id="signInUserEmail"
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="signInUserPw"
                />
                <div
                  className={modalStyles.modal__submitButton}
                  onClick={(e) => {
                    handleSignIn(e);
                  }}
                >
                  Sign In
                </div>
              </form>
              {Object.keys(userStatus).includes("error") && (
                <div className={modalStyles.negative}>
                  {userStatus["message"]}
                </div>
              )}
              {Object.keys(userStatus).includes("success") && (
                <div className={modalStyles.positive}>
                  {userStatus["message"]}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SignUp() {
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal(!modal);
  }
  const [userStatus, setUserStatus] = useState({});

  async function fireSignUp(signUpUserEmail, signUpUserPw) {
    // create User in Firebase
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        signUpUserEmail,
        signUpUserPw
      );
      return {
        success: true,
        user: userCred,
      };
    } catch (err) {
      return {
        error: true,
        message: err.message,
      };
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    const signUpUserEmail = signUpForm["signUpUserEmail"].value;
    const signUpUserPw = signUpForm["signUpUserPw"].value;

    if ((signUpUserEmail == "") | (signUpUserPw == "")) {
      setUserStatus({ error: true, message: "Please fill in all fields" });
      return;
    }

    const authResult = await fireSignUp(signUpUserEmail, signUpUserPw);
    if (Object.keys(authResult).includes("success")) {
      setUserStatus({
        success: true,
        message: "Registration Successful, please sign in",
        user: authResult["user"],
      });
    } else if (
      authResult["message"].includes("Password should be at least 6 characters")
    ) {
      setUserStatus({
        error: true,
        message: "Minimum 6 characters for password",
      });
    } else if (authResult["message"].includes("invalid-email")) {
      setUserStatus({ error: true, message: "Error in email format" });
    } else if (authResult["message"].includes("email-already-in-use")) {
      setUserStatus({ error: true, message: "This email has been registered" });
    } else {
      setUserStatus({
        error: true,
        message: "There is an error, please retry",
      });
    }
  }

  return (
    <>
      <div
        className={styles.nav__signUp}
        onClick={() => {
          toggleModal();
          setUserStatus("");
        }}
      >
        BECOME A COLLECTOR
      </div>

      {modal && (
        <div className={modalStyles.modal}>
          <div className={modalStyles.modal__overlay}>
            <div className={modalStyles.modal__content}>
              <div className={modalStyles.modal__title}>BECOME A COLLECTOR</div>
              <div
                className={modalStyles.modal__closeButton}
                onClick={toggleModal}
              >
                X
              </div>
              <form className={modalStyles.modal__form} id="signUpForm">
                <input
                  type="text"
                  placeholder="Email Address"
                  id="signUpUserEmail"
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="signUpUserPw"
                />
                <div
                  className={modalStyles.modal__submitButton}
                  onClick={(e) => {
                    handleSignUp(e);
                  }}
                >
                  BECOME A COLLECTOR
                </div>
              </form>
              {Object.keys(userStatus).includes("error") && (
                <div className={modalStyles.negative}>
                  {userStatus["message"]}
                </div>
              )}
              {Object.keys(userStatus).includes("success") && (
                <div className={modalStyles.positive}>
                  {userStatus["message"]}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function signOut() {
  window.localStorage.removeItem("token");
  window.location.href = "/";
}

export default function Nav() {
  return (
    <div className={styles.nav}>
      <div className={styles.nav__companyName}>
        <Link href="/">UNIVERSAL MEAT EXPO</Link>
      </div>
      <div className={styles.nav__user}>
        {userToken == null && (
          <>
            <SignUp />
            <SignIn />
          </>
        )}
        {userToken != null && (
          <>
            <div
              onClick={() => {
                window.location.href = "/collection";
              }}
            >
              <MyCollection />
            </div>
            <div className={styles.menu}>
              <div className={styles.menu__btn}>
                <RxHamburgerMenu />
              </div>
              <div className={styles.menu__dropDown}>
                <div className={styles.menu__profile}>
                  <CgProfile />
                  Profile
                </div>
                <div className={styles.menu__exit} onClick={signOut}>
                  <ImExit />
                  Sign Out
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
