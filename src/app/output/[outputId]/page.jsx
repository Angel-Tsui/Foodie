"use client";
import styles from "../output.module.css";
import { getOnlyOutputImage } from "../../../../firebase/firestore";
import Image from "next/image";

export default function OutputDisplayPage(outputId) {
  let displayOutputId = outputId.params.outputId;
  let outputFile;
  getOnlyOutputImage(displayOutputId).then((outputFile) => {
    console.log("img", outputFile);
    outputFile = outputFile;
  });
  return (
    <>
      <div>Hi</div>
      <div className={styles.outputImageContainer}>
        {/* <Image src={outputFile} width={500} height={500} alt="image" /> */}
        <img src={outputFile} className={styles.outputImage} />
      </div>
    </>
  );
}
