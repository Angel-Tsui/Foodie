"use client";
import styles from "./searchBar.module.css";
import moduleStyles from "../modal/modal.module.css";
import Modal from "../modal/modal";
import { BiSearchAlt } from "react-icons/bi";
import { IoFilterOutline } from "react-icons/io5";
import { LuFilterX } from "react-icons/lu";
import { useState } from "react";

const SelectFilterModal = () => {
  const [filter, setFilter] = useState(false);

  const openFilterSelector = () => {
    // console.log("filter");
    setFilter(!filter);
  };

  return (
    <>
      <div className={styles.filterIcon} onClick={openFilterSelector}>
        <IoFilterOutline />
      </div>

      <div className={moduleStyles.modal}>
        <div className={moduleStyles.modal__overlay}>
          <div className={moduleStyles.modal__content}>
            <div className={moduleStyles.modal__filter}>
              {filter && <div>Filter</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function TypeSearch(props) {
  // console.log("typeSearch props", props);
  // const [typeSearch, setTypeSearch] = useState("");
  // console.log(typeSearch);
  return (
    // <div className={styles.searchBarInner}>
    <>
      <div className={styles.searchBar__typeSearch}>
        <input
          type="text"
          id="restoSearchInput"
          placeholder="Restaurant"
          className={styles.typeSearch__inputBox}
          onChange={(e) => {
            props.filter({
              restaurant: e.target.value,
            });
            props.setTypeSearch(e.target.value);
          }}
        />
        <div className={styles.searchIcon}>
          <BiSearchAlt
            onClick={() => {
              let completeAddress =
                document.querySelector("#restoSearchInput").innerHTML;
              console.log("search for", completeAddress);
              props.filter({
                restaurant: props.typeSearch,
              });
            }}
          />
        </div>
      </div>
      {props.action == "findResto" && (
        <div className={styles.typeSearch__filterContainer}>
          <Modal action="filter" additionalFilter={props.filter} />
          <div
            className={styles.filterIcon}
            onClick={() => {
              // console.log("clear filters");
              props.filter({});
            }}
          >
            <LuFilterX />{" "}
            <div className={styles.filterIconText}>Clear Filters</div>
          </div>
        </div>
      )}
    </>
    // </div>
  );
}
