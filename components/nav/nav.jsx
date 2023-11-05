"use client";
import styles from "./nav.module.css";
import Link from "next/link";
import MyCollection from "../../components/myCollection/myCollection";
import { signIn, signUp, signOut } from "../../firebase/fireAuth";

function toCollection() {
  // console.log("to Collection")
  window.location.href = "/collection";
}

export default function Nav() {
  return (
    <div className={styles.nav}>
      <div className={styles.nav__companyName}>
        <Link href="/">Food Recordy</Link>
      </div>
      <div className={styles.nav__user}>
        {/* <div className={styles.nav__signIn} onClick={toCollection}>MY COLLECTION</div> */}
        <div className={styles.nav__signUp} onClick={signUp}>
          BECOME A COLLECTOR
        </div>
        <div onClick={toCollection}>
          <MyCollection />
        </div>
      </div>
    </div>
  );
}
