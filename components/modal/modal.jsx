"use client";
import styles from "./modal.module.css";
import { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firestore } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { signInOrSignOut } from "../../firebase/verify";
import { RxCross2 } from "react-icons/rx";
import { VscFilter } from "react-icons/vsc";
import { FiFilter } from "react-icons/fi";
// import { LuFilterX } from "react-icons/lu";
import ReactSlider from "react-slider";
import filterOptions from "../../assets/inputOptions/Options.json";
import { gatekeepFilterSearch } from "../../firebase/firestore";
import { getRecordsData, getFilterQuery } from "../../firebase/firestore";
import Link from "next/link";

export default function Modal(action) {
  // console.log("action", action);
  // console.log("fullsetData", action.fullSetData);
  const [modal, setModal] = useState(false);
  // console.log("modal", modal);

  let toDo = action.action;
  console.log("toDo", toDo);

  const [userStatus, setUserStatus] = useState({});
  // console.log("userStatus", userStatus);

  // Search Bar Filter Functions
  // console.log(filterOptions);
  const [radio, setRadio] = useState(false);
  const [cusines, setCusines] = useState("");
  const [doneness, setDoneness] = useState([]);
  const [checked, setChecked] = useState(false);
  const [parts, setParts] = useState([]);
  const [MIN, setMIN] = useState(0);
  const [MAX, setMAX] = useState(2000);
  const [priceRange, setPriceRange] = useState([MIN, MAX]);
  // const [filterInfo, setFilter] = useState({});

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
  };

  const handleReset = () => {
    setRadio(false);
    setChecked(false);
    setCusines("");
    setDoneness("");
    setParts([]);
    setUserStatus("");
    setPriceRange([0, 2000]);
    if (cusines) {
      let orgSelected = document.querySelector(`#${cusines}`);
      if (orgSelected) {
        orgSelected.classList.remove(styles.active);
      }
    }
    let allSelectedCheckbox = document.querySelectorAll(
      "input[type = checkbox]"
    );
    allSelectedCheckbox.forEach((each) => (each.checked = false));
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
        window.location.href = `/collection?prevUser=${signInStatus["user"].uid}`;
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
    let userUpperName = userName.toUpperCase();
    // console.log("userName", userName);
    let userInfo = {
      userEmail: userCred.user.email,
      userId: userCred.user.uid,
    };

    try {
      await setDoc(doc(firestore, "users", userId), {
        userEmail: userEmail,
        userDisplayName: userUpperName,
        userPhotoURL: "",
        watchList: [],
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
    console.log("authResult", authResult);
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
            // action.additionalFilter({});
            handleReset();
            // setFilter(true);
          }}
        >
          <FiFilter />
          <div className={styles.filterIconText}>Apply Filters</div>
        </div>
      )}

      {/* Nav Bar SignIn Button */}
      {toDo == "signIn" && (
        <div
          className={styles.nav__signIn}
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
                <RxCross2 />
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
                            Cuisine
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
                          <div className={styles.modal__filterOptions}>
                            <div className={styles.modal__priceRange}>
                              {/* <div> */}
                              {priceRange[0] == 0 && priceRange[1] == 2000
                                ? "Any"
                                : priceRange[0] == 0 && priceRange[1] != 2000
                                ? `Below $ ${priceRange[1]}`
                                : priceRange[0] != 0 && priceRange[1] != 2000
                                ? `$ ${priceRange[0]} - $ ${priceRange[1]}`
                                : `Above $ ${priceRange[0]}`}
                              {/* </div> */}
                            </div>
                            <div className={styles.slider}>
                              <ReactSlider
                                // className={}
                                onChange={setPriceRange}
                                value={priceRange}
                                min={MIN}
                                max={MAX}
                                marks={[500, 1000, 1500]}
                                step={100}
                                minDistance={500}
                                markClassName={styles.mark}
                                thumbClassName={styles.thumb}
                                trackClassName={styles.track}
                                renderTrack={(props, state) => (
                                  <div {...props} />
                                )}
                                renderThumb={(props, state) => (
                                  <div {...props}></div>
                                )}
                              />
                            </div>
                          </div>
                          {/* <div
                            className={styles.modal__filterFields}
                            id="collector"
                          >
                            Collector Name
                          </div>
                          <div className={styles.modal__filterOptions}>
                            <input type="text" />
                          </div> */}
                        </div>
                        <div className={styles.modal__buttons}>
                          <Link
                            href={`/?${getFilterQuery(
                              cusines,
                              doneness,
                              parts,
                              priceRange
                            ).join("&")}`}
                          >
                            <div
                              className={styles.modal__submitButton}
                              onClick={(e) => {
                                if (
                                  doneness.length == 0 &&
                                  parts.length == 0 &&
                                  cusines == "" &&
                                  priceRange[0] == MIN &&
                                  priceRange[1] == MAX
                                ) {
                                  setUserStatus({
                                    error: true,
                                    message:
                                      "Please Filter With At Least 1 Criteria",
                                  });
                                } else {
                                  action.setFilterResName("");
                                  action.setFilterChanges(true);
                                  // REAL
                                  // action.additionalFilter(
                                  //   // gatekeep
                                  //   gatekeepFilterSearch(
                                  //     cusines,
                                  //     doneness,
                                  //     parts,
                                  //     priceRange
                                  //   )
                                  // );
                                  setModal(!modal);
                                  handleReset();
                                }
                              }}
                            >
                              Search
                            </div>
                          </Link>
                          <div
                            className={styles.modal__clearButton}
                            onClick={() => {
                              handleReset();
                              // setRadio(false);
                              // setChecked(false);
                              // setCusines("");
                              // setDoneness("");
                              // setParts([]);
                              // setUserStatus("");
                              // setPriceRange([0, 2000]);
                              // if (cusines) {
                              //   let orgSelected = document.querySelector(
                              //     `#${cusines}`
                              //   );
                              //   orgSelected.classList.remove(styles.active);
                              // }
                              // let allSelectedCheckbox =
                              //   document.querySelectorAll(
                              //     "input[type = checkbox]"
                              //   );
                              // allSelectedCheckbox.forEach(
                              //   (each) => (each.checked = false)
                              // );
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
                  <div className={styles.modal__title}>SIGN IN</div>
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
                      SIGN IN
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
