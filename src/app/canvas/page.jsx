"use client";
import styles from "./canvas.module.css";
import FunctionalPanel from "./functionalPanel";
import dynamic from "next/dynamic";
const CanvasContainer = dynamic(() => import("./canvasContainer"), {
  ssr: false,
});

function LoadCanvas() {
  return <CanvasContainer />;
}
export default function Canvas() {
  return (
    <div className={styles.canvasContainer}>
      <FunctionalPanel />
      <LoadCanvas />
    </div>
  );
}
