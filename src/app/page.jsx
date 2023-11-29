"use client";
import styles from "./page.module.css";
import SearchBar from "../../components/searchBar/searchBar";
import TypeSearch from "../../components/searchBar/typeSearch";
import { useState, useEffect } from "react";
import { getRecordsData, gatekeepFilterSearch } from "../../firebase/firestore";
import FoodGallery from "../../components/foodGallery/foodGallery";
// import modalStyles from "../../components/modal/modal.module.css";
// import { filter } from "../../components/modal/modal";
import FoodGalleryModal from "../../components/modal/FoodGalleryModal";
import { useLoadScript, GoogleMap } from "@react-google-maps/api";

export default function Home() {
  const [output, setOutput] = useState("");
  // console.log("at home", output);
  const [allData, setAllData] = useState([]);
  // console.log("Main Page allData", allData);
  const [additionalFilter, setAdditionalFilter] = useState({});
  // console.log("Home additionalFilter", additionalFilter);
  let filterInfo = {
    orderMethod: "starRating",
    AscOrDesc: "desc",
    additionalFilter: additionalFilter,
  };
  // console.log("Home filterInfo", filterInfo);

  useEffect(() => {
    getRecordsData(filterInfo).then((allData) => {
      setAllData(allData);
    });
  }, [additionalFilter]);

  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: "AIzaSyA2Ii1pn2H2NYssLmPYy0OcUAPkInO1piA",
  //   libraries,
  // });

  return (
    <div className={styles.HomePageContainer}>
      <div className={styles.HomePageContainer__general}>
        <div className={styles.searchBarContainer}>
          {/* <SearchBar /> */}
          <TypeSearch action="findResto" filter={setAdditionalFilter} />
        </div>
        <div className={styles.foodGalleryContainer}>
          <FoodGalleryModal
            action="displayOutput"
            fullSetData={allData}
            pop={setOutput}
            output={output}
          />
          {allData.length == 0 && (
            <div className={styles.noMatch}>No Matching Collection</div>
          )}
        </div>
      </div>
      <div className={styles.HomePageContainer__maps}>MAP</div>
    </div>
  );
}
