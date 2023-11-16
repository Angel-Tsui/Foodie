"use client";
import styles from "../record.module.css";
import { useState, useEffect } from "react";
import handleUploadImage from "../../../../components/radarChart/imageUpload";
import { FaStar } from "react-icons/fa";
import DisplayData from "../displayData";
import { getSingleRecordData, setRecord } from "../../../../firebase/firestore";
import { verify, getUserInfoFromToken } from "../../../../firebase/verify";

export default function Record(recordId) {
  let SingleRecordid = recordId.params.recordId;

  // Initialize Page and Data
  useEffect(() => {
    verify();
    getSingleRecordData(SingleRecordid).then((recordData) => {
      // console.log("recordData", recordData);
      setImageUrl(recordData.imageUrl);
      setName(recordData.name);
      setResto(recordData.resto);
      setCurrency(recordData.currency);
      setPrice(recordData.price);
      setParts(recordData.parts);
      setCuisine(recordData.cusine);
      setCooked(recordData.cooked);
      setStarRating(recordData.starRating);
      setFat(recordData.allRatings[0]);
      setTender(recordData.allRatings[1]);
      setJuicy(recordData.allRatings[2]);
      setChewy(recordData.allRatings[3]);
      setThick(recordData.allRatings[4]);
      setRich(recordData.allRatings[5]);
      setDescription(recordData.description);
    });
  }, []);

  const [userId, setUserId] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [resto, setResto] = useState("");
  const [currency, setCurrency] = useState("HKD");
  const [price, setPrice] = useState("");
  const [parts, setParts] = useState("");
  const [cusine, setCuisine] = useState("");
  const [cooked, setCooked] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [fat, setFat] = useState(0);
  const [tender, setTender] = useState(0);
  const [juicy, setJuicy] = useState(0);
  const [chewy, setChewy] = useState(0);
  const [thick, setThick] = useState(0);
  const [rich, setRich] = useState(0);
  const [description, setDescription] = useState("");
  const [allRatings, setAllRatings] = useState([
    fat,
    tender,
    juicy,
    chewy,
    thick,
    rich,
  ]);
  const [isSaved, setIsSaved] = useState(<div>Save</div>);

  useEffect(() => {
    setAllRatings([fat, tender, juicy, chewy, thick, rich]);
  }, [fat, tender, juicy, chewy, thick, rich]);

  const [allData, setAllData] = useState({
    image: image,
    imageUrl: imageUrl,
    name: name,
    resto: resto,
    currency: currency,
    price: price,
    parts: parts,
    cusine: cusine,
    cooked: cooked,
    starRating: starRating,
    description: description,
  });

  useEffect(() => {
    setAllData({
      image: image,
      imageUrl: imageUrl,
      name: name,
      resto: resto,
      currency: currency,
      price: price,
      parts: parts,
      cusine: cusine,
      cooked: cooked,
      starRating: starRating,
      description: description,
    });
    setIsSaved(<div>Save</div>);
  }, [
    imageUrl,
    name,
    resto,
    currency,
    price,
    parts,
    cusine,
    cooked,
    starRating,
    description,
  ]);

  useEffect(() => {
    let userInfo = getUserInfoFromToken();
    let user = userInfo.userId;
    setUserId(user);
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(userId);

    setRecord(
      SingleRecordid,
      imageUrl,
      name,
      resto,
      currency,
      price,
      parts,
      cusine,
      cooked,
      starRating,
      allRatings,
      description,
      userId
    );
  };

  return (
    <>
      <div className={styles.meatInfoContainer}>
        <div className={styles.meatInfo__input}>
          <form id="inputForm">
            <div className={styles.input__basicInfo}>
              <div className={styles.input__basicInfoHeader}>
                Basic Information
              </div>
              <div>
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
                <button
                  onClick={async (e) => {
                    const genurl = await handleUploadImage(e, image);
                    setImageUrl(genurl);
                  }}
                >
                  Upload
                </button>
              </div>
              <div className={styles.input__parts}>
                Part of Beef:
                <br />
                <select
                  id="input__parts"
                  value={parts}
                  onChange={(e) => {
                    setParts(e.target.value);
                  }}
                >
                  <option>Please Select</option>
                  <option value="Tongue">Tongue</option>
                  <option value="Fillet">Fillet</option>
                  <option value="Short Ribs">Short Ribs</option>
                  <option value="Rib Finger">Ribs</option>
                  <option value="Prime Rib">Prime Rib</option>
                  <option value="Angus Rib Eye">Angus Rib Eye</option>
                  <option value="Rib Eye">Rib Eye</option>
                  <option value="Strip">Strip</option>
                  <option value="Tenderloin">Tenderloin</option>
                  <option value="Knuckle">Knuckle</option>
                  <option value="Shank">Shank</option>
                  <option value="Tendon">Tendon</option>
                  <option value="Brisket">Brisket</option>
                  <option value="Ox Tail">Ox Tail</option>
                </select>
              </div>
              <div className={styles.input__cusine}>
                Cusine:
                <br />
                <select
                  value={cusine}
                  onChange={(e) => {
                    setCuisine(e.target.value);
                  }}
                >
                  <option>Please Select</option>
                  <option value="Western">Western</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Koren</option>
                  <option value="Chinese">Chinese</option>
                </select>
              </div>
              <div className={styles.input__name}>
                Name of Dish:
                <br />
                <input
                  id="input__name"
                  value={name}
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <div className={styles.input__resto}>
                  Restaurant Name:
                  <br />
                  <input
                    id="input__resto"
                    value={resto}
                    type="text"
                    onChange={(e) => {
                      setResto(e.target.value);
                    }}
                  />
                </div>
                <div className={styles.input__price}>
                  Price:
                  <br />
                  <select
                    id="input__price--currency"
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value);
                    }}
                  >
                    <option value="HKD">HKD</option>
                    <option value="JPY">JPY</option>
                    <option value="TWD">TWD</option>
                    <option value="USD">USD</option>
                  </select>
                  <input
                    id="input__price"
                    value={price}
                    type="number"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div className={styles.input__cooked}>
                  Doneness:
                  <br />
                  <select
                    value={cooked}
                    id="input__cooked"
                    onChange={(e) => {
                      setCooked(e.target.value);
                    }}
                  >
                    <option>Please Select</option>
                    <option value="Rare">Rare</option>
                    <option value="Medium-rare">Medium-rare</option>
                    <option value="Medium">Medium</option>
                    <option value="Medium-well">Medium-well</option>
                    <option value="Well-done">Well-done</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.input__radarChart}>
              <div className={styles.input__radarChartHeader}>
                Rate your Dish
              </div>
              <div className={styles.input__radarChartItems}>
                <div className={styles.input__tender}>
                  Tender:
                  <br />
                  <select
                    value={allRatings[1]}
                    onChange={(e) => {
                      setTender(e.target.value);
                    }}
                  >
                    {[...Array(11)].map((each, index) => (
                      <option value={index}>{index}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.input__juicy}>
                  Juicy:
                  <br />
                  <select
                    value={allRatings[2]}
                    onChange={(e) => {
                      setJuicy(e.target.value);
                    }}
                  >
                    {[...Array(11)].map((each, index) => (
                      <option value={index}>{index}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.input__chewy}>
                  Chewy:
                  <br />
                  <select
                    value={allRatings[3]}
                    onChange={(e) => {
                      setChewy(e.target.value);
                    }}
                  >
                    {[...Array(11)].map((each, index) => (
                      <option value={index}>{index}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.input__thick}>
                  Thick:
                  <br />
                  <select
                    value={allRatings[4]}
                    onChange={(e) => {
                      setThick(e.target.value);
                    }}
                  >
                    {[...Array(11)].map((each, index) => (
                      <option value={index}>{index}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.input__rich}>
                  Rich:
                  <br />
                  <select
                    value={allRatings[5]}
                    onChange={(e) => {
                      setRich(e.target.value);
                    }}
                  >
                    {[...Array(11)].map((each, index) => (
                      <option value={index}>{index}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.input__fat}>
                  Fat Ratio:
                  <br />
                  <select
                    value={allRatings[0]}
                    onChange={(e) => {
                      setFat(e.target.value);
                    }}
                  >
                    {[...Array(11)].map((each, index) => (
                      <option value={index}>{index}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.input__descriptionContainer}>
              <div className={styles.input__descriptionHeader}>
                Description (Optional)
              </div>
              <div className={styles.input__description}>
                Description / Comments / Remarks:
                <br />
                <br />
                <div>Food for thought:</div>
                <ul>
                  <li>Anything special about the dish</li>
                  <li>Would you recommand it to family / elderly / others</li>
                  <li>Future remarks</li>
                </ul>
                <br />
                <textarea
                  id="input__description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={styles.input__starRatingContainer}>
              <div className={styles.input__starRatingHeader}>
                Overall Rating
              </div>
              <div className={styles.input__starRating}>
                Overall Rating:
                <br />
                {[...Array(5)].map((star, index) => {
                  const rating = index + 1;

                  return (
                    <label>
                      <input
                        type="radio"
                        id="input__starRating"
                        value={rating}
                        onClick={() => {
                          setStarRating(rating);
                        }}
                      />
                      <FaStar
                        className={styles.star}
                        size={30}
                        color={
                          rating <= (hover || starRating)
                            ? "rgb(114, 17, 17)"
                            : "rgb(219, 218, 218)"
                        }
                        onMouseEnter={() => {
                          setHover(rating);
                        }}
                        onMouseLeave={() => {
                          setHover(null);
                        }}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div
              className={styles.saveButton}
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
                // setIsClicked(!isClicked);
                setIsSaved(<div className={styles.loader}></div>);
                setTimeout(() => {
                  setIsSaved(<div>Saved</div>);
                }, 1500);
              }}
            >
              {isSaved}
            </div>
          </form>
        </div>

        <div className={styles.meatInfo__outputContainer}>
          <DisplayData allData={allData} allRatings={allRatings} />
        </div>
      </div>
    </>
  );
}
