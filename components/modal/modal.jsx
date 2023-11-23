"use client";
import styles from "./modal.module.css";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firestore } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { signInOrSignOut } from "../../firebase/verify";
import { IoFilterOutline } from "react-icons/io5";
import filterOptions from "../../assets/inputOptions/Options.json";

export default function Modal(action) {
  // console.log("action", action);
  // console.log("fullsetData", action.fullSetData);
  const [modal, setModal] = useState(false);
  // console.log("modal", modal);

  let toDo = action.action;
  // console.log("toDo", toDo);

  const [userStatus, setUserStatus] = useState({});
  // console.log("userStatus", userStatus);

  // Search Bar Filter Functions
  // console.log(filterOptions);
  const [radio, setRadio] = useState(false);
  const [cusines, setCusines] = useState("");
  const [doneness, setDoneness] = useState([]);
  const [checked, setChecked] = useState(false);
  const [parts, setParts] = useState([]);
  const [status, setStatus] = useState(styles.inactive);
  console.log("c", cusines, "d", doneness, "p", parts);
  console.log("checked", checked, "r", radio);

  const handleRadio = (e) => {
    if (cusines) {
      let orgSelected = document.querySelector(`#${cusines}`);
      orgSelected.classList.remove(styles.active);
    }
    setCusines(e.target.value);
    let selectedValue = e.target.value;
    let activeRadioOption = document.querySelector(`#${selectedValue}`);
    activeRadioOption.classList.add(styles.active);
  };
  const handleCheck = (e) => {
    setChecked(!checked);
    if (filterOptions.doneness.includes(e.target.value)) {
      if (e.target.checked == true && doneness.length < 3) {
        setDoneness((doneness) => [...doneness, e.target.value]);
        setUserStatus("");
      } else if (e.target.checked == false) {
        setDoneness(doneness.filter((d) => d !== e.target.value));
      } else {
        e.target.checked = false;
        setUserStatus({ error: true, message: "Max 3 Checks" });
      }
    } else if (filterOptions.parts.includes(e.target.value)) {
      if (e.target.checked == true && parts.length < 3) {
        setParts((parts) => [...parts, e.target.value]);
        setUserStatus("");
      } else if (e.target.checked == false) {
        setParts(parts.filter((p) => p !== e.target.value));
      } else {
        e.target.checked = false;
        setUserStatus({ error: true, message: "Max 3 Checks" });
      }
    }
    // else {
    //   setCusines("");
    //   if (e.target.checked == true && cusines.length < 1) {
    //     setCusines(e.target.value);
    //     // setCusines((cusines) => [...cusines, e.target.value]);
    //   } else if (e.target.checked == false) {
    //     setCusines("");
    //     // setCusines(cusines.filter((p) => p !== e.target.value));
    //   } else {
    //     e.target.checked = false;
    //     setUserStatus({ error: true, message: "Max 1 Checks" });
    //   }
    // }
  };

  // Nav Bar SignUp Functions
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
      setUserStatus({
        error: true,
        message: "Incorrect Username or Password",
      });
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

  // Nav Bar SignUp Functions
  const fireSignUp = async (signUpUserEmail, signUpUserPw) => {
    // create User in Firebase
    let userCred;
    try {
      userCred = await createUserWithEmailAndPassword(
        auth,
        signUpUserEmail,
        signUpUserPw
      );
    } catch (err) {
      // console.log("create error", err.message);
      return {
        error: true,
        message: err.message,
      };
    }

    let userId = userCred.user.uid;
    // console.log(userCred.user);
    let userEmail = userCred.user.email;
    let userName = userEmail.split("@")[0];
    userName = userName.toUpperCase();
    // console.log("userName", userName);
    let userInfo = {
      userEmail: userCred.user.email,
      userId: userCred.user.uid,
    };

    try {
      await setDoc(doc(firestore, "users", userId), {
        userEmail: userEmail,
        userDisplayName: userName,
        userPhotoURL: "",
      }).catch((err) => {
        console.log(err.message);
      });

      return { success: true, user: userInfo };
    } catch (err) {
      console.log("save error", err.message);
      return {
        error: true,
        message: err.message,
      };
    }
  };

  async function handleSignUp(e) {
    e.preventDefault();
    const signUpUserEmail = signUpForm["signUpUserEmail"].value;
    const signUpUserPw = signUpForm["signUpUserPw"].value;

    if ((signUpUserEmail == "") | (signUpUserPw == "")) {
      setUserStatus({ error: true, message: "Please fill in all fields" });
      return;
    }

    const authResult = await fireSignUp(signUpUserEmail, signUpUserPw);
    // console.log("authResult", authResult);
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
      {/* Search Bar Filter Button */}
      {toDo == "filter" && (
        <div
          className={styles.filterIcon}
          onClick={() => {
            // console.log("open filter modal");
            setModal(true);
            // setFilter(true);
          }}
        >
          <IoFilterOutline />
        </div>
      )}

      {/* Nav Bar SignIn Button */}
      {toDo == "signIn" && (
        <div
          className={styles.nav__signUp}
          onClick={() => {
            // console.log("open sign in modal");
            setModal(true);
            setUserStatus("");
          }}
        >
          SIGN IN
        </div>
      )}

      {/* Nav Bar SignUp Button */}
      {toDo == "signUp" && (
        <div
          className={styles.nav__signUp}
          onClick={() => {
            setModal(true);
            setUserStatus("");
          }}
        >
          BECOME A COLLECTOR
        </div>
      )}

      {/* Open All Modals */}
      {modal && (
        <div className={styles.modal}>
          <div className={styles.modal__overlay}>
            <div className={styles.modal__content}>
              <div
                className={styles.modal__closeButton}
                onClick={() => {
                  setModal(!modal);
                  action = "";
                }}
              >
                X
              </div>
              {/* Search Bar Filter Modal Content */}
              {toDo == "filter" && (
                <div className={styles.modal__filterContainer}>
                  <form>
                    <div className={styles.modal__filterInner}>
                      <div className={styles.modal__filterLeft}>
                        <div
                          className={styles.modal__filterFields}
                          id="doneness"
                        >
                          Doneness (Max 3 Checks)
                        </div>
                        <div className={styles.modal__filterOptions}>
                          <div className={styles.modal__doneness}>
                            {filterOptions.doneness.map((done) => (
                              <label>
                                <input
                                  type="checkbox"
                                  id={done}
                                  key={done}
                                  value={done}
                                  onChange={(e) => {
                                    handleCheck(e);
                                  }}
                                />
                                {done}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className={styles.modal__filterFields} id="part">
                          Part of Beef (Max 3 Checks)
                        </div>
                        <div className={styles.modal__filterOptions}>
                          <div className={styles.modal__part}>
                            {filterOptions.parts.map((part) => (
                              <label>
                                <input
                                  type="checkbox"
                                  id={part}
                                  key={part}
                                  value={part}
                                  onChange={(e) => {
                                    handleCheck(e);
                                  }}
                                />
                                {part}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className={styles.modal__filterRight}>
                        <div className={styles.modal__RightFilters}>
                          <div
                            className={styles.modal__filterFields}
                            id="cusine"
                          >
                            Cusine
                          </div>
                          <div className={styles.modal__filterOptions}>
                            <div className={styles.modal__cusine}>
                              {filterOptions.cusine.map((cus) => (
                                <label id={cus} className="cus">
                                  <input
                                    type="radio"
                                    id={cus}
                                    key={cus}
                                    value={cus}
                                    name="cusine"
                                    onChange={(e) => handleRadio(e)}
                                  />
                                  {cus}
                                </label>
                              ))}
                            </div>
                          </div>
                          <div
                            className={styles.modal__filterFields}
                            id="price"
                          >
                            Price
                          </div>
                          <div className={styles.modal__filterOptions}></div>
                          <div
                            className={styles.modal__filterFields}
                            id="collector"
                          >
                            Collector Name
                          </div>
                          <div className={styles.modal__filterOptions}>
                            <input type="text" />
                          </div>
                        </div>
                        <div className={styles.modal__buttons}>
                          <div
                            className={styles.modal__submitButton}
                            onClick={(e) => {
                              console.log(e);
                            }}
                          >
                            Search
                          </div>
                          <div
                            className={styles.modal__clearButton}
                            onClick={(e) => {
                              setRadio(false);
                              setChecked(false);
                              setCusines("");
                              setDoneness("");
                              setParts([]);
                              if (cusines) {
                                let orgSelected = document.querySelector(
                                  `#${cusines}`
                                );
                                orgSelected.classList.remove(styles.active);
                              }
                              let allSelectedCheckbox =
                                document.querySelectorAll(
                                  "input[type = checkbox]"
                                );
                              allSelectedCheckbox.forEach(
                                (each) => (each.checked = false)
                              );
                            }}
                          >
                            Clear All Search
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Nav Bar SignIn Modal Content */}
              {action.output == null && toDo == "signIn" && (
                <div className={styles.signInSignUp}>
                  <div className={styles.modal__title}>Sign In</div>
                  <form className={styles.modal__form} id="signInForm">
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
                      className={styles.modal__submitButton}
                      onClick={(e) => {
                        handleSignIn(e);
                      }}
                    >
                      Sign In
                    </div>
                  </form>
                </div>
              )}

              {/* Nav Bar SignUp Modal Content */}
              {toDo == "signUp" && (
                <div className={styles.signInSignUp}>
                  <div className={styles.modal__title}>BECOME A COLLECTOR</div>
                  <form className={styles.modal__form} id="signUpForm">
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
                      className={styles.modal__submitButton}
                      onClick={(e) => {
                        handleSignUp(e);
                      }}
                    >
                      BECOME A COLLECTOR
                    </div>
                  </form>
                </div>
              )}
              {Object.keys(userStatus).includes("error") && (
                <div className={styles.negative}>{userStatus["message"]}</div>
              )}
              {Object.keys(userStatus).includes("success") && (
                <div className={styles.positive}>{userStatus["message"]}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
