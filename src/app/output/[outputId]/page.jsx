"use client";
import styles from "../output.module.css";
import { useState, useEffect } from "react";
import { getOnlyOutputImage } from "../../../../firebase/firestore";
import Image from "next/image";
import DisplayData from "../../record/displayData";
import { getSingleRecordData } from "../../../../firebase/firestore";
import SimpleMap from "../../../../components/map/simpleMap";
// import Map from "../../../../components/map/map";

export default function OutputDisplayPage(outputId) {
  let displayOutputId = outputId.params.outputId;
  const [allData, setAllData] = useState({});
  const [allRatings, setAllRatings] = useState([]);
  // console.log(allRatings, allData);

  // let outputFile;
  // getOnlyOutputImage(displayOutputId).then((outputFile) => {
  //   console.log("img", outputFile);
  //   outputFile = outputFile;
  // });
  // useEffect(() => {
  getSingleRecordData(displayOutputId).then((data) => {
    // console.log("data", data);
    setAllData(data);
    setAllRatings(data.allRatings);
  });
  // }, []);

  // let allRatings;
  // let allData;

  return (
    <>
      <div className={styles.outputContainer}>
        <div className={styles.output__collection}>
          <DisplayData
            allData={allData}
            allRatings={allRatings}
            key="keyInfo"
          />
          {/* <Image src={outputFile} width={500} height={500} alt="image" /> */}
          {/* <img src={outputFile} className={styles.outputImage} /> */}
        </div>
        <div className={styles.output__sideInfo}>
          <div className={styles.sideInfo__mapInfo}>
            {allData != {} && <SimpleMap mapInfo={allData.mapInfo} />}
          </div>
          <div className={styles.sideInfo__collectorInfo}></div>
          <div className={styles.sideInfo__radar}></div>

          {/* <div className={styles.sideInfo__map} id="map" key="map">
            <Map
              mapCenter={allData.latlng}
              markerPosition={allData.latlng}
              placeInfo={allData.mapInfo}
              placeInfoRestoName={allData.resto}
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
