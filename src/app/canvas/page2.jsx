"use client";
import styles from "./canvas.module.css";
import { PiTextTBold } from "react-icons/pi";
import { PiUploadSimpleBold } from "react-icons/pi";
import { verify } from "../../../firebase/verify";

function FunctionalPanel() {
  return (
    <div className={styles.canvasContainer__functionPanel}>
      <div className={styles.functionPanel__functionOverview}>
        <div className={styles.functionOverview__eachFunction}>
          <PiTextTBold className={styles.functionOverview__eachIcon} />
          <div className={styles.functionOverview__eachText}>Text</div>
        </div>
        <div className={styles.functionOverview__eachFunction}>
          <PiUploadSimpleBold className={styles.functionOverview__eachIcon} />
          <div className={styles.functionOverview__eachText}>Uploads</div>
        </div>
      </div>
      <div className={styles.functionPanel__functionUse}></div>
    </div>
  );
}

function CanvasContainer() {
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

export default function Canvas() {
  verify();
  return (
    <div className={styles.canvasContainer}>
      <FunctionalPanel />
      <CanvasContainer />
    </div>
  );
}
