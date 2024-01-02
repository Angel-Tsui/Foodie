"use client";
import styles from "./nav.module.css";
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
  window.location.href = "/profile";
}

export default function Nav() {
  const userInfo = getUserInfoFromToken();
  let userId;
  if (userInfo) {
    userId = userInfo.userId;
  }

  return (
    <div className={styles.nav}>
      <Link href="/">
        <div className={styles.nav__companyName}>
          <img src="/cow.png" />
          <div>
            UNIVERSAL <br />
            MEAT EXPO
          </div>
        </div>
      </Link>

      <div className={styles.nav__user}>
        {userToken == null && (
          <>
            <Modal action="signUp" />
            <Modal action="signIn" />
          </>
        )}
        {userToken != null && (
          <>
            <div>
              <div className={styles.userAction}>
                <div
                  className={styles.collectionGallery__create}
                  onClick={() => {
                    let recordId = v4();
                    window.open("/record/" + recordId);
                  }}
                >
                  Create <span>Collection</span> +
                </div>

                <Link href={`/collection?prevUser=${userId}`}>
                  <MyCollection userId={userId} />
                </Link>
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
