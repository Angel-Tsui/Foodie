"use client";
import styles from "./searchBar.module.css";
import moduleStyles from "../modal/modal.module.css";
import Modal from "../modal/modal";
import { BiSearchAlt } from "react-icons/bi";
import { IoFilterOutline } from "react-icons/io5";
import { LuFilterX } from "react-icons/lu";
import { useState } from "react";
import Link from "next/link";

export default function TypeSearch(props) {
  // console.log("typeSearch props", props);
  // const [typeSearch, setTypeSearch] = useState("");
  // console.log(typeSearch);
  return (
    <>
      <div className={styles.searchBar__typeSearch}>
        {/* <Link href={`/?${props.typeSearch}`}> */}
        <input
          type="text"
          id="restoSearchInput"
          placeholder="Restaurant"
          className={styles.typeSearch__inputBox}
          // onChange={(e) => {
          //   props.filter({
          //     restaurant: e.target.value,
          //   });
          //   props.setTypeSearch(e.target.value);
          //   window.history.pushState(null, "", `/?${props.typeSearch}`);
          // }}
        />
        {/* </Link> */}
        <Link href={`/?resto=${props.autoReply}`}>
          <div className={styles.searchIcon}>
            <BiSearchAlt
              onClick={() => {
                props.setFilterResName(props.autoReply);
                props.setFilterChanges(true);

                //   props.filter({
                //     restaurant: props.typeSearch,
                //   });
                //   props.setTypeSearch(e.target.value);
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
