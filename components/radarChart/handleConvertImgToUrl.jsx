"use client";
import { useState, useEffect } from "react";
import { imgStore } from "../../firebase/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function handleConvertImgToUrl(convertImage) {
  const [img, setImage] = useState(convertImage);
  const [imgUrl, setImgUrl] = useState([]);

  const handleUploadImage = () => {
    console.log("upload img", img);
    if (img !== null) {
      const imgRef = ref(imgStore, `files/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setImgUrl(url);
          // setImgUrl((data) => [...data, url]);
        });
      });
    }
  };

  // useEffect(() => {
  //   listAll(ref(imgStore, "files")).then((imgs) => {
  //     console.log("imgs in useEffect", imgs);
  //     imgs.items.forEach((val) => {
  //       getDownloadURL(val).then((url) => {
  //         setImgUrl((data) => [...data, url]);
  //       });
  //     });
  //   });
  // }, []);

  return { imgUrl };
}
