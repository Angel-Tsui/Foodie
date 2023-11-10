"use client";
import styles from "./meatInfo.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import RadarChart from "../../../components/radarChart/radarChart";
import ImageUpload from "../../../components/radarChart/imageUpload";
import { GrRestaurant } from "react-icons/gr";
import { MdOutlinePriceChange } from "react-icons/md";
import { LuBeef } from "react-icons/lu";

export default function meatInfo() {
  let imageUrl = "/Hidagyu.jpg";
  const [title, setTitle] = useState("");
  const [resto, setResto] = useState("");
  const [starRating, setStarRating] = useState("");
  const [currency, setCurrency] = useState("HKD");
  const [price, setPrice] = useState("");
  const [parts, setParts] = useState("");
  const [melts, setMelts] = useState(0);
  const [tender, setTender] = useState(0);
  const [juicy, setJuicy] = useState(0);
  const [chewy, setChewy] = useState(0);
  const [thick, setThick] = useState(0);
  const [marble, setMarble] = useState(0);
  const [description, setDescription] = useState("");
  const allRatings = [
    Number.parseInt(melts),
    Number.parseInt(tender),
    Number.parseInt(juicy),
    Number.parseInt(chewy),
    Number.parseInt(thick),
    Number.parseInt(marble),
  ];

  return (
    <div className={styles.meatInfoContainer}>
      <div className={styles.meatInfo__input}>
        <form id="inputForm">
          <ImageUpload />
          <div className={styles.input__title}>
            Title:
            <input
              id="input__title"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <div className={styles.input__resto}>
              Restaurant Name:
              <input
                id="input__resto"
                type="text"
                onChange={(e) => {
                  setResto(e.target.value);
                }}
              />
            </div>
            <div>
              Star Rating:
              <input
                id="input__starRating"
                type="text"
                max="5"
                placeholder="5 stars max"
                onChange={(e) => {
                  setStarRating(e.target.value);
                }}
              />
            </div>
            <div className={styles.input__price}>
              Price:
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
              <input
                id="input__parts"
                type="text"
                onChange={(e) => {
                  setParts(e.target.value);
                }}
              />
            </div>
            <div className={styles.input__melts}>
              Melts in your mouth:
              <input
                id="input__melts"
                type="number"
                max="10"
                placeholder="10 points max"
                onChange={(e) => {
                  setMelts(e.target.value);
                }}
              />
            </div>
            <div className={styles.input__tender}>
              Tender:
              <input
                id="input__tender"
                type="number"
                max="10"
                placeholder="10 points max"
                onChange={(e) => {
                  setTender(e.target.value);
                }}
              />
            </div>
            <div className={styles.input__juicy}>
              Juicy:
              <input
                id="input__juicy"
                type="number"
                max="10"
                placeholder="10 points max"
                onChange={(e) => {
                  setJuicy(e.target.value);
                }}
              />
            </div>
            <div className={styles.input__chewy}>
              Chewy:
              <input
                id="input__chewy"
                type="number"
                max="10"
                placeholder="10 points max"
                onChange={(e) => {
                  setChewy(e.target.value);
                }}
              />
            </div>
            <div className={styles.input__thick}>
              Thick:
              <input
                id="input__thick"
                type="number"
                max="10"
                placeholder="10 points max"
                onChange={(e) => {
                  setThick(e.target.value);
                }}
              />
            </div>
            <div className={styles.input__marble}>
              Marble:
              <input
                id="input__marble"
                type="number"
                max="10"
                placeholder="10 points max"
                onChange={(e) => {
                  setMarble(e.target.value);
                }}
              />
            </div>
            <div className={styles.input__description}>
              Description:
              <input
                id="input__description"
                type="textarea"
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
                <Image src={imageUrl} fill alt="Hidagyu Image" />
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
                <div className={styles.output__starRating}>
                  <span>{starRating}</span>
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
