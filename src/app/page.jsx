"use client";
import styles from "./page.module.css";
import TypeSearch from "../../components/searchBar/typeSearch";
import { useState, useEffect } from "react";
import { getRecordsData } from "../../firebase/firestore";
import FoodGalleryModal from "../../components/modal/FoodGalleryModal";
import Map from "../../components/map/map";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [output, setOutput] = useState("");
  const [getCollector, setGetCollector] = useState("");

  const [allData, setAllData] = useState([]);

  const searchParams = useSearchParams();
  const cusines = searchParams.get("cuisines");
  const doneness = searchParams.getAll("doneness");
  const parts = searchParams.getAll("parts");
  const resto = searchParams.get("resto");
  const lower = searchParams.get("lower");
  const upper = searchParams.get("upper");

  const [mapCenter, setMapCenter] = useState({
    lat: 22.2802845,
    lng: 114.1830516,
  });
  const [markerPosition, setMarkerPosition] = useState({});
  const [placeInfoRestoName, setPlaceInfoRestoName] = useState("");
  const [placeInfo, setPlaceInfo] = useState({});

  const [autoReply, setAutoReply] = useState("");

  const [filterResName, setFilterResName] = useState("");

  const [filterChanges, setFilterChanges] = useState(true);

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
      filter = { restaurant: resto };
    }
    if (filterResName != "") {
      filter = { restaurant: filterResName };
    }

    filterInfo = {
      orderMethod: "starRating",
      AscOrDesc: "desc",
      additionalFilter: filter,
    };

    if (filterChanges == true) {
      getRecordsData(filterInfo)
        .then((allData) => {
          setAllData(allData);
        })
        .then(() => {
          setFilterChanges(false);
        });
    }
  }, [cusines, doneness, parts, resto, filterResName]);

  return (
    <div className={styles.HomePageContainer}>
      <div className={styles.HomePageContainer__general}>
        <div className={styles.searchBarContainer}>
          <TypeSearch
            action="findResto"
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
            setGetCollector={setGetCollector}
            getCollector={getCollector}
            nextStep="viewCollector"
            setMarkerPosition={setMarkerPosition}
            setPlaceInfo={setPlaceInfo}
            setPlaceInfoRestoName={setPlaceInfoRestoName}
          />
          {allData.length == 0 && (
            <div className={styles.noMatch}>No Matching Collection</div>
          )}
        </div>
      </div>
      <div className={styles.HomePageContainer__maps} id="map" key="map">
        <Map
          mapCenter={mapCenter}
          markerPosition={markerPosition}
          placeInfo={placeInfo}
          placeInfoRestoName={placeInfoRestoName}
          setFilterResName={setFilterResName}
          setFilterChanges={setFilterChanges}
          setAutoReply={setAutoReply}
        />
      </div>
    </div>
  );
}
