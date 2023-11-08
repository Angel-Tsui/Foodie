"use client";
import styles from "./searchBar.module.css";
import { BiSearchAlt } from "react-icons/bi";

export default function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__sortByResto}>Restaurant</div>
      <div className={styles.searchBar__sortByPrice}>Price</div>
      <div className={styles.searchBar__sortByParts}>Parts of Beef</div>
      <div className={styles.searchBar__sortByCollector}>Collector</div>
      <div className={styles.searchBar__searchIcon}>
        <BiSearchAlt />
      </div>
    </div>
  );
}
