"use client";
import styles from "./page.module.css";
import SearchBar from "../../components/searchBar/searchBar";
import { useState, useEffect } from "react";
import { getRecordsData } from "../../firebase/firestore";
import FoodGallery from "../../components/foodGallery/foodGallery";

export default function Home() {
  const [allData, setAllData] = useState([]);
  console.log("Main Page allData", allData);
  useEffect(() => {
    getRecordsData().then((allData) => {
      setAllData(allData);
    });
  }, []);
  return (
    <div className={styles.HomePageContainer}>
      <div className={styles.HomePageContainer__general}>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        <div className={styles.foodGalleryContainer}>
          <FoodGallery fullSetData={allData} />
        </div>
      </div>
      <div className={styles.HomePageContainer__signIn}></div>
    </div>
  );
}
