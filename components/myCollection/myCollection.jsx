import styles from "./myCollection.module.css";
import Image from "next/image";

export default function MyCollection() {
  return (
    <div className={styles.myCollectionContainer}>
      <div className={styles.myIconContainer}>
        <div className={styles.myIcon}>
          <Image src="/profile.jpg" width={50} height={50} alt="icon" />
        </div>
      </div>
      <div className={styles.myCollection}>MY COLLECTION</div>
    </div>
  );
}
