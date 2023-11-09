"use client";
import styles from "./meatInfo.module.css";
import Image from "next/image";
import { useState } from "react";

export default function meatInfo() {
  let imageUrl = "/Hidagyu.jpg";
  const [title, setTitle] = useState("");
  const [resto, setResto] = useState("");
  let starRating = "4.7";
  const [currency, setCurrency] = useState("");
  const [price, setPrice] = useState("");
  const [parts, setParts] = useState("");
  //   let parts = "肩部";
  const [description, setDescription] = useState("");
  //   let description =
  ("台北美福大飯店「晴山日本料理」日籍料理長湯本誠，以經典日式料理詮釋飛驒牛壽喜燒、飛驒牛涮涮鍋等料理，套餐皆包含季節鮮蔬盤與主廚特製甜點，搭配享用讓飛驒牛蘊含著蔬菜甜味與醬汁甜鹹滋味。");
  return (
    <div className={styles.meatInfoContainer}>
      <div className={styles.meatInfo__input}>
        <form id="inputForm">
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
            <div className={styles.input__price}>
              Price:
              <input
                id="input__price--currency"
                type="text"
                placeholder="HKD"
                value="HKD"
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
              />
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
            <div className={styles.input__description}>
              Description:
              <input
                id="input__description"
                type="text"
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
          <div className={styles.output__mainInfo}>
            <div className={styles.output__image}>
              <Image src={imageUrl} fill alt="Hidagyu Image" />
            </div>
            <div className={styles.output__textInfo}>
              <div className={styles.output__title}>
                <span>{title}</span>
              </div>
              <div className={styles.output__resto}>{resto}</div>
              <div className={styles.output__starRating}>{starRating}</div>
              <div className={styles.output__price}>
                {currency}
                {price}
              </div>
              <div className={styles.output__parts}>{parts}</div>
            </div>
          </div>
          <div className={styles.output__graph}></div>
          <div className={styles.output__description}>{description}</div>
        </div>
      </div>
    </div>
  );
}
