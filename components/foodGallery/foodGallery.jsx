"use client";
import styles from "./foodGallery.module.css";
import { FaStar } from "react-icons/fa";
import { getOnlyOutputImage, getUserName } from "../../firebase/firestore";

function FoodGalleryCard(data) {
  return (
    <div className={styles.foodGallery__card} id={data.id} key={data.id}>
      <div className={styles.foodGallery__image}>
        <img src={data.imageUrl} />
      </div>
      <div className={styles.foodGallery__title}>{data.name}</div>
      <div className={styles.foodGallery__resto}>{data.resto}</div>

      <div className={styles.foodGallery__starAndCusine}>
        <div className={styles.foodGallery__starRate}>
          {[...Array(5)].map((star, index) => {
            const rating = index + 1;

            return (
              <FaStar
                key={index}
                size={15}
                color={
                  rating <= data.starRating ? "white" : "rgb(114, 113, 113)"
                }
              />
            );
          })}
          <span key={data.starRating}></span>
        </div>
        <div className={styles.foodGallery__cusine}>{data.cusine}</div>
      </div>

      <div className={styles.foodGallery__priceAndParts}>
        <div className={styles.foodGallery__price}>
          {data.currency} {data.price}
        </div>
        <div className={styles.foodGallery__parts}>{data.parts}</div>
      </div>
    </div>
  );
}

export default function FoodGallery(props) {
  let allData = props.fullSetData;
  let nextStep = props.nextStep;

  return (
    <>
      {allData.map((data) => (
        <div
          id={data.id}
          key={data.id}
          onClick={() => {
            if (props.setMarkerPosition) {
              props.setMarkerPosition(data.latlng);
              props.setPlaceInfo(data.mapInfo);
              props.setPlaceInfoRestoName(data.resto);
            }

            {
              // Display Image on Home FoodCollectionModal
              getOnlyOutputImage(data.id).then((outputFile) => {
                props.pop(outputFile);
                if (props.nextStep == "viewCollector") {
                  getUserName(data.userId, props.setGetCollector);
                } else {
                  {
                    nextStep != null && props.getCardId(data.id);
                  }
                  {
                    nextStep != null && props.getCardName(data.name);
                  }
                }
                props.triggerModal();
              });
            }
          }}
        >
          {FoodGalleryCard(data)}
        </div>
      ))}
    </>
  );
}
