import styles from "./record.module.css";
import RadarChart from "../../../components/radarChart/radarChart";
import { GrRestaurant } from "react-icons/gr";
import { MdOutlinePriceChange } from "react-icons/md";
import { LuBeef } from "react-icons/lu";
import { PiFireBold } from "react-icons/pi";
import { BiDish } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import {
  getRecordsData,
  getId,
  getSingleRecordData,
} from "../../../firebase/firestore";
import { firestore } from "../../../firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

// getId("AS5oPIxpA5Y49RvPYJiN");

export default async function DisplayData() {
  let recordData = await getRecordsData();
  recordData = recordData[2];
  console.log(recordData);
  //   let id = "AS5oPIxpA5Y49RvPYJiN";
  //   const docRef = doc(firestore, "records", id);

  //   const recordDetail = await getDoc(docRef);
  //   console.log("outside", recordDetail);
  //   console.log(recordDetail.data(), recordDetail.id);
  return (
    <div className={styles.meatInfo__output}>
      <div className={styles.output__mainInfoAndRadar}>
        <div className={styles.output__mainInfo}>
          <div className={styles.output__image}>
            <img src={recordData.imageUrl} />
          </div>
          <div className={styles.output__textInfo}>
            <div className={styles.output__name}>{recordData.name}</div>
            <div className={styles.output__resto}>
              <GrRestaurant />
              <span>{recordData.resto}</span>
            </div>
            <div className={styles.output__price}>
              <MdOutlinePriceChange />
              <span>
                {recordData.currency} {recordData.price}
              </span>
            </div>
            <div className={styles.output__parts}>
              <LuBeef />
              <span>{recordData.parts}</span>
            </div>
            <div className={styles.output__cooked}>
              <PiFireBold />
              <span>{recordData.cooked}</span>
            </div>
            <div className={styles.output__cusine}>
              <BiDish />
              <span>{recordData.cusine}</span>
            </div>

            <div className={styles.output__starRating}>
              {[...Array(5)].map((star, index) => {
                const rating = index + 1;

                return (
                  <FaRegStar
                    className={styles.starDisplay}
                    size={20}
                    color={
                      rating <= recordData.starRating
                        ? "white"
                        : "rgb(114, 17, 17)"
                    }
                  />
                );
              })}
              <span>{recordData.starRating} of 5</span>
            </div>
          </div>
        </div>
        <div className={styles.output__radarChart}>
          <RadarChart allRatings={recordData.allRatings} />
        </div>
      </div>

      <div className={styles.output__description}>{recordData.description}</div>
    </div>
  );
}
