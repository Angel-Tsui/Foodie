// "use client";
import { imgStore } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default async function handleUploadImage(e, img) {
  e.preventDefault();
  const imgRef = ref(imgStore, `files/${v4()}`);
  const value = await uploadBytes(imgRef, img);
  // console.log("value", value);
  const url = await getDownloadURL(value.ref);
  return url;
}
