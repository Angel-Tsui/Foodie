"use client";
import styles from "./canvas.module.css";
import canvasStyles from "./canvasFunction.module.css";
import { PiTextTBold } from "react-icons/pi";
import { PiUploadSimpleBold } from "react-icons/pi";
import { useState, useEffect } from "react";
import { imgStore } from "../../../firebase/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Image from "next/image";

function UploadedImageGallery() {
  const [img, setImage] = useState("");
  console.log("5, img", img);
  const [imgUrl, setImgUrl] = useState([]);
  console.log("6,imgUrl", imgUrl);

  const handleUploadImage = () => {
    console.log("upload img", img);
    if (img !== null) {
      const imgRef = ref(imgStore, `files/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    }
  };

  useEffect(() => {
    listAll(ref(imgStore, "files")).then((imgs) => {
      console.log("imgs in useEffect", imgs);
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    });
  }, []);

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <button onClick={handleUploadImage}>Upload</button>
      <div className={canvasStyles.imageDisplay}>
        {/* {console.log(imgUrl)} */}
        {imgUrl.map((eachImgUrl, index) => (
          <div className={canvasStyles.eachImageContainer}>
            <img
              className={canvasStyles.eachImage}
              src={eachImgUrl}
              key={eachImgUrl + index}
              id={eachImgUrl + index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FunctionalPanel() {
  console.log("calling function");
  const [action, setAction] = useState("");
  console.log("2, setAction State", action);
  // const [img, setImage] = useState("");
  // const [imgUrl, setImgUrl] = useState([]);

  // const handleUploadImage = () => {
  //   if (img !== null) {
  //     const imgRef = ref(imgStore, `files/${v4()}`);
  //     uploadBytes(imgRef, img).then((value) => {
  //       console.log(value);
  //       getDownloadURL(value.ref).then((url) => {
  //         setImgUrl((data) => [...data, url]);
  //       });
  //     });
  //   }
  // };

  // useEffect(() => {
  //   listAll(ref(imgStore, "files")).then((imgs) => {
  //     console.log(imgs);
  //     imgs.items.forEach((img) => {
  //       getDownloadURL(img).then((url) => {
  //         setImgUrl((data) => [...data, url]);
  //       });
  //     });
  //   });
  // }, []);

  return (
    <div className={styles.canvasContainer__functionPanel}>
      <div className={styles.functionPanel__functionOverview}>
        <div
          className={styles.functionOverview__eachFunction}
          onClick={() => {
            setAction("TEXT EDITING");
          }}
        >
          <PiTextTBold className={styles.functionOverview__eachIcon} />
          <div className={styles.functionOverview__eachText}>Text</div>
        </div>
        <div
          className={styles.functionOverview__eachFunction}
          onClick={() => {
            console.log("1, setAction to Upload");
            setAction("UPLOAD IMAGES HERE");
          }}
        >
          <PiUploadSimpleBold className={styles.functionOverview__eachIcon} />
          <div className={styles.functionOverview__eachText}>Uploads</div>
        </div>
      </div>
      <div className={styles.functionPanel__functionUse}>
        {action == "TEXT EDITING" && (
          <>
            <div className={canvasStyles.functionTitle}>{action}</div>
          </>
        )}
        {action == "UPLOAD IMAGES HERE" && (
          <div className={canvasStyles.imageFunctionContainer}>
            {console.log("three got action", action)}
            <div className={canvasStyles.functionTitle}>{action}</div>
            {console.log("getaction", action)}
            <UploadedImageGallery />
            {console.log("4, trigger once")}
            {/* <div>
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <button onClick={handleUploadImage}>Upload</button>
              <div className={canvasStyles.imageDisplay}>
                {console.log(imgUrl)}
                {imgUrl.map((eachImgUrl, index) => (
                  <div className={canvasStyles.eachImageContainer}>
                    <img
                      className={canvasStyles.eachImage}
                      src={eachImgUrl}
                      key={eachImgUrl + index}
                      id={eachImgUrl + index}
                    />
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
