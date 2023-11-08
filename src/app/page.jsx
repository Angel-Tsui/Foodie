import styles from "./page.module.css";
import SearchBar from "../../components/searchBar/searchBar";
import FoodGallery from "../../components/foodGallery/foodGallery";

export default function Home() {
  return (
    <div className={styles.HomePageContainer}>
      <div className={styles.HomePageContainer__general}>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        <div className={styles.foodGalleryContainer}>
          <FoodGallery />
        </div>
      </div>
      <div className={styles.HomePageContainer__signIn}>
      </div>
    </div>
  );
}
