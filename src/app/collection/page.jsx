"use client";
import styles from "./collection.module.css";
import MyCollection from "../../../components/myCollection/myCollection";
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

function CollectorList(props) {
  let userId = props.userId;

  return (
    <div className={styles.collectionList}>
      <div className={styles.findUserContainer}>
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
            return (
              <Link href={`/collection?prevUser=${each.id}`}>
                <div
                  id={each.id}
                  key={each.id}
                  className={styles.eachSearchResult}
                  onClick={() => {
                    props.searching("");
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
        >
          <div className={styles.myCollectionContainer}>
            <MyCollection userId={userId} />
          </div>
        </Link>
      )}
      <div className={styles.collectionList__all}>
        {props.currentWatchList.map((each, index) => {
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
                href={`/collection?prevUser=${each}`}
              >
                <MyCollection userId={each} />
              </Link>

              <Link
                className={styles.collectionList__eachUnwatch}
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
                <div className={styles.collectionList__eachUnwatchCross}>
                  <RxCross2 />
                </div>
              </Link>
            </div>
          );
        })}
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
        ) : props.watchListId.includes(props.previewUser) ? (
          <div
            className={styles.collectionGallery__create}
            onClick={() => {
              removeUserFromWatchList(props.userId, props.previewUser);
              props.setWatchListChanges(props.previewUser);
            }}
          >
            Unfollow Collector
          </div>
        ) : (
          <div
            className={styles.collectionGallery__create}
            onClick={() => {
              updateUserToWatchList(props.userId, props.previewUser);
              props.setWatchListChanges(props.previewUser);
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
  let fullSetData = props.allData;
  return (
    <div className={styles.collectionGallery__foodGallery}>
      <FoodGalleryModal
        action={props.action}
        fullSetData={fullSetData}
        pop={props.func}
        output={props.output}
        nextStep={
          props.action == "collectionPreview" ? "allowFurtherAction" : null
        }
      />
    </div>
  );
}

export default function Collection() {
  const [userId, setUserId] = useState("");

  const [searchUser, setSearchUser] = useState("");

  const [searchResult, setSearchResult] = useState([]);

  const searchParams = useSearchParams();
  const previewUser = searchParams.get("prevUser");

  const [watchListId, setWatchListId] = useState([]);

  const [watchListChanges, setWatchListChanges] = useState("");

  const [allData, setAllData] = useState([]);
  const [userName, setUserName] = useState("");

  const [output, setOutput] = useState("");
  const [additionalFilter, setAdditionalFilter] = useState({});

  const [sameUser, setSameUser] = useState(true);

  useEffect(() => {
    verify();

    let userInfo = getUserInfoFromToken();
    let userId = userInfo.userId;
    setUserId(userId);

    if (userId != previewUser) {
      setSameUser(false);
    } else {
      setSameUser(true);
    }

    getUserInfo(userId, setWatchListId, setUserName);
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
      setAllData(allData);
    });
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
      <CollectorList
        userId={userId}
        searchUser={searchUser}
        searching={setSearchUser}
        searchResult={searchResult}
        setWatchListId={setWatchListId}
        currentWatchList={watchListId}
        setWatchListChanges={setWatchListChanges}
        previewUser={previewUser}
      />
      <div className={styles.collectionGallery}>
        <CollectionGalleryHeading
          userId={userId}
          userName={userName}
          filter={setAdditionalFilter}
          setWatchListChanges={setWatchListChanges}
          previewUser={previewUser}
          searching={setSearchUser}
          sameUser={sameUser}
          watchListId={watchListId}
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
