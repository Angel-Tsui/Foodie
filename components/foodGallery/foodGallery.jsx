"use client";
import styles from "./foodGallery.module.css";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import modalStyles from "../modal/modal.module.css";
import { useState, useContext } from "react";
import {
  getSingleOutputData,
  getOnlyOutputImage,
  getSingleRecordData,
  getUserName,
} from "../../firebase/firestore";
import { Context } from "../modal/modal";

function FoodGalleryCard(data) {
  // console.log("Food Gallery data", data);
  return (
    <div className={styles.foodGallery__card} id={data.id} key={data.id}>
      <div className={styles.foodGallery__image}>
        <img src={data.imageUrl} />
      </div>
      <div className={styles.foodGallery__title}>{data.name}</div>
      <div className={styles.foodGallery__resto}>{data.resto}</div>

      <div className={styles.foodGallery__starAndCusine}>
        <div className={styles.foodGallery__starRate}>
          {[...Array(5)].map((star, index) => {
            const rating = index + 1;

            return (
              <FaStar
                key={index}
                size={15}
                color={
                  rating <= data.starRating ? "white" : "rgb(114, 113, 113)"
                }
              />
            );
          })}
          <span key={data.starRating}></span>
        </div>
        <div className={styles.foodGallery__cusine}>{data.cusine}</div>
      </div>

      <div className={styles.foodGallery__priceAndParts}>
        <div className={styles.foodGallery__price}>
          {data.currency} {data.price}
        </div>
        <div className={styles.foodGallery__parts}>{data.parts}</div>
      </div>
    </div>
  );
}

export default function FoodGallery(props) {
  // console.log("foodGallery main", props);
  let allData = props.fullSetData;
  // console.log("fullSetData", allData);
  let nextStep = props.nextStep;
  // if (action != "redirect") {
  //   const [output, setOutput] = useContext(Context);
  //   // const [modal, setModal] = useContext(Context);
  //   console.log("in FoodGallery", output);
  // }

  return (
    <>
      {allData.map((data) => (
        <div
          id={data.id}
          key={data.id}
          onClick={() => {
            if (props.setMarkerPosition) {
              // console.log(data.latlng);
              props.setMarkerPosition(data.latlng);
              props.setPlaceInfo(data.mapInfo);
              props.setPlaceInfoRestoName(data.resto);
            }

            {
              // Display Image on Home FoodCollectionModal
              getOnlyOutputImage(data.id).then((outputFile) => {
                // console.log("img", outputFile);
                props.pop(outputFile);
                if (props.nextStep == "viewCollector") {
                  getUserName(data.userId, props.setGetCollector);
                  // props.setGetCollector(data.userId);
                } else {
                  {
                    nextStep != null && props.getCardId(data.id);
                  }
                  {
                    nextStep != null && props.getCardName(data.name);
                  }
                }
                props.triggerModal();
              });
            }
          }}
        >
          {FoodGalleryCard(data)}
        </div>
      ))}
    </>
  );
}
