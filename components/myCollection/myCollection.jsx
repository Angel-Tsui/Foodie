"use client";
import styles from "./myCollection.module.css";
import Image from "next/image";
import { getUserInfoFromToken } from "../../firebase/verify";
import { firestore } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";

export default function MyCollection() {
  const [userProPic, setUserProPic] = useState("/profile.jpg");

  let userInfo = getUserInfoFromToken();
  if (userInfo != null) {
    // console.log(userInfo);
    let userId = userInfo.userId;
    // console.log(userId);
    getDoc(doc(firestore, "users", userId))
      .then((singleData) => {
        setUserProPic(singleData.data().userPhotoURL);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  // console.log(userProPic);
  return (
    <div className={styles.myCollectionContainer}>
      <div className={styles.myIconContainer}>
        <div className={styles.myIcon}>
          {userProPic != null ? (
            <img src={userProPic} />
          ) : (
            <img src="/profile.jpg" />
          )}
          {/* <Image src={userProPic} width={50} height={50} alt="icon" /> */}
        </div>
      </div>
      <div className={styles.myCollection}>MY COLLECTION</div>
    </div>
  );
}
