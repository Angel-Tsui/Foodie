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

function CollectorList(userId) {
  userId = userId.userId;
  // console.log("userId", userId);
  return (
    <div className={styles.collectionList}>
      <div
        className={styles.collectionList__myCollection}
        id={userId}
        key={userId}
      >
        <MyCollection />
      </div>
      <div className={styles.collectionList__all}>
        <MyCollection />
        <MyCollection />
        <MyCollection />
      </div>
    </div>
  );
}

// function AddNewModal() {
//   const [modal, setModal] = useState(false);

//   function toggleModal() {
//     setModal(!modal);
//   }

//   function handleCreate() {
//     window.location.href = "/meatInfo";
//   }

//   return (
//     <>
//       <div
//         className={styles.collectionGallery__create}
//         onClick={() => {
//           window.location.href = "/meatInfo";
//           // toggleModal();
//         }}
//       >
//         Add New +
//       </div>

//       {/* {modal && (
//         <div className={modalStyles.modal}>
//           <div className={modalStyles.modal__overlay}>
//             <div className={modalStyles.modal__content}>
//               <div className={modalStyles.modal__title}>Let's get Started</div>
//               <div
//                 className={modalStyles.modal__closeButton}
//                 onClick={toggleModal}
//               >
//                 X
//               </div>
//               <form className={modalStyles.modal__form}>
//                 <input type="text" placeholder="Title" />
//                 <input type="text" placeholder="Restaurant Name" />
//                 <input type="text" placeholder="Price" />
//                 <input type="text" placeholder="Parts of Beef" />
//                 <div
//                   className={modalStyles.modal__submitButton}
//                   onClick={() => {
//                     handleCreate();
//                   }}
//                 >
//                   Create Design
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )} */}
//     </>
//   );
// }

// function getName(userId) {
//   userId = userId.userId;
//   console.log(userId);
//   if (userId != null) {
//     getDoc(doc(firestore, "users", userId.userId))
//       .then((singleData) => {
//         console.log(singleData.data());
//       })
//       .catch((e) => {
//         console.log(e.message);
//       });
//     return userId.userId;
//   }
// }

function CollectionGalleryHeading(props) {
  return (
    <div className={styles.collectionGallery__header}>
      <div className={styles.collectionGallery__titleAndCreate}>
        <div className={styles.collectionGallery__title}>
          {/* <GetName userId={userId} /> */}
          <span>{props.userName}</span>
        </div>
      </div>
      <div className={styles.collectionGallery__typeSearch}>
        {/* <TypeSearch filter={props.filter} /> */}
        <div className={styles.collectionGallery__map}>
          <LiaMapMarkedSolid />
        </div>
        <div
          className={styles.collectionGallery__create}
          onClick={() => {
            // AddNewRecord(userInfo.userId);
            let recordId = v4();
            window.open("/record/" + recordId);
          }}
        >
          Create Collection +
        </div>
        {/* <AddNewModal /> */}
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
      userId: userId,
      additionalFilter: additionalFilter,
    };
    // console.log(filterInfo);

    getRecordsData(filterInfo).then((allData) => {
      setAllData(allData);
    });
  }, [additionalFilter]);

  // useEffect(() => {
  //   console.log("effect", userId);
  //   let filterInfo = {
  //     orderMethod: "timestamp",
  //     AscOrDesc: "desc",
  //     userId: userId,
  //   };
  //   getRecordsData({ filterInfo }).then((allData) => {
  //     setAllData(allData);
  //   });
  // }, []);

  return (
    <div className={styles.collectionPageContainer}>
      <div className={styles.collectorListContainer}>
        <CollectorList userId={userId} />
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
