// "use client";
import { imgStore } from "../../firebase/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { v4 } from "uuid";

export default async function handleUploadImage(e, img) {
  e.preventDefault();
  const imgRef = ref(imgStore, `files/${v4()}`);
  const value = await uploadBytes(imgRef, img);
  console.log("value", value);
  const url = await getDownloadURL(value.ref);
  console.log(url);
  return url;
}

async function uploadOutputImage(cleanOutputImageUrl) {
  const imgStoreOutput = ref(imgStore, `outputs/${v4()}`);
  console.log("saving image to firebase", cleanOutputImageUrl);
  const message = "outputImage";
  const snapshot = await uploadString(imgStoreOutput, message, "base64url");
  console.log("got image", snapshot);
  const url = await getDownloadURL(snapshot.ref);
  console.log(url);
  return url;
}

export { uploadOutputImage };
