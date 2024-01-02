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
  const url = await getDownloadURL(value.ref);
  return url;
}

async function uploadOutputImage(cleanOutputImageUrl) {
  const imgStoreOutput = ref(imgStore, `outputs/${v4()}`);
  const message = cleanOutputImageUrl;
  const snapshot = await uploadString(
    imgStoreOutput,
    message,
    "data_url"
  ).catch((err) => {
    console.log(err.message);
  });
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

export { uploadOutputImage };
