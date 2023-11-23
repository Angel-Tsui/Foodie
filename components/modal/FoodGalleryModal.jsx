"use client";
import styles from "./modal.module.css";
import { useState } from "react";
import FoodGallery from "../foodGallery/foodGallery";
import { deleteDataById } from "../../firebase/firestore";
import { IoOpenOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { TfiDownload } from "react-icons/tfi";
import { downloadOutput } from "../../util/export";

export default function FoodGalleryModal(action) {
  // console.log("action", action.nextStep);
  // console.log("id", action.action.fullSetData);
  // console.log("fullsetData", action.fullSetData);
  const [modal, setModal] = useState(false);
  // console.log("modal", modal);

  let toDo = action.action;
  // console.log("toDo", toDo);

  // Search Bar Filter Functions

  // Home Page FoodGallery Functions
  const foodGalleryOpenModal = () => {
    setModal(true);
  };

  // Collection Page FoodGallery Functions
  const [cardId, setCardId] = useState("");
  const [cardName, setCardName] = useState("");

  return (
    <>
      {/* Home Page FoodGallery Display Card Button */}
      {toDo == "displayOutput" && (
        <FoodGallery
          fullSetData={action.fullSetData}
          pop={action.pop}
          triggerModal={foodGalleryOpenModal}
        />
      )}

      {/* Collection Page FoodGallery Display Preview Button */}
      {toDo == "collectionPreview" && (
        <FoodGallery
          fullSetData={action.fullSetData}
          pop={action.pop}
          triggerModal={foodGalleryOpenModal}
          getCardId={setCardId}
          getCardName={setCardName}
          nextStep={action.nextStep}
        />
      )}

      {/* Open Modals */}
      {modal && (
        <div className={styles.modal}>
          <div className={styles.modal__overlay}>
            <div className={styles.modal__content}>
              <div
                className={styles.modal__closeButton}
                onClick={() => {
                  setModal(!modal);
                  action = "";
                }}
              >
                X
              </div>
              <div className={styles.modal__filter}>
                {/* Home Page FoodGallery Output Display Modal Content */}
                {action.output != "" && (
                  <div className={styles.modal__outputImageContainer}>
                    <img
                      src={action.output}
                      className={styles.modal__outputImage}
                    />
                    {/* Collection Page FoodGallery Output Display Modal Additional Content */}
                    {action.nextStep != undefined && (
                      <div className={styles.furtherAction}>
                        <div
                          className={styles.deleteBtn}
                          onClick={() => {
                            deleteDataById(cardId);
                          }}
                        >
                          Delete
                          <AiOutlineDelete />
                        </div>
                        <div
                          className={styles.downloadBtn}
                          onClick={() => {
                            downloadOutput(action.output, cardName);
                          }}
                        >
                          Export
                          <TfiDownload />
                        </div>
                        <div
                          className={styles.editBtn}
                          onClick={() => {
                            window.open("/record/" + cardId);
                          }}
                        >
                          Edit
                          <IoOpenOutline />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
