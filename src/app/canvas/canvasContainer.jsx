"use client";
import styles from "./canvas.module.css";
import { verify } from "../../../firebase/verify";

export default function CanvasContainer() {
  verify();
  return (
    <div className={styles.canvasContainer__createSpace}>
      <div className={styles.createSpace__topFunctionRow}></div>
      <div className={styles.createSpace__canvasContainer}>
        <div className={styles.canvasContainer__canvas}></div>
      </div>
      <div className={styles.createSpace__bottomFunctionRow}></div>
    </div>
  );
}
