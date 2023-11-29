"use client";
import styles from "./collection.module.css";
import searchStyles from "../../../components/searchBar/searchBar.module.css";
import MyCollection from "../../../components/myCollection/myCollection";
import TypeSearch from "../../../components/searchBar/typeSearch";
import { LiaMapMarkedSolid } from "react-icons/lia";
import FoodGallery from "../../../components/foodGallery/foodGallery";
import { useState, useEffect } from "react";
import modalStyles from "../../../components/modal/modal.module.css";
import AddNewRecord from "./addNewRecord";
import { verify, getUserInfoFromToken } from "../../../firebase/verify";
import {
  getRecordsData,
  updateUserToWatchList,
  removeUserFromWatchList,
  getUserInfo,
} from "../../../firebase/firestore";
import { firestore } from "../../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import FoodGalleryModal from "../../../components/modal/FoodGalleryModal";
import { BiSearchAlt } from "react-icons/bi";
import { v4 } from "uuid";
import { RxCross2 } from "react-icons/rx";
import { UsersFilter } from "../../../firebase/firestore";
// import dynamic from "next/dynamic";
// const GetName = dynamic(() => import("./getName"), { ssr: false });

function CollectorList(props) {
  // console.log(props.setUserName);
  let userId = props.userId;
  // console.log("userId", userId);

  return (
    <div className={styles.collectionList}>
      <div className={styles.findUserContainer}>
        {/* <TypeSearch action="findUser" /> */}
        <input
          type="text"
          className={styles.friendSearch}
          placeholder="Add Users to Watch List"
          onChange={(e) => {
            props.searching(e.target.value.toUpperCase());
          }}
        />
        <div className={styles.searchIcon}>
          <BiSearchAlt
            onClick={() => {
              props.searching(props.searchUser.toUpperCase());
            }}
          />
        </div>
      </div>
      {props.searchUser != "" && (
        <div className={styles.searchResults}>
          {props.searchResult.map((each) => {
            {
              /* console.log(each); */
            }
            return (
              <div
                id={each.id}
                key={each.id}
                className={styles.eachSearchResult}
                onClick={(e) => {
                  // console.log(each.id);
                  updateUserToWatchList(props.userId, each.id);
                  props.setWatchListChanges(each.id);
                }}
              >
                <div className={styles.eachSearchResultProPic}>
                  <img
                    src={
                      each.userPhotoURL != ""
                        ? each.userPhotoURL
                        : "/profile.jpg"
                    }
                  />
                </div>
                <div className={styles.eachSearchResultName}>
                  {each.userDisplayName}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {userId && (
        <div
          className={styles.collectionList__myCollection}
          id={userId}
          key={userId}
          onClick={() => {
            props.setGetUserCollection(userId);
            // props.loadUser(userId);
            // console.log("click self profile", userId);
          }}
        >
          <MyCollection userId={userId} />
        </div>
      )}
      <div className={styles.collectionList__all}>
        {props.currentWatchList.map((each, index) => {
          {
            /* console.log(each); */
          }
          return (
            <div
              className={styles.collectionList__eachWatch}
              key={index}
              id={each}
            >
              <div
                className={styles.collectionList__eachProfile}
                key={index}
                id={each}
                onClick={() => {
                  props.setGetUserCollection(each);
                }}
              >
                <MyCollection userId={each} />
              </div>
              <div
                className={styles.collectionList__eachUnwatch}
                id={each}
                key={each}
                onClick={() => {
                  removeUserFromWatchList(props.userId, each);
                  props.setWatchListChanges(each);
                }}
              >
                <RxCross2 />
              </div>
            </div>
          );
        })}

        {/* <MyCollection />
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
  // console.log("in CollectionGallery", props.action);
  // console.log(props.action);
  let fullSetData = props.allData;
  // console.log("in", fullSetData);
  return (
    <div className={styles.collectionGallery__foodGallery}>
      <FoodGalleryModal
        // action="collectionPreview"
        action={props.action}
        fullSetData={fullSetData}
        pop={props.func}
        output={props.output}
        nextStep={
          props.action == "collectionPreview" ? "allowFurtherAction" : null
        }
      />
      {/* <FoodGallery fullSetData={fullSetData} action={props.action} /> */}
    </div>
  );
}

export default function Collection() {
  const [userId, setUserId] = useState("");
  // console.log(userId);

  const [getUserCollection, setGetUserCollection] = useState("");
  // console.log("getUserCollection", getUserCollection);

  const [searchUser, setSearchUser] = useState("");
  // console.log("searchUser", searchUser);

  const [searchResult, setSearchResult] = useState([]);
  // console.log("searchResult", searchResult);

  const [watchListId, setWatchListId] = useState([]);
  // console.log("watchListId", watchListId);

  const [watchListChanges, setWatchListChanges] = useState("");
  // console.log("update / delete", watchListChanges);

  // console.log(userId);
  const [allData, setAllData] = useState([]);
  // console.log("allData", allData);
  const [userName, setUserName] = useState("");
  // console.log(userName);

  const [output, setOutput] = useState("");
  // console.log("at collection", output);
  const [additionalFilter, setAdditionalFilter] = useState({});
  // console.log("collection page additionalFilter", additionalFilter);

  const [sameUser, setSameUser] = useState();
  // console.log("same?", sameUser);

  useEffect(() => {
    verify();

    let userInfo = getUserInfoFromToken();
    let userId = userInfo.userId;
    setUserId(userId);

    if (getUserCollection == []) {
      setGetUserCollection(userId);
    }

    getUserInfo(userId, setWatchListId, setUserName);

    if (userId != "" && getUserCollection == "") {
      let filterInfo = {
        orderMethod: "timestamp",
        AscOrDesc: "desc",
        userId: userId,
        additionalFilter: additionalFilter,
      };

      getRecordsData(filterInfo).then((allData) => {
        // console.log("got data", userId);
        setAllData(allData);
      });
    }

    if (getUserCollection != "") {
      let filterInfo = {
        orderMethod: "timestamp",
        AscOrDesc: "desc",
        userId: getUserCollection,
        additionalFilter: additionalFilter,
      };

      getRecordsData(filterInfo).then((allData) => {
        // console.log("got data", getUserCollection);
        setAllData(allData);
      });
    }
  }, [additionalFilter, getUserCollection]);

  useEffect(() => {
    UsersFilter(searchUser).then((match) => {
      setSearchResult(match);
    });
  }, [searchUser]);

  useEffect(() => {
    if (watchListChanges) {
      getUserInfo(userId, setWatchListId);
    }
    setWatchListChanges("");
  }, [watchListChanges]);

  useEffect(() => {
    // console.log("compare", userId, getUserCollection);
    if (userId == getUserCollection) {
      setSameUser(true);
    } else {
      setSameUser(false);
    }
    if (getUserCollection) {
      getUserInfo(getUserCollection, null, setUserName);
    }
  }, [getUserCollection]);

  return (
    <div className={styles.collectionPageContainer}>
      {/* <div className={styles.collectorListContainer}> */}
      <CollectorList
        userId={userId}
        setGetUserCollection={setGetUserCollection}
        searchUser={searchUser}
        searching={setSearchUser}
        searchResult={searchResult}
        setWatchListId={setWatchListId}
        currentWatchList={watchListId}
        setWatchListChanges={setWatchListChanges}
        // setUserName={setUserName}
      />
      {/* </div> */}
      <div className={styles.collectionGallery}>
        <CollectionGalleryHeading
          userId={userId}
          userName={userName}
          filter={setAdditionalFilter}
        />
        <CollectionGallery
          allData={allData}
          // action={"redirect"}
          func={setOutput}
          output={output}
          action={sameUser == true ? "collectionPreview" : "displayOutput"}
        />
        {allData.length == 0 && (
          <div className={styles.createNow}>No Collection At The Moment</div>
        )}
      </div>
    </div>
  );
}
