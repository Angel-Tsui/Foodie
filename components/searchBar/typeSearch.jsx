"use client";
import styles from "./searchBar.module.css";
import moduleStyles from "../modal/modal.module.css";
import Modal from "../modal/modal";
import { BiSearchAlt } from "react-icons/bi";
import { IoFilterOutline } from "react-icons/io5";
import { useState } from "react";

const SelectFilterModal = () => {
  const [filter, setFilter] = useState(false);

  const openFilterSelector = () => {
    console.log("filter");
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

export default function TypeSearch() {
  return (
    <>
      <div className={styles.searchBar__typeSearch}>
        <input
          type="text"
          placeholder="Restaurant/ Price/ Parts of Beef"
          className={styles.typeSearch__inputBox}
        />
        <div className={styles.searchIcon}>
          <BiSearchAlt />
        </div>
      </div>
      <Modal action="filter" />
    </>
  );
}
