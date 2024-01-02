"use client";
import styles from "./searchBar.module.css";
import Modal from "../modal/modal";
import { BiSearchAlt } from "react-icons/bi";
import { LuFilterX } from "react-icons/lu";
import Link from "next/link";

export default function TypeSearch(props) {
  return (
    <>
      <div className={styles.searchBar__typeSearch}>
        <input
          type="text"
          id="restoSearchInput"
          placeholder="Restaurant"
          className={styles.typeSearch__inputBox}
        />
        <Link href={`/?resto=${props.autoReply}`}>
          <div className={styles.searchIcon}>
            <BiSearchAlt
              onClick={() => {
                props.setFilterResName(props.autoReply);
                props.setFilterChanges(true);
              }}
            />
          </div>
        </Link>
      </div>
      {props.action == "findResto" && (
        <div className={styles.typeSearch__filterContainer}>
          <Modal
            action="filter"
            additionalFilter={props.filter}
            setFilterChanges={props.setFilterChanges}
            filterChanges={props.filterChanges}
            setFilterResName={props.setFilterResName}
          />
          <Link href={"/"}>
            <div
              className={styles.filterIcon}
              onClick={() => {
                props.setFilterResName("");
                props.setFilterChanges(true);
              }}
            >
              <LuFilterX />{" "}
              <div className={styles.filterIconText}>Clear Filters</div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
