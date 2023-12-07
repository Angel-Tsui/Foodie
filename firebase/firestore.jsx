import { firestore, colRef, usersColRef, mapColRef } from "./firebase";
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
  limit,
  arrayUnion,
  arrayRemove,
  update,
} from "firebase/firestore";
import { getUserInfoFromToken } from "./verify";

// Users Collection
const getUserInfo = (userId, setWatchList, setUserName) => {
  if (userId != null) {
    getDoc(doc(firestore, "users", userId))
      .then((singleData) => {
        // console.log("fire", singleData.data().watchList);
        if (setWatchList != null) {
          setWatchList(singleData.data().watchList.reverse());
        }
        setUserName(singleData.data().userDisplayName);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
};

const updateUserProfile = async (userId, userName, userProPic) => {
  if (userId) {
    const updateProfileRef = doc(usersColRef, userId);
    // console.log("update", userId, userName, userProPic);
    await updateDoc(updateProfileRef, {
      userDisplayName: userName,
      userPhotoURL: userProPic,
    });
    // await updateProfileRef.update({ userPhotoURL: userProPic });
  }
};

const updateUserToWatchList = async (userId, searchUserId) => {
  if (searchUserId) {
    const addWatchRef = doc(usersColRef, userId);
    // console.log("update", searchUserId);
    await updateDoc(addWatchRef, { watchList: arrayUnion(searchUserId) });
  }
};

const removeUserFromWatchList = async (userId, deleteUserId) => {
  if (deleteUserId) {
    const addWatchRef = doc(usersColRef, userId);
    // console.log("delete", deleteUserId);
    await updateDoc(addWatchRef, { watchList: arrayRemove(deleteUserId) });
  }
};

const UsersFilter = async (userDisplayName) => {
  // console.log("searching for", userDisplayName);
  let filterUserDb;
  if (userDisplayName != null) {
    filterUserDb = query(
      usersColRef,
      where("userDisplayName", ">=", userDisplayName),
      where("userDisplayName", "<=", userDisplayName + "~"),
      limit(10)
    );
  }

  let recordsUser = await getDocs(filterUserDb);

  try {
    let matchingUsersInfoFromDb = [];
    recordsUser.docs.forEach((doc) => {
      matchingUsersInfoFromDb.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    // console.log("matchingUsersInfoFromDb", matchingUsersInfoFromDb);
    return matchingUsersInfoFromDb;
  } catch (e) {
    console.log(e.message);
  }
};

// My Collection
const getUserProPic = (userId, set) => {
  // console.log(userId);
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

// Save Map Basic LatLang to DB
const updateAvailableLocation = async (latLng) => {
  if (latLng) {
    const mapListRef = doc(firestore, "allMapInfo", "allAvailableLocation");
    // console.log("update", latLng);
    await updateDoc(mapListRef, { location: arrayUnion(latLng) }).catch((e) => {
      console.log(e.message);
    });
  }
};

// Save Map Details to DB
const saveMapDetails = async (resto, latlng, mapInfo) => {
  // console.log(resto, latlng, mapInfo);
  let website;
  if (mapInfo.website == null || mapInfo.website == "") {
    website = "No website Available";
  } else {
    website = mapInfo.website;
  }
  const addMapDetailsRef = doc(firestore, "allMapInfo", resto);
  await setDoc(addMapDetailsRef, {
    resto: resto,
    latlng: latlng,
    address: mapInfo.address,
    number: mapInfo.number,
    place_id: mapInfo.place_id,
    website: website,
  }).catch((err) => {
    console.log(err.message);
  });
};

// Get Maps Info From DB to Display on Scren
const getAvailableLocation = async () => {
  // console.log("getting all map location");
  const singleData = await getDoc(doc(mapColRef, "allAvailableLocation"));
  return singleData.data();
};

// Get Single Map Detail From DB
const getSingleAvailableLocationDetail = async (latLng) => {
  // console.log("fire", latLng);
  const displayOnMap = query(mapColRef, where("latlng", "==", latLng));
  let LocationDetail = await getDocs(displayOnMap);
  let detail;
  LocationDetail.forEach((doc) => {
    detail = (doc.id, doc.data());
    // console.log(detail);
  });
  return detail;
};

// Records
const setRecord = async (
  recordId,
  imageUrl,
  name,
  resto,
  latlng,
  mapInfo,
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
    latlng: latlng,
    mapInfo: mapInfo,
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

const getFilterQuery = (cusines, doneness, parts, priceRange) => {
  // console.log("in handleFilterSearch");
  // console.log("c", cusines, "d", doneness, "p", parts, "pr", priceRange);

  let query = [];
  if (cusines != "") {
    query.push(`cuisines=${cusines}`);
  }
  if (doneness.length != 0) {
    doneness.forEach((d) => {
      query.push(`doneness=${d}`);
    });
  }
  if (parts.length != 0) {
    parts.forEach((p) => {
      query.push(`parts=${p}`);
    });
  }
  if (priceRange[0] != 0 || priceRange[1] != 2000) {
    query.push(`lower=${priceRange[0]}`);
    query.push(`upper=${priceRange[1]}`);
  }
  // console.log("filterInfo", filterInfo);
  return query;
};

// const gatekeepFilterSearch = (cusines, doneness, parts, priceRange) => {
//   // console.log("in handleFilterSearch");
//   // console.log("c", cusines, "d", doneness, "p", parts, "pr", priceRange);
//   let filterInfo = {};

//   if (cusines != "") {
//     filterInfo.cusines = cusines;
//   }
//   if (doneness.length != 0) {
//     filterInfo.doneness = doneness;
//   }
//   if (parts.length != 0) {
//     filterInfo.parts = parts;
//   }
//   if (priceRange[0] != 0 || priceRange[1] != 2000) {
//     filterInfo.lower = priceRange[0];
//     filterInfo.upper = priceRange[1];
//   }
//   // console.log("filterInfo", filterInfo);
//   return filterInfo;
// };

const getRecordsData = async (filterInfo) => {
  console.log("getRecordsData props", filterInfo);
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
      return where("resto", "==", filterInfo.additionalFilter.restaurant);
    }
    // if (filterInfo.additionalFilter.restaurant != undefined) {
    //   return where("resto", "<=", filterInfo.additionalFilter.restaurant);
    // }
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
    if (
      filterInfo.additionalFilter.lower != 0 &&
      filterInfo.additionalFilter.lower != undefined
    ) {
      // console.log("fill lower", filterInfo.additionalFilter.lower);
      return where("price", ">=", filterInfo.additionalFilter.lower);
    }
    if (
      filterInfo.additionalFilter.upper != 2000 &&
      filterInfo.additionalFilter.upper != undefined
    ) {
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
  latlng,
  mapInfo,
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
    latlng: latlng,
    mapInfo: mapInfo,
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
  // gatekeepFilterSearch,
  getUserProPic,
  UsersFilter,
  updateUserToWatchList,
  removeUserFromWatchList,
  getUserInfo,
  updateUserProfile,
  saveMapDetails,
  updateAvailableLocation,
  getAvailableLocation,
  getSingleAvailableLocationDetail,
  getFilterQuery,
};
