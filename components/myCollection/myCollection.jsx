"use client";
import styles from "./myCollection.module.css";
import Image from "next/image";
import { getUserInfoFromToken } from "../../firebase/verify";
import { firestore } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getUserProPic } from "../../firebase/firestore";
import { useState } from "react";

export default function MyCollection(props) {
  const [userProPic, setUserProPic] = useState("/profile.jpg");
  const [userDisplayName, setUserDisplayName] = useState("");

  // console.log("myCollection userProPic", userProPic);
  // console.log("myCollection", props.userId);

  // let userProPic =
  getUserProPic(props.userId, setUserProPic);
  // console.log(userProPic);

  // let userInfo = getUserInfoFromToken();
  if (props.userId != null) {
    // console.log(userInfo);
    // let userId = props.userId;
    // console.log(userId);
    getDoc(doc(firestore, "users", props.userId))
      .then((singleData) => {
        setUserProPic(singleData.data().userPhotoURL);
        setUserDisplayName(singleData.data().userDisplayName);
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
          {userProPic != "" ? (
            <img src={userProPic} />
          ) : (
            <img src="/profile.jpg" />
          )}
        </div>
      </div>
      <div className={styles.myCollection}>{userDisplayName}</div>
    </div>
  );
}
