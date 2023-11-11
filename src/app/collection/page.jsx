"use client";
import styles from "./collection.module.css";
import MyCollection from "../../../components/myCollection/myCollection";
import TypeSearch from "../../../components/searchBar/typeSearch";
import { LiaMapMarkedSolid } from "react-icons/lia";
import FoodGallery from "../../../components/foodGallery/foodGallery";
import { useState } from "react";
import modalStyles from "../../../components/modal/modal.module.css";
import dynamic from "next/dynamic";
const GetName = dynamic(() => import("./getName"), { ssr: false });

function CollectorList() {
  return (
    <div className={styles.collectionList}>
      <div className={styles.collectionList__myCollection}>
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

function CollectionGalleryHeading() {
  return (
    <div className={styles.collectionGallery__header}>
      <div className={styles.collectionGallery__titleAndCreate}>
        <div className={styles.collectionGallery__title}>
          <GetName />
        </div>
      </div>
      <div className={styles.collectionGallery__typeSearch}>
        <TypeSearch />
        <div className={styles.collectionGallery__map}>
          <LiaMapMarkedSolid />
        </div>
        <div
          className={styles.collectionGallery__create}
          onClick={() => {
            window.location.href = "/record";
          }}
        >
          Add New +
        </div>
        {/* <AddNewModal /> */}
      </div>
    </div>
  );
}

function CollectionGallery() {
  return (
    <div className={styles.collectionGallery__foodGallery}>
      <FoodGallery />
    </div>
  );
}

export default function Collection() {
  return (
    <div className={styles.collectionPageContainer}>
      <div className={styles.collectorListContainer}>
        <CollectorList />
      </div>
      <div className={styles.collectionGallery}>
        <CollectionGalleryHeading />
        <CollectionGallery />
      </div>
    </div>
  );
}
