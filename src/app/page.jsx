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
import Map from "../../components/map/map";
// import { Loader } from "@googlemaps/js-api-loader";

export default function Home() {
  const [output, setOutput] = useState("");
  // console.log("at home", output);
  const [allData, setAllData] = useState([]);
  // console.log("Main Page allData", allData);
  const [additionalFilter, setAdditionalFilter] = useState({});
  // console.log("additionalFilter", additionalFilter);
  const [typeSearch, setTypeSearch] = useState("");
  // console.log(typeSearch);
  // const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [mapCenter, setMapCenter] = useState({ lat: 22.278, lng: 114.182 });
  // console.log(mapCenter);
  const [markerPosition, setMarkerPosition] = useState({});
  // console.log(markerPosition);

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
    // console.log(apiKey);
  }, [additionalFilter]);

  return (
    <div className={styles.HomePageContainer}>
      <div className={styles.HomePageContainer__general}>
        <div className={styles.searchBarContainer}>
          {/* <SearchBar /> */}
          <TypeSearch
            action="findResto"
            filter={setAdditionalFilter}
            typeSearch={typeSearch}
            setTypeSearch={setTypeSearch}
          />
        </div>
        <div className={styles.foodGalleryContainer}>
          <FoodGalleryModal
            action="displayOutput"
            fullSetData={allData}
            pop={setOutput}
            output={output}
            setMarkerPosition={setMarkerPosition}
          />
          {allData.length == 0 && (
            <div className={styles.noMatch}>No Matching Collection</div>
          )}
        </div>
      </div>
      <div className={styles.HomePageContainer__maps} id="map" key="map">
        <Map
          mapCenter={mapCenter}
          setTypeSearch={setTypeSearch}
          filter={setAdditionalFilter}
          markerPosition={markerPosition}
          // setTypeSearch={setTypeSearch}
          // typeSearch={typeSearch}
        />
      </div>
    </div>
  );
}
