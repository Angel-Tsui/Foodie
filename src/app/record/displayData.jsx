"use client";
import styles from "./record.module.css";
import RadarChart from "../../../components/radarChart/radarChart";
import { GrRestaurant } from "react-icons/gr";
import { MdOutlinePriceChange } from "react-icons/md";
import { LuBeef } from "react-icons/lu";
import { PiFireBold } from "react-icons/pi";
import { BiDish } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";

export default function DisplayData(fullSetData) {
  let recordData = fullSetData.allData;
  let ratingData = fullSetData.allRatings;
  return (
    <div className={styles.meatInfo__outputSetSize}>
      <div className={styles.meatInfo__output} id="output__toPNG">
        <div className={styles.output__mainInfoContainer}>
          <div className={styles.output__mainInfo}>
            <div className={styles.output__image}>
              <img src={recordData.imageUrl} key={recordData.imageUrl} />
            </div>
            <div className={styles.output__textInfo}>
              <div className={styles.output__name} key={recordData.name}>
                {recordData.name}
              </div>
              <div className={styles.output__resto}>
                <GrRestaurant />
                <span key={recordData.resto}>{recordData.resto}</span>
              </div>
              <div className={styles.output__price}>
                <MdOutlinePriceChange />
                <span key={recordData.currency + recordData.price}>
                  {recordData.currency} {recordData.price}
                </span>
              </div>
              <div className={styles.output__parts}>
                <LuBeef />
                <span key={recordData.parts}>{recordData.parts}</span>
              </div>
              <div className={styles.output__cooked}>
                <PiFireBold />
                <span key={recordData.cooked}>{recordData.cooked}</span>
              </div>
              <div className={styles.output__cusine}>
                <BiDish />
                <span key={recordData.cusine}>{recordData.cusine}</span>
              </div>

              <div className={styles.output__starRating}>
                {[...Array(5)].map((star, index) => {
                  const rating = index + 1;

                  return (
                    <FaRegStar
                      className={styles.starDisplay}
                      key={index}
                      size={20}
                      color={
                        rating <= recordData.starRating
                          ? "white"
                          : "rgb(114, 17, 17)"
                      }
                    />
                  );
                })}
                <span key={recordData.starRating}>
                  {recordData.starRating} of 5
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.output__radarChart}>
          <RadarChart allRatings={ratingData} key={ratingData} />
        </div>

        <div
          className={styles.output__description}
          key={recordData.description}
        >
          {recordData.description}
        </div>
      </div>
    </div>
  );
}
