import { firestore, colRef } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { getUserInfoFromToken } from "./verify";

// My Collection
const getUserProPic = (userId, set) => {
  // console.log("firestore", userId, set);
  // let userInfo = getUserInfoFromToken();
  // if (userInfo != null) {
  //   console.log("firestore", userInfo);
  //   let userId = userInfo.userId;
  //   // console.log(userId);
  // }
  if (userId != null) {
    getDoc(doc(firestore, "users", userId))
      .then((singleData) => {
        // console.log(singleData.data().userPhotoURL);
        set(singleData.data().userPhotoURL);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
};

// Output (save to firestore)
const outputFile = async (recordId, ouputUrl, userId) => {
  // console.log(userId);
  // console.log("outputFile", ouputUrl);
  await setDoc(doc(firestore, "outputs", recordId), {
    ouputUrl: ouputUrl,
    userId: userId,
  }).catch((err) => {
    console.log(err.message);
  });
};

// Output (get image from firestore)
const getSingleOutputData = async (outputId) => {
  // console.log("id", outputId);
  const singleData = await getDoc(doc(firestore, "outputs", outputId)).catch(
    (err) => {
      console.log(err.message);
    }
  );
  // console.log(singleData.data());
  return singleData.data();
};

const getOnlyOutputImage = async (outputId) => {
  // console.log("in getOnlyOutputImage", outputId);
  let outputInfo = await getSingleOutputData(outputId).catch((err) => {
    // console.log("error", err.message);
  });
  // console.log(outputInfo);
  let outputImageUrl = await outputInfo.ouputUrl;
  // console.log("img", outputImageUrl);
  return outputImageUrl;
};

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
  let number = parseInt(price);
  let timestamp = Date.now();
  await setDoc(doc(firestore, "records", recordId), {
    imageUrl: imageUrl,
    name: name,
    resto: resto,
    currency: currency,
    price: number,
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

const gatekeepFilterSearch = (cusines, doneness, parts, priceRange) => {
  // console.log("in handleFilterSearch");
  // console.log("c", cusines, "d", doneness, "p", parts, "pr", priceRange);
  let filterInfo = {};
  if (cusines != "") {
    filterInfo.cusines = cusines;
  }
  if (doneness.length != 0) {
    filterInfo.doneness = doneness;
  }
  if (parts.length != 0) {
    filterInfo.parts = parts;
  }
  if (priceRange[0] != 0 || priceRange[1] != 2000) {
    filterInfo.lower = priceRange[0];
    filterInfo.upper = priceRange[1];
  }
  // console.log("filterInfo", filterInfo);
  // console.log(window.location.href);
  return filterInfo;
  // getRecordsData(filterInfo);
};

const getRecordsData = async (filterInfo) => {
  // console.log("getRecordsData props", filterInfo);
  // let filters = filterInfo.filterInfo;
  // console.log("orderMethod", filters.orderMethod);
  // console.log("AscOrDesc", filters.AscOrDesc);
  let orderedData;

  const getOrder = () => {
    if (filterInfo.orderMethod && filterInfo.AscOrDesc) {
      if (
        filterInfo.additionalFilter.lower ||
        filterInfo.additionalFilter.upper
      ) {
        return orderBy("price", "desc");
      }
      if (filterInfo.additionalFilter.restaurant != undefined) {
        return orderBy("resto", "asc");
      }
      return orderBy(filterInfo.orderMethod, filterInfo.AscOrDesc);
    } else {
      return null;
    }
  };

  const getfilters = () => {
    // console.log("getfilters", filterInfo.additionalFilter);
    if (filterInfo.additionalFilter.restaurant != undefined) {
      return where("resto", ">=", filterInfo.additionalFilter.restaurant);
    }
    if (filterInfo.additionalFilter.restaurant != undefined) {
      return where("resto", "<=", filterInfo.additionalFilter.restaurant);
    }
    if (filterInfo.additionalFilter.cusines != undefined) {
      // console.log("c", filterInfo.additionalFilter.cusines);
      return where("cusine", "==", filterInfo.additionalFilter.cusines);
    }
    if (filterInfo.additionalFilter.doneness != undefined) {
      // console.log("ddd", filterInfo.additionalFilter.doneness);
      return where("cooked", "in", filterInfo.additionalFilter.doneness);
      // filterInfo.doneness.forEach((done) => {
      //   return where("doneness", "==", done);
      // });
    }
    if (filterInfo.additionalFilter.parts != undefined) {
      // console.log("p", filterInfo.additionalFilter.parts);
      return where("parts", "in", filterInfo.additionalFilter.parts);
      // filterInfo.parts.forEach((part) => {
      //   return where("parts", "==", part);
      // });
    }
    if (filterInfo.additionalFilter.lower != undefined) {
      // console.log("fill lower", filterInfo.additionalFilter.lower);
      return where("price", ">=", filterInfo.additionalFilter.lower);
    }
    if (filterInfo.additionalFilter.upper != undefined) {
      // console.log("fill upper", filterInfo.additionalFilter.upper);
      return where("price", "<=", filterInfo.additionalFilter.upper);
    }
    if (filterInfo.userId != undefined) {
      // console.log("user", filterInfo.userId);
      // console.log("searching for ", filterInfo.userId);
      // orderedData = query(colRef, where("userId", "==", filterInfo.userId));
      return where("userId", "==", filterInfo.userId);
    } else {
      return null;
    }
  };

  // console.log("all filters", getfilters());
  // console.log("order", getOrder());
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

const deleteDataById = async (SingleRecordid) => {
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
  outputFile,
  getSingleOutputData,
  getOnlyOutputImage,
  gatekeepFilterSearch,
  getUserProPic,
};
