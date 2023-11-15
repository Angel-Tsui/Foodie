"use client";
import styles from "./record.module.css";
import { useState, useEffect } from "react";
import handleUploadImage from "../../../components/radarChart/imageUpload";
import { FaStar } from "react-icons/fa";
import {
  getSingleRecordData,
  getRecordsData,
  setRecord,
  addRecordsData,
  updateRecordsData,
} from "../../../firebase/firestore";
import dynamic from "next/dynamic";
// const getUserInfoFromToken = dynamic(() => import("../../../firebase/verify"));
import { getUserInfoFromToken } from "../../../firebase/verify";

const getRecord = (recordId) => {
  const data = getSingleRecordData(recordId);
  return data;
};

export default function Record(recordId) {
  const [record, setRecord] = useState(getRecord());
  console.log(record);

  let recordData = getSingleRecordData(recordId);
  console.log(recordData);
  // const [currentData, setCurrentData] = useState({});
  // const [userId, setUserId] = useState("");
  // console.log(userId);

  const userInfo = getUserInfoFromToken();
  const userId = userInfo.userId;
  console.log(userId);

  // const user = () => {
  //   return userId;
  // };
  // setUserId(user());

  // const singleRecordId = recordId;
  // const data = async () => {
  //   const recordData = await getSingleRecordData(recordId);
  //   setCurrentData(recordData);
  // };

  // useEffect(() => {
  //   data();
  // }, []);

  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [resto, setResto] = useState("");
  const [currency, setCurrency] = useState("HKD");
  const [price, setPrice] = useState("");
  const [parts, setParts] = useState("");
  const [cusine, setCuisine] = useState("");
  const [cooked, setCooked] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [fat, setFat] = useState(0);
  const [tender, setTender] = useState(0);
  const [juicy, setJuicy] = useState(0);
  const [chewy, setChewy] = useState(0);
  const [thick, setThick] = useState(0);
  const [rich, setRich] = useState(0);
  const [description, setDescription] = useState("");
  const [allRatings, setAllRatings] = useState([
    fat,
    tender,
    juicy,
    chewy,
    thick,
    rich,
  ]);

  // useEffect(() => {
  //   setRecord(
  //     recordId,
  //     imageUrl,
  //     name,
  //     resto,
  //     currency,
  //     price,
  //     parts,
  //     cusine,
  //     cooked,
  //     starRating,
  //     allRatings,
  //     description,
  //     userId
  //   );
  // }, [
  //   imageUrl,
  //   name,
  //   resto,
  //   currency,
  //   price,
  //   parts,
  //   cusine,
  //   cooked,
  //   starRating,
  //   allRatings,
  //   description,
  // ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await setRecord(
      recordId,
      imageUrl,
      name,
      resto,
      currency,
      price,
      parts,
      cusine,
      cooked,
      starRating,
      allRatings,
      description,
      userId
    );
    // await addRecordsData(
    //   imageUrl,
    //   name,
    //   resto,
    //   currency,
    //   price,
    //   parts,
    //   cusine,
    //   cooked,
    //   starRating,
    //   allRatings,
    //   description,
    //   userId
    // );
  };

  useEffect(() => {
    setAllRatings([fat, tender, juicy, chewy, thick, rich]);
  }, [fat, tender, juicy, chewy, thick, rich]);

  return (
    <form id="inputForm">
      <div className={styles.input__basicInfo}>
        <div className={styles.input__basicInfoHeader}>Basic Information</div>
        <div>
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <button
            onClick={async (e) => {
              const genurl = await handleUploadImage(e, image);
              setImageUrl(genurl);
            }}
          >
            Upload
          </button>
        </div>
        <div className={styles.input__parts}>
          Part of Beef:
          <br />
          <select
            id="input__parts"
            onChange={(e) => {
              setParts(e.target.value);
            }}
          >
            <option>Please Select</option>
            <option value="Tongue">Tongue</option>
            <option value="Fillet">Fillet</option>
            <option value="Short Ribs">Short Ribs</option>
            <option value="Rib Finger">Ribs</option>
            <option value="Prime Rib">Prime Rib</option>
            <option value="Angus Rib Eye">Angus Rib Eye</option>
            <option value="Rib Eye">Rib Eye</option>
            <option value="Strip">Strip</option>
            <option value="Tenderloin">Tenderloin</option>
            <option value="Knuckle">Knuckle</option>
            <option value="Shank">Shank</option>
            <option value="Tendon">Tendon</option>
            <option value="Brisket">Brisket</option>
            <option value="Ox Tail">Ox Tail</option>

            {/* 
                  <option value="Tongue 牛舌">Tongue 牛舌</option>
                  <option value="Fillet 牛柳">Fillet 牛柳</option>
                  <option value="Short Ribs">Short Ribs 牛小排</option>
                  <option value="Rib Finger 牛肋條">Ribs 牛肋骨</option>
                  <option value="Prime Rib 板肉">Prime Rib 板肉</option>
                  <option value="Angus Rib Eye 安格斯肉眼">
                    Angus Rib Eye 安格斯肉眼
                  </option>
                  <option value="Rib Eye 肉眼">Rib Eye 肉眼</option>
                  <option value="Strip 紐約客">Strip 紐約客</option>
                  <option value="Tenderloin 菲力">Tenderloin 菲力</option>
                  <option value="Knuckle 臀肉">Knuckle 臀肉</option>
                  <option value="Shank 腿肉">Shank 腿肉</option>
                  <option value="Chuck Flap">Chuck Flap 翼板</option>
                <option value="Top Blade Muscle">Top Blade Muscle 板腱</option>

                <option value="Short Plate">Short Plate 胸腹</option>
                <option value="Sirloin">Sirloin 後腰脊</option>
                <option value="Flank">Flank 腹</option>
                 */}
          </select>
        </div>
        <div className={styles.input__cusine}>
          Cusine:
          <br />
          <select
            onChange={(e) => {
              setCuisine(e.target.value);
            }}
          >
            <option>Please Select</option>
            <option value="Western">Western</option>
            <option value="Japanese">Japanese</option>
            <option value="Korean">Koren</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>
        <div className={styles.input__name}>
          Name of Dish:
          <br />
          <input
            id="input__name"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className={styles.input__resto}>
            Restaurant Name:
            <br />
            <input
              id="input__resto"
              type="text"
              onChange={(e) => {
                setResto(e.target.value);
              }}
            />
          </div>
          <div className={styles.input__price}>
            Price:
            <br />
            <select
              id="input__price--currency"
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
            >
              <option value="HKD">HKD</option>
              <option value="JPY">JPY</option>
              <option value="TWD">TWD</option>
              <option value="USD">USD</option>
            </select>
            <input
              id="input__price"
              type="number"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className={styles.input__cooked}>
            Doneness:
            <br />
            <select
              id="input__cooked"
              onChange={(e) => {
                setCooked(e.target.value);
              }}
            >
              <option>Please Select</option>
              <option value="Rare">Rare</option>
              <option value="Medium-rare">Medium-rare</option>
              <option value="Medium">Medium</option>
              <option value="Medium-well">Medium-well</option>
              <option value="Well-done">Well-done</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.input__radarChart}>
        <div className={styles.input__radarChartHeader}>Rate your Dish</div>
        <div className={styles.input__radarChartItems}>
          <div className={styles.input__tender}>
            Tender:
            <br />
            <select
              onChange={(e) => {
                setTender(e.target.value);
              }}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className={styles.input__juicy}>
            Juicy:
            <br />
            <select
              onChange={(e) => {
                setJuicy(e.target.value);
              }}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className={styles.input__chewy}>
            Chewy:
            <br />
            <select
              onChange={(e) => {
                setChewy(e.target.value);
              }}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className={styles.input__thick}>
            Thick:
            <br />
            <select
              onChange={(e) => {
                setThick(e.target.value);
              }}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className={styles.input__rich}>
            Rich:
            <br />
            <select
              onChange={(e) => {
                setRich(e.target.value);
              }}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className={styles.input__fat}>
            Fat Ratio:
            <br />
            <select
              onChange={(e) => {
                setFat(e.target.value);
              }}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.input__descriptionContainer}>
        <div className={styles.input__descriptionHeader}>
          Description (Optional)
        </div>
        <div className={styles.input__description}>
          Description / Comments / Remarks:
          <br />
          <br />
          <div>Food for thought:</div>
          <ul>
            <li>Anything special about the dish</li>
            <li>Would you recommand it to family / elderly / others</li>
            <li>Future remarks</li>
          </ul>
          <br />
          <textarea
            id="input__description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.input__starRatingContainer}>
        <div className={styles.input__starRatingHeader}>Overall Rating</div>
        <div className={styles.input__starRating}>
          Overall Rating:
          <br />
          {[...Array(5)].map((star, index) => {
            const rating = index + 1;

            return (
              <label>
                <input
                  type="radio"
                  id="input__starRating"
                  value={rating}
                  onClick={() => {
                    setStarRating(rating);
                  }}
                />
                <FaStar
                  className={styles.star}
                  size={30}
                  color={
                    rating <= (hover || starRating)
                      ? "rgb(114, 17, 17)"
                      : "rgb(219, 218, 218)"
                  }
                  onMouseEnter={() => {
                    setHover(rating);
                  }}
                  onMouseLeave={() => {
                    setHover(null);
                  }}
                />
              </label>
            );
          })}
        </div>
      </div>
      <button
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Save Dish
      </button>
    </form>
  );
}
