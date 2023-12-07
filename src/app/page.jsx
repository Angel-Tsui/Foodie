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
import { useSearchParams } from "next/navigation";
// import { Loader } from "@googlemaps/js-api-loader";

export default function Home() {
  const [output, setOutput] = useState("");
  // console.log("at home", output);
  const [allData, setAllData] = useState([]);
  // console.log("Main Page allData", allData);

  const searchParams = useSearchParams();
  const cusines = searchParams.get("cuisines");
  const doneness = searchParams.getAll("doneness");
  const parts = searchParams.getAll("parts");
  const resto = searchParams.get("resto");
  const lower = searchParams.get("lower");
  const upper = searchParams.get("upper");
  console.log("searchParam", resto, lower, upper, cusines, doneness, parts);

  // const [typeSearch, setTypeSearch] = useState("");
  // console.log("typeSearch", typeSearch);
  // const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [mapCenter, setMapCenter] = useState({
    lat: 22.2802845,
    lng: 114.1830516,
  });
  // console.log(mapCenter);
  const [markerPosition, setMarkerPosition] = useState({});
  // console.log(markerPosition);
  const [placeInfoRestoName, setPlaceInfoRestoName] = useState("");
  const [placeInfo, setPlaceInfo] = useState({});
  // console.log(placeInfo);
  const [filterResName, setFilterResName] = useState("");
  console.log("filterResName", filterResName);

  const [autoReply, setAutoReply] = useState("");
  console.log(autoReply);

  const [filterChanges, setFilterChanges] = useState(true);
  console.log(filterChanges);

  // const [additionalFilter, setAdditionalFilter] = useState({});
  // console.log("additionalFilter", additionalFilter);

  let filterInfo = {};
  useEffect(() => {
    let filter = {};
    if (cusines != null) {
      filter.cusines = cusines;
    }
    if (doneness.length != 0) {
      filter.doneness = doneness;
    }
    if (parts.length != 0) {
      filter.parts = parts;
    }
    if (lower != null) {
      filter.lower = parseInt(lower);
    }
    if (upper != null) {
      filter.upper = parseInt(upper);
    }
    if (resto != null) {
      console.log("qsResto", resto);
      filter = { restaurant: resto };
    }
    if (filterResName != "") {
      console.log("filterResName", filterResName);
      // filter.restaurant = filterResName;
      filter = { restaurant: filterResName };
    }
    // console.log(filter);

    filterInfo = {
      orderMethod: "starRating",
      AscOrDesc: "desc",
      additionalFilter: filter,
    };

    console.log(filterInfo);

    if (filterChanges == true) {
      getRecordsData(filterInfo)
        .then((allData) => {
          setAllData(allData);
        })
        .then(() => {
          console.log("data is updated, turn filterchanges to false");
          setFilterChanges(false);
        });
    }
  }, [cusines, doneness, parts, resto, filterResName]);

  return (
    <div className={styles.HomePageContainer}>
      <div className={styles.HomePageContainer__general}>
        <div className={styles.searchBarContainer}>
          {/* <SearchBar /> */}
          <TypeSearch
            action="findResto"
            // filter={setAdditionalFilter}
            // additionalFilter={additionalFilter}
            // typeSearch={typeSearch}
            // setTypeSearch={setTypeSearch}
            filterResName={filterResName}
            setFilterChanges={setFilterChanges}
            filterChanges={filterChanges}
            resto={resto}
            setFilterResName={setFilterResName}
            autoReply={autoReply}
          />
        </div>
        <div className={styles.foodGalleryContainer}>
          <FoodGalleryModal
            action="displayOutput"
            fullSetData={allData}
            pop={setOutput}
            output={output}
            setMarkerPosition={setMarkerPosition}
            setPlaceInfo={setPlaceInfo}
            setPlaceInfoRestoName={setPlaceInfoRestoName}
          />
          {allData.length == 0 && (
            <div className={styles.noMatch}>No Matching Collection</div>
          )}
        </div>
      </div>
      {/* <div className={styles.HomePageContainer__maps} z-index={100}>
        Choose a collection on the left
      </div> */}
      <div className={styles.HomePageContainer__maps} id="map" key="map">
        <Map
          mapCenter={mapCenter}
          // setTypeSearch={setTypeSearch}
          // filter={setAdditionalFilter}
          markerPosition={markerPosition}
          placeInfo={placeInfo}
          placeInfoRestoName={placeInfoRestoName}
          setFilterResName={setFilterResName}
          setFilterChanges={setFilterChanges}
          setAutoReply={setAutoReply}

          // setTypeSearch={setTypeSearch}
          // typeSearch={typeSearch}
        />
      </div>
    </div>
  );
}
