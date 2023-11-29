"use client";
import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import { firestore, auth } from "../../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { updateUserProfile } from "../../../firebase/firestore";
import handleUploadImage from "../../../components/radarChart/imageUpload";

export default function Profile() {
  const [userEmail, setUserEmail] = useState("");
  const [userProPic, setUserProPic] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userProPicPreview, setUserProPicPreview] = useState("");
  const [isSaved, setIsSaved] = useState(<div>Save</div>);
  // console.log(userProPic);
  // console.log(userEmail);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        // console.log(user.email, user.photoURL);
        setUserName(user.displayName);
        setUserEmail(user.email);
        setUserProPic(user.photoURL);
        setUserId(user.uid);
      }
    });
  }, []);

  const setAvatar = () => {
    return (
      <>
        <input
          type="file"
          id="input__image"
          onChange={(e) => {
            setUserProPicPreview(e.target.files[0]);
          }}
        />
        {userProPicPreview != "" && (
          <span
            className={styles.uploads}
            onClick={async (e) => {
              const userProPic = await handleUploadImage(e, userProPicPreview);
              setUserProPic(userProPic);
              setUserProPicPreview("");
            }}
          >
            Upload
          </span>
        )}
      </>
    );
  };

  const setUserInfo = async () => {
    // console.log("userId", userId);
    await updateProfile(auth.currentUser, {
      displayName: userName.toUpperCase(),
      photoURL: userProPic,
    }).catch((err) => {
      console.log(err.message);
    });

    await updateUserProfile(userId, userName.toUpperCase(), userProPic);

    // console.log("update successful");
    setIsSaved(<div className={styles.loader}></div>);
    setTimeout(() => {
      setIsSaved(<div>Saved</div>);
    }, 1500);
    window.location.href = "/profile";
  };

  const changePassword = () => {
    console.log("update email", userEmail);
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        alert("Password Reset Email Sent");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.editProfile}>
        <div className={styles.editProfile__title}></div>
        <div className={styles.editProfile__Form}>
          <form id="editProfileForm">
            <div className={styles.editProfile__profilePic}>
              {userProPic == null ? (
                "Set Profile Picture"
              ) : (
                <img src={userProPic} />
              )}
            </div>
            <div className={styles.editProfile__textInput}>
              <div className={styles.editProfile__profilePicUpload}>
                {setAvatar()}
              </div>
              <div className={styles.editProfile__name}>
                <input
                  type="text"
                  id="profileName"
                  placeholder="Set User Name"
                  value={userName != null ? userName : ""}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
              <div
                className={styles.editProfile__saveChanges}
                onClick={(e) => {
                  e.preventDefault();
                  setUserInfo();
                }}
              >
                {isSaved}
              </div>
            </div>
          </form>
          <div
            className={styles.editProfile__changePw}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              changePassword();
            }}
          >
            Change Password
          </div>
        </div>
      </div>
    </div>
  );
}
