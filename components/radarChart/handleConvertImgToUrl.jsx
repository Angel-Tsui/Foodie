"use client";
import { useState } from "react";
import { imgStore } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function handleConvertImgToUrl(convertImage) {
  const [img, setImage] = useState(convertImage);
  const [imgUrl, setImgUrl] = useState([]);

  const handleUploadImage = () => {
    if (img !== null) {
      const imgRef = ref(imgStore, `files/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        getDownloadURL(value.ref).then((url) => {
          setImgUrl(url);
        });
      });
    }
  };

  return { imgUrl };
}
