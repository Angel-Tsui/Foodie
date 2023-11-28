"use client";
import styles from "./nav.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import MyCollection from "../../components/myCollection/myCollection";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImExit } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { userToken } from "../../firebase/verify";
import Modal from "../modal/modal";
import { v4 } from "uuid";
import { getUserInfoFromToken } from "../../firebase/verify";

function signOut() {
  window.localStorage.removeItem("token");
  window.location.href = "/";
}

function editProfile() {
  // console.log("edit profile");
  window.location.href = "/profile";
}

export default function Nav() {
  const userInfo = getUserInfoFromToken();
  let userId;
  if (userInfo) {
    userId = userInfo.userId;
  }

  // console.log("nav", userId);

  // getUserInfoFromToken()
  //   .then((userInfo) => {
  //     console.log(userInfo);
  //   })
  //   .then((userId) => {
  //     console.log(userId);
  //   });

  return (
    <div className={styles.nav}>
      <div className={styles.nav__companyName}>
        <Link href="/">UNIVERSAL MEAT EXPO</Link>
      </div>
      <div className={styles.nav__user}>
        {userToken == null && (
          <>
            <Modal action="signUp" />
            <Modal action="signIn" />
          </>
        )}
        {userToken != null && (
          <>
            <div
              onClick={() => {
                window.location.href = "/collection";
              }}
            >
              <div className={styles.userAction}>
                <div
                  className={styles.collectionGallery__create}
                  onClick={() => {
                    let recordId = v4();
                    window.open("/record/" + recordId);
                  }}
                >
                  Create Collection +
                </div>
                <MyCollection userId={userId} />
              </div>
            </div>
            <div className={styles.menu}>
              <div className={styles.menu__btn}>
                <RxHamburgerMenu />
              </div>
              <div className={styles.menu__dropDown}>
                <div
                  className={styles.menu__profile}
                  onClick={() => {
                    editProfile();
                  }}
                >
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
