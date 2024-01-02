"use client";
import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import { auth } from "../../../firebase/firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { updateUserProfile } from "../../../firebase/firestore";
import handleUploadImage from "../../../components/radarChart/imageUpload";
import { getUserInfoFromToken } from "../../../firebase/verify";

export default function Profile() {
  const [userEmail, setUserEmail] = useState("");
  const [userProPic, setUserProPic] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userProPicPreview, setUserProPicPreview] = useState("");
  const [isSaved, setIsSaved] = useState(<div>Save</div>);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setUserName(user.displayName);
        setUserEmail(user.email);
        setUserProPic(user.photoURL);
        setUserId(user.uid);
      }
    });

    let user = getUserInfoFromToken();
    setUserEmail(user.userEmail);
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
    let confirmedUserName;
    if (userName == null || userName == "") {
      confirmedUserName = userEmail.split("@")[0];
    } else {
      confirmedUserName = userName;
    }

    await updateProfile(auth.currentUser, {
      displayName: confirmedUserName.toUpperCase(),
      photoURL: userProPic,
    }).catch((err) => {
      console.log(err.message);
    });

    await updateUserProfile(
      userId,
      confirmedUserName.toUpperCase(),
      userProPic
    );

    setIsSaved(<div className={styles.loader}></div>);
    setTimeout(() => {
      setIsSaved(<div>Saved</div>);
    }, 1500);
    window.location.href = "/profile";
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
        </div>
      </div>
    </div>
  );
}
