"use client";
import styles from "./collection.module.css";
import MyCollection from "../../../components/myCollection/myCollection";
// import { LiaMapMarkedSolid } from "react-icons/lia";
import { useState, useEffect } from "react";
import { verify, getUserInfoFromToken } from "../../../firebase/verify";
import {
  getRecordsData,
  updateUserToWatchList,
  removeUserFromWatchList,
  getUserInfo,
} from "../../../firebase/firestore";
import FoodGalleryModal from "../../../components/modal/FoodGalleryModal";
import { BiSearchAlt } from "react-icons/bi";
import { v4 } from "uuid";
import { RxCross2 } from "react-icons/rx";
import { UsersFilter } from "../../../firebase/firestore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import { useParams, URLSearchParams } from "next/navigation";

function CollectorList(props) {
  // console.log(props);
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
              <Link href={`/collection?prevUser=${each.id}`}>
                <div
                  id={each.id}
                  key={each.id}
                  className={styles.eachSearchResult}
                  onClick={() => {
                    // console.log(each.id);
                    // updateUserToWatchList(props.userId, each.id);
                    // props.setWatchListChanges(each.id);
                    // props.searching("");
                    // console.log("search for", each.id);
                    props.searching("");
                    // props.setSearchUserParam({ searchUser: each.id });
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
              </Link>
            );
          })}
        </div>
      )}
      {userId && (
        <Link
          className={styles.collectionList__myCollection}
          id={userId}
          key={userId}
          href={`/collection?prevUser=${userId}`}
          onClick={() => {
            // props.setGetUserCollection(userId);
            // props.loadUser(userId);
            // console.log("click self profile", userId);
          }}
        >
          <MyCollection userId={userId} />
        </Link>
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
              <Link
                className={
                  each == props.previewUser
                    ? styles.collectionList__eachProfile__active
                    : styles.collectionList__eachProfile
                }
                // key={index}
                // id={each}
                href={`/collection?prevUser=${each}`}
                // onClick={() => {
                //   props.setGetUserCollection(each);
                // }}
              >
                <MyCollection userId={each} />
              </Link>
              <Link
                className={styles.collectionList__eachUnwatch}
                // id={each}
                // key={each}
                onClick={() => {
                  removeUserFromWatchList(props.userId, each);
                  props.setWatchListChanges(each);
                }}
                href={
                  props.previewUser == each
                    ? `/collection?prevUser=${userId}`
                    : `/collection?prevUser=${props.previewUser}`
                }
              >
                <RxCross2 />
              </Link>
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
  // console.log("head", props.sameUser);
  return (
    <div className={styles.collectionGallery__header}>
      <div className={styles.collectionGallery__titleAndCreate}>
        <div className={styles.collectionGallery__title}>
          <span>{props.userName}</span>
        </div>
      </div>
      <div className={styles.collectionGallery__typeSearch}>
        {/* <div className={styles.collectionGallery__map}>
          <LiaMapMarkedSolid />
        </div> */}
        {props.sameUser ? (
          <div
            className={styles.collectionGallery__create}
            onClick={() => {
              let recordId = v4();
              window.open("/record/" + recordId);
            }}
          >
            Create Collection +
          </div>
        ) : (
          <div
            className={styles.collectionGallery__create}
            onClick={() => {
              // console.log(each.id);
              updateUserToWatchList(props.userId, props.previewUser);
              props.setWatchListChanges(props.previewUser);
              // props.searching("");
            }}
          >
            Follow Collector
          </div>
        )}
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

  // const [getUserCollection, setGetUserCollection] = useState("");
  // console.log("getUserCollection", getUserCollection);

  const [searchUser, setSearchUser] = useState("");
  // console.log("searchUser", searchUser);

  const [searchResult, setSearchResult] = useState([]);
  // console.log("searchResult", searchResult);

  const searchParams = useSearchParams();
  const previewUser = searchParams.get("prevUser");
  // console.log("previewUser", previewUser);

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

  const [sameUser, setSameUser] = useState(true);
  // console.log("same?", sameUser, userId, previewUser);

  useEffect(() => {
    verify();

    let userInfo = getUserInfoFromToken();
    let userId = userInfo.userId;
    setUserId(userId);

    if (userId != previewUser) {
      // console.log("false effect", userId, previewUser);
      setSameUser(false);
    } else {
      // console.log("true effect", userId, previewUser);
      setSameUser(true);
    }

    getUserInfo(userId, setWatchListId, setUserName);

    // if (userId != "") {
    // let filterInfo = {
    //   orderMethod: "timestamp",
    //   AscOrDesc: "desc",
    //   userId: userId,
    //   additionalFilter: additionalFilter,
    // };
    if (previewUser) {
      getUserInfo(previewUser, null, setUserName);
    }
    let filterInfo = {
      orderMethod: "timestamp",
      AscOrDesc: "desc",
      userId: previewUser,
      additionalFilter: additionalFilter,
    };

    getRecordsData(filterInfo).then((allData) => {
      // console.log("got data", userId);
      setAllData(allData);
    });
    // }
  }, [previewUser]);

  useEffect(() => {
    UsersFilter(searchUser).then((match) => {
      setSearchResult(match.filter((m) => m.id != userId));
    });
  }, [searchUser]);

  useEffect(() => {
    if (watchListChanges) {
      getUserInfo(userId, setWatchListId);
    }
    setWatchListChanges("");
  }, [watchListChanges]);

  return (
    <div className={styles.collectionPageContainer}>
      {/* <div className={styles.collectorListContainer}> */}
      <CollectorList
        userId={userId}
        // setGetUserCollection={setGetUserCollection}
        // getUserCollection={getUserCollection}
        searchUser={searchUser}
        searching={setSearchUser}
        searchResult={searchResult}
        setWatchListId={setWatchListId}
        currentWatchList={watchListId}
        setWatchListChanges={setWatchListChanges}
        previewUser={previewUser}
        // setSearchUserParam={setSearchUserParam}
        // setUserName={setUserName}
      />
      {/* </div> */}
      <div className={styles.collectionGallery}>
        <CollectionGalleryHeading
          userId={userId}
          userName={userName}
          filter={setAdditionalFilter}
          setWatchListChanges={setWatchListChanges}
          previewUser={previewUser}
          searching={setSearchUser}
          sameUser={sameUser}
          // action={sameUser == true ? "createCollection" : "AddToWatchList"}
        />
        <CollectionGallery
          allData={allData}
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
