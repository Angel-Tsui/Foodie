"use client";
import { useState, useEffect } from "react";
import { imgStore } from "../../firebase/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function UploadedImageGallery() {
  const [img, setImage] = useState("");
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

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <button onClick={handleUploadImage}>Upload</button>
    </div>
  );
}
