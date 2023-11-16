import styles from "./foodGallery.module.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

function FoodGalleryCard(data) {
  // console.log("Food Gallery data", data);
  return (
    <div className={styles.foodGallery__card} id={data.id} key={data.id}>
      <div className={styles.foodGallery__image}>
        <img src={data.imageUrl} />
        {/* <Image src={data.imageUrl} width={325} height={200} alt="Meat Image" /> */}
      </div>
      <div className={styles.foodGallery__title}>{data.name}</div>
      <div className={styles.foodGallery__resto}>{data.resto}</div>
      <div className={styles.foodGallery__starRate}>
        {/* {data.starRating} */}
        {/* <div className={styles.output__starRating}> */}
        {[...Array(5)].map((star, index) => {
          const rating = index + 1;

          return (
            <FaStar
              // className={styles.starDisplay}
              key={index}
              size={15}
              color={rating <= data.starRating ? "white" : "rgb(114, 113, 113)"}
            />
          );
        })}
        <span key={data.starRating}></span>
      </div>
      {/* </div> */}

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
  // console.log("foodGallery main", props);
  let allData = props.fullSetData;
  // console.log("fullSetData", allData);
  let action = props.action;
  // console.log("FoodGallery main", action);

  return (
    <>
      {allData.map((data) => (
        <div
          onClick={() => {
            {
              action == "redirect"
                ? (window.location.href = "/record/" + data.id)
                : console.log("open modal");
            }
          }}
        >
          {FoodGalleryCard(data)}
        </div>
      ))}
    </>
  );
}
