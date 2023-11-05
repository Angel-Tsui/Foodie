"use client";
import styles from "./collection.module.css";
import Image from "next/image";
import MyCollection from "../../../components/myCollection/myCollection";
import SearchBar from "../../../components/searchBar/searchBar";
import TypeSearch from "../../../components/searchBar/typeSearch";
import { LiaMapMarkedSolid } from "react-icons/lia";
import FoodGallery from "../../../components/foodGallery/foodGallery";
import { useState } from "react";

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

function AddNewModal() {
  const [modal, setModal] = useState(false);

  function toggleModal() {
    console.log("open modal");
    setModal(!modal);
  }

  function handleCreate() {
    window.location.href = "/canvas";
  }

  return (
    <>
      <div
        className={styles.collectionGallery__create}
        onClick={() => {
          toggleModal();
        }}
      >
        Add New +
      </div>

      {modal && (
        <div className={styles.modal}>
          <div className={styles.modal__overlay}>
            <div className={styles.modal__content}>
              <div className={styles.modal__title}>Let's get Started</div>
              <div className={styles.modal__closeButton} onClick={toggleModal}>
                X
              </div>
              <form className={styles.modal__form}>
                <input type="text" placeholder="Title" />
                <input type="text" placeholder="Restaurant Name" />
                <input type="text" placeholder="Price" />
                <input type="text" placeholder="Parts of Beef" />
                <div
                  className={styles.modal__createButton}
                  onClick={() => {
                    handleCreate();
                  }}
                >
                  Create Design
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CollectionGalleryHeading() {
  return (
    <div className={styles.collectionGallery__header}>
      <div className={styles.collectionGallery__titleAndCreate}>
        <div className={styles.collectionGallery__title}>My Collection</div>
      </div>
      <div className={styles.collectionGallery__typeSearch}>
        <TypeSearch />
        <div className={styles.collectionGallery__map}>
          <LiaMapMarkedSolid />
        </div>
        <AddNewModal />
        {/* <div
          className={styles.collectionGallery__create}
          onClick={() => {
            handleAddNew();
          }}
        >
          Add New +
        </div> */}
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
