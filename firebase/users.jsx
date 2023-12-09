// import { firestore, userColRef } from "./firebase";
// import {
//   doc,
//   setDoc,
//   getDocs,
//   addDoc,
//   getDoc,
//   deleteDoc,
//   onSnapshot,
//   updateDoc,
//   query,
//   where,
//   orderBy,
// } from "firebase/firestore";

// const setRecord = async (
//   recordId,
//   imageUrl,
//   name,
//   resto,
//   currency,
//   price,
//   parts,
//   cusine,
//   cooked,
//   starRating,
//   allRatings,
//   description,
//   userId
// ) => {
//   // console.log(userId);
//   let timestamp = Date.now();
//   await setDoc(doc(firestore, "users", recordId), {
//     imageUrl: imageUrl,
//     name: name,
//     resto: resto,
//     currency: currency,
//     price: price,
//     parts: parts,
//     cusine: cusine,
//     cooked: cooked,
//     starRating: starRating,
//     allRatings: allRatings,
//     description: description,
//     timestamp: timestamp,
//     userId: userId,
//   });
// };
