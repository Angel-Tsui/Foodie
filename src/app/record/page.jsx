import styles from "./record.module.css";
import InputForm from "./inputForm";
import DisplayData from "./displayData";

export default function Record() {
  return (
    <>
      <div className={styles.meatInfoContainer}>
        <div className={styles.meatInfo__input}>
          <InputForm />
        </div>

        <div className={styles.meatInfo__outputContainer}>
          <DisplayData />
        </div>
      </div>
    </>
  );
}
