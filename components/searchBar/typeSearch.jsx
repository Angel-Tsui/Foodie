"use client";
import styles from "./searchBar.module.css";
import { BiSearchAlt } from "react-icons/bi";

export default function TypeSearch() {
  return (
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
  );
}
