import { verify, getUserInfoFromToken } from "../../../firebase/verify";
import { auth } from "../../../firebase/firebase";
import { firestore } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const getUserFromDb = (userId) => {
  // console.log("recordId", recordId);
  // let id = recordId.recordId;
  // console.log(id);
  // let id = recordId;
  // console.log(userId.userId);
  let id = userId.userId;
  console.log(id);
  const singleData = getDoc(doc(firestore, "records", id));
  console.log(singleData.data());
  return singleData.data();
};

export default function getName(userId) {
  // let userName = getNameFromAuth();
  console.log(userId);
  let id = userId.userId.userId;
  console.log(id);
  const singleData = getDoc(doc(firestore, "records", id));
  console.log(singleData.data());

  return <span>{userName()}</span>;
  // let userInfo = getUserInfoFromToken();
  // if (userInfo) {
  //   let userEmail = userInfo["userEmail"];
  //   let name = userEmail.split("@")[0];
  //   let userName = name.toUpperCase();
  //   // console.log(userEmail, name);
  //   return <span>{userName}</span>;
  // }
}
