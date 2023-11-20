"use client";
import styles from "./foodGallery.module.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import modalStyles from "../modal/modal.module.css";
import { useState } from "react";
import {
  getSingleOutputData,
  getOnlyOutputImage,
} from "../../firebase/firestore";

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

function displayOutputImage(outputId) {
  console.log("got", outputId);

  // setModal(!modal);
  // function toggleModal() {
  //   console.log("open modal");

  // }

  getOnlyOutputImage(outputId).then((outputFile) => {
    // let outputImageUrl = outputFile;
    console.log("img", outputFile);
    return (
      <>
        {/* <div
          className={styles.nav__signUp}
          onClick={() => {
            toggleModal();
            setUserStatus("");
          }}
        >
          SIGN IN
        </div> */}

        {modal && (
          <div className={modalStyles.modal}>
            <div className={modalStyles.modal__overlay}>
              <div className={modalStyles.modal__content}>
                {/* <div className={modalStyles.modal__title}>Sign In</div> */}
                <div
                  className={modalStyles.modal__closeButton}
                  onClick={toggleModal}
                >
                  X
                </div>
                <div className={modalStyles.imageContainer}>
                  <img src={outputFile} className={modalStyles.image} />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  });
}

export default function FoodGallery(props) {
  // console.log("foodGallery main", props);
  let allData = props.fullSetData;
  // console.log("fullSetData", allData);
  let action = props.action;
  // console.log("FoodGallery main", action);
  // const [modal, setModal] = useState(false);
  // console.log("modal status", modal);

  return (
    <>
      {allData.map((data) => (
        <div
          id={data.id}
          key={data.id}
          onClick={() => {
            {
              action == "redirect"
                ? (window.location.href = "/record/" + data.id)
                : console.log("open modal", data.id);
              // window.open("/output/" + data.id);
              // // getOnlyOutputImage(data.id).then(() => {

              // // });

              {
                getOnlyOutputImage(data.id).then((outputFile) => {
                  console.log("img", outputFile);
                  // setModal(true);
                  // function display(modal, outputFile) {
                  //   console.log("in display", modal, outputFile);
                  //   return (
                  //     <div className={modalStyles.modal}>
                  //       <div className={modalStyles.modal__overlay}>
                  //         <div className={modalStyles.modal__content}>
                  //           {/* <div className={modalStyles.modal__title}>Sign In</div> */}
                  //           <div
                  //             className={modalStyles.modal__closeButton}
                  //             onClick={setModal(!modal)}
                  //           >
                  //             X
                  //           </div>
                  //           <div className={modalStyles.imageContainer}>
                  //             <img
                  //               src={outputFile}
                  //               className={modalStyles.image}
                  //             />
                  //           </div>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   );
                  // }
                  // display(modal, outputFile);
                });

                // displayOutputImage(data.id);
              }
            }
          }}
        >
          {FoodGalleryCard(data)}
        </div>
      ))}
    </>
  );
}
