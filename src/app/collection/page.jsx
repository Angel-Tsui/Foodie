"use client";
import styles from "./collection.module.css";
import MyCollection from "../../../components/myCollection/myCollection";
import TypeSearch from "../../../components/searchBar/typeSearch";
import { LiaMapMarkedSolid } from "react-icons/lia";
import FoodGallery from "../../../components/foodGallery/foodGallery";
import { useState, useEffect } from "react";
import modalStyles from "../../../components/modal/modal.module.css";
import AddNewRecord from "./addNewRecord";
import { verify, getUserInfoFromToken } from "../../../firebase/verify";
import { getRecordsData } from "../../../firebase/firestore";
import { firestore } from "../../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import FoodGalleryModal from "../../../components/modal/FoodGalleryModal";
import { v4 } from "uuid";
// import dynamic from "next/dynamic";
// const GetName = dynamic(() => import("./getName"), { ssr: false });

function CollectorList(props) {
  let userId = props.userId;
  // console.log("userId", userId);
  return (
    <div className={styles.collectionList}>
      {userId && (
        <div
          className={styles.collectionList__myCollection}
          id={userId}
          key={userId}
          // onClick={() => {
          //   props.loadUser(userId);
          //   console.log("click self profile", userId);
          // }}
        >
          <MyCollection userId={userId} />
        </div>
      )}

      <div className={styles.collectionList__all}>
        {/* <MyCollection />
        <MyCollection />
        <MyCollection /> */}
      </div>
    </div>
  );
}

function CollectionGalleryHeading(props) {
  return (
    <div className={styles.collectionGallery__header}>
      <div className={styles.collectionGallery__titleAndCreate}>
        <div className={styles.collectionGallery__title}>
          <span>{props.userName}</span>
        </div>
      </div>
      <div className={styles.collectionGallery__typeSearch}>
        <div className={styles.collectionGallery__map}>
          <LiaMapMarkedSolid />
        </div>
        <div
          className={styles.collectionGallery__create}
          onClick={() => {
            let recordId = v4();
            window.open("/record/" + recordId);
          }}
        >
          Create Collection +
        </div>
      </div>
    </div>
  );
}

function CollectionGallery(props) {
  // console.log("in CollectionGallery", props);
  // console.log(props.action);
  let fullSetData = props.allData;
  // console.log("in", fullSetData);
  return (
    <div className={styles.collectionGallery__foodGallery}>
      <FoodGalleryModal
        action="collectionPreview"
        fullSetData={fullSetData}
        pop={props.func}
        output={props.output}
        nextStep="allowFurtherAction"
      />
      {/* <FoodGallery fullSetData={fullSetData} action={props.action} /> */}
    </div>
  );
}

export default function Collection() {
  const [userId, setUserId] = useState("");
  // console.log(userId);
  const [watchListId, setWatchListId] = useState("");
  // console.log(userId);
  const [allData, setAllData] = useState([]);
  // console.log("allData", allData);
  const [userName, setUserName] = useState("");
  const [output, setOutput] = useState("");
  // console.log("at collection", output);
  const [additionalFilter, setAdditionalFilter] = useState({});
  // console.log("collection page additionalFilter", additionalFilter);

  useEffect(() => {
    verify();

    let userInfo = getUserInfoFromToken();
    let userId = userInfo.userId;
    setUserId(userId);
    // console.log("effect", userId);

    // console.log(userId);
    if (userId != null) {
      getDoc(doc(firestore, "users", userId))
        .then((singleData) => {
          setUserName(singleData.data().userDisplayName);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }

    let filterInfo = {
      orderMethod: "timestamp",
      AscOrDesc: "desc",
      // userId: {watchListId ? watchListId : userId},
      additionalFilter: additionalFilter,
    };
    if (watchListId != "") {
      filterInfo.userId = watchListId;
    } else {
      filterInfo.userId = userId;
    }
    // console.log(filterInfo);

    getRecordsData(filterInfo).then((allData) => {
      setAllData(allData);
    });
  }, [additionalFilter, watchListId]);

  return (
    <div className={styles.collectionPageContainer}>
      <div className={styles.collectorListContainer}>
        <CollectorList userId={userId} loadUser={setWatchListId} />
      </div>
      <div className={styles.collectionGallery}>
        <CollectionGalleryHeading
          userId={userId}
          userName={userName}
          filter={setAdditionalFilter}
        />
        <CollectionGallery
          allData={allData}
          action={"redirect"}
          func={setOutput}
          output={output}
        />
        {allData.length == 0 && (
          <div className={styles.createNow}>Create Your First Collection</div>
        )}
      </div>
    </div>
  );
}
