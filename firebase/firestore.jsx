import { firestore, colRef } from "./firebase";
import {
  doc,
  setDoc,
  getDocs,
  addDoc,
  getDoc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

// Records
const setRecord = async (
  recordId,
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
  description,
  userId
) => {
  // console.log(userId);
  console.log(imageUrl);
  let timestamp = Date.now();
  await setDoc(doc(firestore, "records", recordId), {
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
    description: description,
    timestamp: timestamp,
    userId: userId,
  }).catch((err) => {
    console.log(err.message);
  });
};

const getSingleRecordData = async (recordId) => {
  // console.log("recordId", recordId);
  // let id = recordId.recordId;
  // console.log(id);
  let id = recordId;
  const singleData = await getDoc(doc(firestore, "records", id)).catch(
    (err) => {
      console.log(err.message);
    }
  );
  return singleData.data();
};

const getRecordsData = async (filterInfo) => {
  // console.log("props", filterInfo);
  let filters = filterInfo.filterInfo;
  // console.log("orderMethod", filters.orderMethod);
  // console.log("AscOrDesc", filters.AscOrDesc);
  let orderedData;

  const getOrder = () => {
    if (filters.orderMethod && filters.AscOrDesc) {
      // orderedData = query(
      //   colRef,
      //   orderBy(filters.orderMethod, filters.AscOrDesc)
      // );
      return orderBy(filters.orderMethod, filters.AscOrDesc);
    } else {
      return null;
    }
  };

  const getfilters = () => {
    if (filters.userId) {
      // console.log("searching for ", filters.userId);
      // orderedData = query(colRef, where("userId", "==", filters.userId));
      return where("userId", "==", filters.userId);
    } else {
      return null;
    }
  };

  orderedData = query(colRef, getfilters(), getOrder());

  let recordsCollection = await getDocs(orderedData);
  try {
    let recordsData = [];
    recordsCollection.docs.forEach((doc) => {
      recordsData.push({ id: doc.id, ...doc.data() });
    });
    // console.log("recordsData", recordsData);
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
    description: description,
  });
};

const deleteDataById = async (e, SingleRecordid) => {
  e.preventDefault();
  const docRef = doc(firestore, "records", SingleRecordid);
  deleteDoc(docRef).then(() => {
    window.location.href = "/collection";
  });
};

export {
  getRecordsData,
  setRecord,
  getSingleRecordData,
  addRecordsData,
  deleteDataById,
};
