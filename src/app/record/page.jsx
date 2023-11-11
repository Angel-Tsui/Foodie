"use client";
import styles from "./record.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import RadarChart from "../../../components/radarChart/radarChart";
import ImageUpload from "../../../components/radarChart/imageUpload";
import { GrRestaurant } from "react-icons/gr";
import { MdOutlinePriceChange } from "react-icons/md";
import { LuBeef } from "react-icons/lu";
import { PiFireBold } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

export default function Record() {
  let imageUrl = "/Hidagyu.jpg";
  const [title, setTitle] = useState("");
  const [resto, setResto] = useState("");
  const [currency, setCurrency] = useState("HKD");
  const [price, setPrice] = useState("");
  const [parts, setParts] = useState("");
  const [cooked, setCooked] = useState("");
  const [starRating, setStarRating] = useState(3);
  const [hover, setHover] = useState(null);
  const [melts, setMelts] = useState(0);
  const [tender, setTender] = useState(0);
  const [juicy, setJuicy] = useState(0);
  const [chewy, setChewy] = useState(0);
  const [thick, setThick] = useState(0);
  const [rich, setRich] = useState(0);
  const [description, setDescription] = useState("");
  const [allRatings, setAllRatings] = useState([
    melts,
    tender,
    juicy,
    chewy,
    thick,
    rich,
  ]);

  useEffect(() => {
    setAllRatings([melts, tender, juicy, chewy, thick, rich]);
  }, [melts, tender, juicy, chewy, thick, rich]);
  // const allRatings = [
  //   melts,
  //   tender,
  //   juicy,
  //   chewy,
  //   thick,
  //   rich,
  //   // Number.parseInt(melts),
  //   // Number.parseInt(tender),
  //   // Number.parseInt(juicy),
  //   // Number.parseInt(chewy),
  //   // Number.parseInt(thick),
  //   // Number.parseInt(rich),
  // ];

  return (
    <div className={styles.meatInfoContainer}>
      <div className={styles.meatInfo__input}>
        <form id="inputForm">
          <div className={styles.input__basicInfo}>
            <div className={styles.input__basicInfoHeader}>
              Basic Information
            </div>
            <ImageUpload />
            <div className={styles.input__title}>
              Title:
              <br />
              <input
                id="input__title"
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
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
                  // className={form - select}
                  id="input__price--currency"
                  onChange={(e) => {
                    setCurrency(e.target.value);
                  }}
                >
                  {/* <option value="">currency</option> */}
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
              <div className={styles.input__parts}>
                Part of Beef:
                <br />
                <select
                  id="input__parts"
                  onChange={(e) => {
                    setParts(e.target.value);
                  }}
                >
                  <option value="Rib Eye 肋眼">Rib Eye 肋眼</option>
                  <option value="Strip 紐約客">Strip 紐約客</option>
                  <option value="Tenderloin 菲力">Tenderloin 菲力</option>
                  <option value="Knuckle 臀肉">Knuckle 臀肉</option>
                  <option value="Shank 腿肉">Shank 腿肉</option>

                  {/* <option value="Chuck Flap">Chuck Flap 翼板</option>
                <option value="Top Blade Muscle">Top Blade Muscle 板腱</option>

                <option value="Short Ribs">Short Ribs 牛小排</option>
                <option value="Rib Fingers">Rib Fingers 牛肋條</option>

                <option value="Short Plate">Short Plate 胸腹</option>
                <option value="Sirloin">Sirloin 後腰脊</option>
                <option value="Flank">Flank 腹</option>
                 */}
                </select>
              </div>
              <div className={styles.input__cooked}>
                Steak Doneness:
                <br />
                <select
                  id="input__cooked"
                  onChange={(e) => {
                    setCooked(e.target.value);
                  }}
                >
                  <option value="Rare">Rare</option>
                  <option value="Medium-rare">Medium-rare</option>
                  <option value="Medium">Medium</option>
                  <option value="Medium-well">Medium-well</option>
                  <option value="Well-done">Well-done</option>
                </select>
              </div>
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
                        size={17}
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
          </div>
          <div className={styles.input__radarChart}>
            <div className={styles.input__radarChartHeader}>
              Rate your Steak
            </div>
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
                {/* <input
                id="input__tender"
                type="number"
                max="10"
                placeholder="10 points max"
                onChange={(e) => {
                  setTender(e.target.value);
                }}
              /> */}
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
              <div className={styles.input__melts}>
                Melt in the mouth:
                <br />
                <select
                  onChange={(e) => {
                    setMelts(e.target.value);
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
              Description:
              <br />
              <textarea
                id="input__description"
                // type="textarea"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
        </form>
      </div>

      <div className={styles.meatInfo__outputContainer}>
        <div className={styles.meatInfo__output}>
          <div className={styles.output__mainInfoAndRadar}>
            <div className={styles.output__mainInfo}>
              <div className={styles.output__image}>
                <Image src={imageUrl} fill alt="Meat Image" />
              </div>
              <div className={styles.output__textInfo}>
                <div className={styles.output__title}>
                  <span>{title}</span>
                </div>
                <div className={styles.output__resto}>
                  {/* <IoRestaurantOutline /> */}
                  <GrRestaurant />
                  <span>{resto}</span>
                </div>
                <div className={styles.output__price}>
                  <MdOutlinePriceChange />
                  <span>
                    {currency} {price}
                  </span>
                </div>
                <div className={styles.output__parts}>
                  <LuBeef />
                  <span>{parts}</span>
                </div>
                <div className={styles.output__cooked}>
                  <PiFireBold />
                  <span>{cooked}</span>
                </div>
                <div className={styles.output__starRating}>
                  {[...Array(5)].map((star, index) => {
                    const rating = index + 1;

                    return (
                      <FaRegStar
                        className={styles.starDisplay}
                        size={20}
                        color={
                          rating <= starRating ? "white" : "rgb(114, 17, 17)"
                        }
                      />
                    );
                  })}
                  <span>{starRating} of 5</span>
                </div>
              </div>
            </div>
            <div className={styles.output__radarChart}>
              <RadarChart allRatings={allRatings} />
            </div>
          </div>

          <div className={styles.output__description}>{description}</div>
        </div>
      </div>
    </div>
  );
}
