"use client";
import styles from "./myCollection.module.css";
import { firestore } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getUserProPic } from "../../firebase/firestore";
import { useState } from "react";

export default function MyCollection(props) {
  const [userProPic, setUserProPic] = useState("/profile.jpg");
  const [userDisplayName, setUserDisplayName] = useState("");

  getUserProPic(props.userId, setUserProPic);

  if (props.userId != null) {
    getDoc(doc(firestore, "users", props.userId))
      .then((singleData) => {
        setUserProPic(singleData.data().userPhotoURL);
        setUserDisplayName(singleData.data().userDisplayName);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

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
