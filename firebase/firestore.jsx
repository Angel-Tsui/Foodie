import { firestore, colRef } from "./firebase";
import { getDocs, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
// import {firestore} from './firebase'
// import {getUserInfoFromToken} from '../components/verify'

// function getId() {
//   let userInfo = getUserInfoFromToken();
//   let signedInId = userInfo["userId"];
//   return signedInId;
// }
// const getId = (id) => {
//   return id;
// };
// const docRef = doc(firestore, "records", );

// const getSingleRecordData = async () => {

//   const doc = await getDoc(docRef);
//   console.log("data", doc.data(), doc.id);
// };

const getRecordsData = async () => {
  let recordsCollection = await getDocs(colRef);
  try {
    let recordsData = [];
    recordsCollection.docs.forEach((doc) => {
      recordsData.push({ id: doc.id, ...doc.data() });
    });
    console.log(recordsData);
    return recordsData;
  } catch (e) {
    console.log(e.message);
  }
};

const addRecordsData = async (
  imageUrl,
  name,
  resto,
  currency,
  price,
  parts,
  cusine,
  cooked,
  starRating,
  allRatings,
  //   fat,
  //   tender,
  //   juicy,
  //   chewy,
  //   thick,
  //   rich,
  description
) => {
  addDoc(colRef, {
    imageUrl: imageUrl,
    name: name,
    resto: resto,
    currency: currency,
    price: price,
    parts: parts,
    cusine: cusine,
    cooked: cooked,
    starRating: starRating,
    allRatings: allRatings,
    // fat: fat,
    // tender: tender,
    // juicy: juicy,
    // chewy: chewy,
    // thick: thick,
    // rich: rich,
    description: description,
  });
};

const updateRecordsData = () => {};
//   getDocs(colRef).then((snapshot) => {
//     console.log(snapshot.docs);
//   });
//   const userid = await getId();
//   const data = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   return data;

// const getData = async () => {
//     const userid = await getId()
//     const snapshot = await firestore.collection("data").where("userid", "==", userid).orderBy("timestamp").get()
//     const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//     }));
//     return data
// }

// const createData = async (debCred, price, desc, timestamp) => {
//     const userid = await getId()
//     const ref = await firestore.collection("data").add({debCred, price, desc, timestamp, userid});

//     const newData = {
//         id : ref.id,
//         ...{debCred, price, desc},
//     };

//     return newData;
// }

// const deleteDataById = async (id) => {
//     const deleteData = await firestore.collection("data").doc(id).delete()
//     return deleteData
// }

export { getRecordsData, addRecordsData, updateRecordsData };
