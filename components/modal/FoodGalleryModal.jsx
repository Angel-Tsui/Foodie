"use client";
import styles from "./modal.module.css";
import { useState } from "react";
import FoodGallery from "../foodGallery/foodGallery";
import { deleteDataById } from "../../firebase/firestore";
import { IoOpenOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { TfiDownload } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";
import { downloadOutput } from "../../util/export";
import { FiEdit3 } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { signInOrSignOut } from "../../firebase/verify";

export default function FoodGalleryModal(action) {
  // console.log("action", action);
  // console.log("id", action.action.fullSetData);
  // console.log("fullsetData", action.fullSetData);
  const [modal, setModal] = useState(false);
  // console.log("modal", modal);

  let toDo = action.action;

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
          setGetCollector={action.setGetCollector}
          nextStep={action.nextStep}
          triggerModal={foodGalleryOpenModal}
          setMarkerPosition={action.setMarkerPosition}
          setPlaceInfo={action.setPlaceInfo}
          setPlaceInfoRestoName={action.setPlaceInfoRestoName}
        />
      )}

      {/* Collection Page FoodGallery Display Preview Button */}
      {toDo == "collectionPreview" && (
        <FoodGallery
          fullSetData={action.fullSetData}
          pop={action.pop}
          setGetCollector={action.setGetCollector}
          triggerModal={foodGalleryOpenModal}
          getCardId={setCardId}
          getCardName={setCardName}
          nextStep={action.nextStep}
          previewUser={action.previewUser}
        />
      )}

      {/* Open Modals */}
      {modal && (
        <div className={styles.modal}>
          <div className={styles.modal__overlay}>
            <div className={styles.modal__content}>
              <div className={styles.modal__closeButton}>
                <RxCross2
                  onClick={() => {
                    setModal(!modal);
                    action = "";
                  }}
                />
              </div>
              {/* Home Page FoodGallery Output Display Modal Content */}
              {action.output != "" && (
                <div className={styles.modal__outputImageContainer}>
                  <div className={styles.modal__outputImage}>
                    <img
                      src={action.output}
                      className={styles.modal__outputImage}
                    />
                  </div>
                  {/* Home Page Redirect to collector */}
                  {action.nextStep == "viewCollector" && (
                    <div className={styles.furtherAction}>
                      {signInOrSignOut() ? (
                        <div
                          className={styles.viewCollectorBtn}
                          onClick={() => {
                            window.open(
                              `/collection?prevUser=${action.getCollector.collectorId}`
                            );
                          }}
                        >
                          <CgProfile />
                          BY {action.getCollector.collectorName}{" "}
                        </div>
                      ) : (
                        <div className={styles.viewCollectorBtn__inactive}>
                          <CgProfile />
                          BY {action.getCollector.collectorName}. SIGN IN TO
                          VIEW ALL COLLECTIONS
                        </div>
                      )}
                    </div>
                  )}
                  {/* Collection Page FoodGallery Output Display Modal Additional Content */}
                  {action.nextStep == "collectionPreview" ||
                    (action.nextStep == "allowFurtherAction" && (
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
                          className={styles.exportBtn}
                          onClick={() => {
                            downloadOutput(action.output, cardName);
                          }}
                        >
                          Export
                          <TfiDownload />
                        </div>
                        {/* <div
                        className={styles.editBtn}
                        onClick={() => {
                          window.open("/output/" + cardId);
                        }}
                      >
                        To New Tab
                        <IoOpenOutline />
                      </div> */}
                        <div
                          className={styles.editBtn}
                          onClick={() => {
                            window.open("/record/" + cardId);
                          }}
                        >
                          Edit
                          <FiEdit3 />
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
