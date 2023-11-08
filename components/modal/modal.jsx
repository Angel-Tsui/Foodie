"use client";
import styles from "./modal.module.css";
import createstyles from "../../src/app/collection/collection.module.css";
import { useState } from "react";

export default function Modal(action) {
  console.log(action);
  const [modal, setModal] = useState(false);

  function toggleModal() {
    console.log("open modal");
    setModal(!modal);
  }
  {
    action == "createCard" && (
      <>
        {modal && (
          <div className={styles.modal}>
            <div className={styles.modal__overlay}>
              <div className={styles.modal__content}>
                <div className={styles.modal__title}>Let's get Started</div>
                <div
                  className={styles.modal__closeButton}
                  onClick={toggleModal}
                >
                  X
                </div>
                <form className={styles.modal__form}>
                  <input type="text" placeholder="Title" />
                  <input type="text" placeholder="Restaurant Name" />
                  <input type="text" placeholder="Price" />
                  <input type="text" placeholder="Parts of Beef" />
                  <div
                    className={styles.modal__createButton}
                    onClick={() => {
                      window.location.href = "/canvas";
                    }}
                  >
                    Create Design
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
