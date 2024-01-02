import { firestore, colRef, usersColRef, mapColRef } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

// Get CollectorName for Home Page
const getUserName = (userId, setGetCollector) => {
  getDoc(doc(firestore, "users", userId))
    .then((singleData) => {
      setGetCollector({
        collectorId: userId,
        collectorName: singleData.data().userDisplayName,
      });
    })
    .catch((e) => {
      console.log(e.message);
    });
};

// Users Collection
const getUserInfo = (userId, setWatchList, setUserName) => {
  if (userId != null) {
    getDoc(doc(firestore, "users", userId))
      .then((singleData) => {
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
    await updateDoc(updateProfileRef, {
      userDisplayName: userName,
      userPhotoURL: userProPic,
    });
  }
};

const updateUserToWatchList = async (userId, searchUserId) => {
  if (searchUserId) {
    const addWatchRef = doc(usersColRef, userId);
    await updateDoc(addWatchRef, { watchList: arrayUnion(searchUserId) });
  }
};

const removeUserFromWatchList = async (userId, deleteUserId) => {
  if (deleteUserId) {
    const addWatchRef = doc(usersColRef, userId);
    await updateDoc(addWatchRef, { watchList: arrayRemove(deleteUserId) });
  }
};

const UsersFilter = async (userDisplayName) => {
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
    return matchingUsersInfoFromDb;
  } catch (e) {
    console.log(e.message);
  }
};

// My Collection
const getUserProPic = (userId, set) => {
  if (userId != null) {
    getDoc(doc(firestore, "users", userId))
      .then((singleData) => {
        set(singleData.data().userPhotoURL);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
};

// Output (save to firestore)
const outputFile = async (recordId, ouputUrl, userId) => {
  await setDoc(doc(firestore, "outputs", recordId), {
    ouputUrl: ouputUrl,
    userId: userId,
  }).catch((err) => {
    console.log(err.message);
  });
};

// Output (get image from firestore)
const getSingleOutputData = async (outputId) => {
  const singleData = await getDoc(doc(firestore, "outputs", outputId)).catch(
    (err) => {
      console.log(err.message);
    }
  );
  return singleData.data();
};

const getOnlyOutputImage = async (outputId) => {
  let outputInfo = await getSingleOutputData(outputId).catch((err) => {});
  let outputImageUrl = await outputInfo.ouputUrl;
  return outputImageUrl;
};

// Save Map Basic LatLang to DB
const updateAvailableLocation = async (latLng) => {
  if (latLng) {
    const mapListRef = doc(firestore, "allMapInfo", "allAvailableLocation");
    await updateDoc(mapListRef, { location: arrayUnion(latLng) }).catch((e) => {
      console.log(e.message);
    });
  }
};

// Save Map Details to DB
const saveMapDetails = async (resto, latlng, mapInfo) => {
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
  const singleData = await getDoc(doc(mapColRef, "allAvailableLocation"));
  return singleData.data();
};

// Get Single Map Detail From DB
const getSingleAvailableLocationDetail = async (latLng) => {
  const displayOnMap = query(mapColRef, where("latlng", "==", latLng));
  let LocationDetail = await getDocs(displayOnMap);
  let detail;
  LocationDetail.forEach((doc) => {
    detail = (doc.id, doc.data());
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
  let id = recordId;
  const singleData = await getDoc(doc(firestore, "records", id)).catch(
    (err) => {
      console.log(err.message);
    }
  );
  return singleData.data();
};

const getFilterQuery = (cusines, doneness, parts, priceRange) => {
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
  return query;
};

const getRecordsData = async (filterInfo) => {
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
    if (filterInfo.additionalFilter.restaurant != undefined) {
      return where("resto", "==", filterInfo.additionalFilter.restaurant);
    }
    if (filterInfo.additionalFilter.cusines != undefined) {
      return where("cusine", "==", filterInfo.additionalFilter.cusines);
    }
    if (filterInfo.additionalFilter.doneness != undefined) {
      return where("cooked", "in", filterInfo.additionalFilter.doneness);
    }
    if (filterInfo.additionalFilter.parts != undefined) {
      return where("parts", "in", filterInfo.additionalFilter.parts);
    }
    if (
      filterInfo.additionalFilter.lower != 0 &&
      filterInfo.additionalFilter.lower != undefined
    ) {
      return where("price", ">=", filterInfo.additionalFilter.lower);
    }
    if (
      filterInfo.additionalFilter.upper != 2000 &&
      filterInfo.additionalFilter.upper != undefined
    ) {
      return where("price", "<=", filterInfo.additionalFilter.upper);
    }
    if (filterInfo.userId != undefined) {
      return where("userId", "==", filterInfo.userId);
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
    location.reload();
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
  getUserProPic,
  UsersFilter,
  updateUserToWatchList,
  removeUserFromWatchList,
  getUserName,
  getUserInfo,
  updateUserProfile,
  saveMapDetails,
  updateAvailableLocation,
  getAvailableLocation,
  getSingleAvailableLocationDetail,
  getFilterQuery,
};
