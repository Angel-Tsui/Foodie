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
  console.log("additionalFilter", additionalFilter);
  const [typeSearch, setTypeSearch] = useState("");
  // const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [mapCenter, setMapCenter] = useState({ lat: 22.278, lng: 114.182 });
  // console.log(mapCenter);

  // const Map = () => {
  //   const loader = new Loader({
  //     apiKey: apiKey,
  //     version: "weekly",
  //     // ...additionalOptions,
  //   });

  //   loader.load().then(async () => {
  //     const { Map } = await google.maps.importLibrary("maps");

  //     let map = new Map(document.querySelector("#map"), {
  //       center: { lat: 22.278, lng: 114.182 },
  //       zoom: 15,
  //       styles: [
  //         { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  //         {
  //           elementType: "labels.text.stroke",
  //           stylers: [{ color: "#242f3e" }],
  //         },
  //         { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  //         {
  //           featureType: "administrative.locality",
  //           elementType: "labels.text.fill",
  //           stylers: [{ color: "#d59563" }],
  //         },
  //         {
  //           featureType: "poi",
  //           elementType: "labels.text.fill",
  //           stylers: [{ color: "#d59563" }],
  //         },
  //         {
  //           featureType: "poi.park",
  //           elementType: "geometry",
  //           stylers: [{ color: "#263c3f" }],
  //         },
  //         {
  //           featureType: "poi.park",
  //           elementType: "labels.text.fill",
  //           stylers: [{ color: "#6b9a76" }],
  //         },
  //         {
  //           featureType: "road",
  //           elementType: "geometry",
  //           stylers: [{ color: "#38414e" }],
  //         },
  //         {
  //           featureType: "road",
  //           elementType: "geometry.stroke",
  //           stylers: [{ color: "#212a37" }],
  //         },
  //         {
  //           featureType: "road",
  //           elementType: "labels.text.fill",
  //           stylers: [{ color: "#9ca5b3" }],
  //         },
  //         {
  //           featureType: "road.highway",
  //           elementType: "geometry",
  //           stylers: [{ color: "#746855" }],
  //         },
  //         {
  //           featureType: "road.highway",
  //           elementType: "geometry.stroke",
  //           stylers: [{ color: "#1f2835" }],
  //         },
  //         {
  //           featureType: "road.highway",
  //           elementType: "labels.text.fill",
  //           stylers: [{ color: "#f3d19c" }],
  //         },
  //         {
  //           featureType: "transit",
  //           elementType: "geometry",
  //           stylers: [{ color: "#2f3948" }],
  //         },
  //         {
  //           featureType: "transit.station",
  //           elementType: "labels.text.fill",
  //           stylers: [{ color: "#d59563" }],
  //         },
  //         {
  //           featureType: "water",
  //           elementType: "geometry",
  //           stylers: [{ color: "#17263c" }],
  //         },
  //         {
  //           featureType: "water",
  //           elementType: "labels.text.fill",
  //           stylers: [{ color: "#515c6d" }],
  //         },
  //         {
  //           featureType: "water",
  //           elementType: "labels.text.stroke",
  //           stylers: [{ color: "#17263c" }],
  //         },
  //       ],
  //     });
  //   });
  // };

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
          />
          {allData.length == 0 && (
            <div className={styles.noMatch}>No Matching Collection</div>
          )}
        </div>
      </div>
      <div className={styles.HomePageContainer__maps} id="map" key="map">
        <Map
          mapCenter={mapCenter}
          // setTypeSearch={setTypeSearch}
          // typeSearch={typeSearch}
        />
      </div>
    </div>
  );
}
