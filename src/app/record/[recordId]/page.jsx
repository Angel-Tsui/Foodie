"use client";
import styles from "../record.module.css";
import { useState, useEffect } from "react";
import InputOptions from "../../../../assets/inputOptions/Options.json";
import handleUploadImage from "../../../../components/radarChart/imageUpload";
import { uploadOutputImage } from "../../../../components/radarChart/imageUpload";
import { FaStar } from "react-icons/fa";
import DisplayData from "../displayData";
import {
  getSingleRecordData,
  setRecord,
  deleteDataById,
  outputFile,
  getOnlyOutputImage,
} from "../../../../firebase/firestore";
import {
  verify,
  getUserInfoFromToken,
  confirmUser,
} from "../../../../firebase/verify";
// import { DocumentReference, doc } from "firebase/firestore";
import * as htmlToImage from "html-to-image";
// import { saveAs } from "file-saver";
import { AiOutlineDelete } from "react-icons/ai";
import { TfiDownload } from "react-icons/tfi";
import { AiOutlineSave } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";
import { downloadOutput } from "../../../../util/export";
import Map from "../../../../components/map/map";

export default function Record(recordId) {
  let SingleRecordid = recordId.params.recordId;

  const [userId, setUserId] = useState("");
  // console.log("computer user", userId);
  // const [docOwnerId, setDocOwnerId] = useState("")
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [resto, setResto] = useState("");
  // console.log("after set", resto);
  const [gotAddress, setGotAddress] = useState("");
  // console.log("address", gotAddress);
  const [latlng, setLatlng] = useState({});
  // console.log(latlng);
  const [currency, setCurrency] = useState("HKD");
  const [price, setPrice] = useState(0);
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
  const [isSaved, setIsSaved] = useState(
    <div className={styles.saveBtnInner}>
      Save <AiOutlineSave />
    </div>
  );
  const [output, setOutput] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 22.278, lng: 114.182 });

  // Initialize Page and Data
  useEffect(() => {
    verify();

    let userInfo = getUserInfoFromToken();
    let user = userInfo.userId;
    setUserId(user);

    getSingleRecordData(SingleRecordid).then((recordData) => {
      if (recordData) {
        let docOwnerId = recordData.userId;
        if (docOwnerId != user) {
          window.location.href = "/";
        }
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
      }
    });
  }, []);

  useEffect(() => {
    setAllRatings([fat, tender, juicy, chewy, thick, rich]);
  }, [fat, tender, juicy, chewy, thick, rich]);

  const [allData, setAllData] = useState({
    image: image,
    imageUrl: imageUrl,
    name: name,
    resto: resto,
    latlng: latlng,
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
      latlng: latlng,
      currency: currency,
      price: price,
      parts: parts,
      cusine: cusine,
      cooked: cooked,
      starRating: starRating,
      description: description,
    });
    setIsSaved(
      <div className={styles.saveBtnInner}>
        Save <AiOutlineSave />
      </div>
    );
    setOutput("");
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

  // useEffect(() => {
  //   let userInfo = getUserInfoFromToken();
  //   let user = userInfo.userId;
  //   setUserId(user);
  // });

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(userId);
    if (imageUrl == "") {
      setIsSaved("Please Upload Image");
    } else if (name == "") {
      setIsSaved("Please Set Name of Dish");
    } else if (resto == "") {
      setIsSaved("Please Set Restaurant Name");
    } else if (gotAddress == "") {
      setIsSaved("Please Confirm Restaurant Name");
    } else if (price == 0) {
      setIsSaved("Please Set Price");
    } else if (parts == "") {
      setIsSaved("Please Set Parts");
    } else if (starRating == "") {
      setIsSaved("Please Rating Overall");
    } else {
      setRecord(
        SingleRecordid,
        imageUrl,
        name,
        resto,
        latlng,
        currency,
        price,
        parts,
        cusine,
        cooked,
        starRating,
        allRatings,
        description,
        userId
      )
        .then(() => {
          htmlToImage
            .toPng(document.querySelector("#output__toPNG"))
            .then(async (dataUrl) => {
              // console.log("output image", dataUrl);
              // let cleanOutputImageUrl = dataUrl.substring(22);
              // console.log("clean", cleanOutputImageUrl);
              const firebaseOutput = await uploadOutputImage(dataUrl);
              // console.log("firebaseOutput", firebaseOutput);
              setOutput(firebaseOutput);
              outputFile(SingleRecordid, firebaseOutput, userId);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .then(() => {
          // console.log("success");
          setIsSaved(<div className={styles.loader}></div>);
          setTimeout(() => {
            setIsSaved(
              <div className={styles.saveBtnInner}>
                Saved <AiFillSave />
              </div>
            );
          }, 1500);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
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
              <div className={styles.input__image}>
                <input
                  type="file"
                  id="input__image"
                  onChange={(e) => {
                    // console.log("image", e.target.files[0]);
                    setImage(e.target.files[0]);
                  }}
                />
                {image != "" ? (
                  <span
                    className={styles.uploads}
                    id="uploadImage"
                    onClick={async (e) => {
                      // console.log("upload image", image);
                      const genurl = await handleUploadImage(e, image);
                      setImageUrl(genurl);
                      setImage("");
                    }}
                  >
                    Upload
                  </span>
                ) : (
                  <span></span>
                )}
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
                  {InputOptions.parts.map((part) => (
                    <option id={part} key={part} value={part}>
                      {part}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.input__cusine}>
                Cuisine:
                <br />
                <select
                  value={cusine}
                  onChange={(e) => {
                    setCuisine(e.target.value);
                  }}
                >
                  <option>Please Select</option>
                  {InputOptions.cusine.map((cus) => (
                    <option id={cus} key={cus} value={cus}>
                      {cus}
                    </option>
                  ))}
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
                  <div id="map" key="map">
                    <Map
                      mapCenter={mapCenter}
                      setGotAddress={setGotAddress}
                      setResto={setResto}
                      setLatlng={setLatlng}
                    />
                  </div>
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
                    {InputOptions.currency.map((cur) => (
                      <option id={cur} key={cur} value={cur}>
                        {cur}
                      </option>
                    ))}
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
                    {InputOptions.doneness.map((done) => (
                      <option id={done} key={done} value={done}>
                        {done}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.input__radarChart}>
              <div className={styles.input__radarChartHeader}>
                Rate your Dish
              </div>
              <div className={styles.input__radarChartItems} key="Fat">
                <div className={styles.input__fat}>
                  Fat Ratio:
                  <br />
                  <select
                    key="fat"
                    value={allRatings[0]}
                    onChange={(e) => {
                      setFat(e.target.value);
                    }}
                  >
                    {[...Array(11)].map((each, index) => (
                      <option value={index} key={`Fat${index}`}>
                        {index}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.input__tender} key="Tender">
                  Tender:
                  <br />
                  <select
                    key="tender"
                    value={allRatings[1]}
                    onChange={(e) => {
                      setTender(e.target.value);
                    }}
                  >
                    {[...Array(11)].map((each, index) => (
                      <option value={index} key={`Tender${index}`}>
                        {index}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.input__juicy} key="Juicy">
                  Juicy:
                  <br />
                  <select
                    key="juicy"
                    value={allRatings[2]}
                    onChange={(e) => {
                      setJuicy(e.target.value);
                    }}
                  >
                    {[...Array(11)].map((each, index) => (
                      <option value={index} key={`Juicy${index}`}>
                        {index}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.input__chewy} key="Chewy">
                  Chewy:
                  <br />
                  <select
                    key="chewy"
                    value={allRatings[3]}
                    onChange={(e) => {
                      setChewy(e.target.value);
                    }}
                  >
                    {[...Array(11)].map((each, index) => (
                      <option value={index} key={`Chewy${index}`}>
                        {index}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.input__thick} key="Thick">
                  Thick:
                  <br />
                  <select
                    key="thick"
                    value={allRatings[4]}
                    onChange={(e) => {
                      setThick(e.target.value);
                    }}
                  >
                    {[...Array(11)].map((each, index) => (
                      <option value={index} key={`Thick${index}`}>
                        {index}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.input__rich} key="Rich">
                  Rich:
                  <br />
                  <select
                    key="rich"
                    value={allRatings[5]}
                    onChange={(e) => {
                      setRich(e.target.value);
                    }}
                  >
                    {[...Array(11)].map((each, index) => (
                      <option value={index} key={`Rich${index}`}>
                        {index}
                      </option>
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
                        key={index}
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
              }}
            >
              {isSaved}
            </div>
            {output != "" && (
              <div
                className={styles.saveButton}
                type="submit"
                onClick={async (e) => {
                  e.preventDefault();
                  downloadOutput(output, name);
                }}
              >
                Export to PNG
                <TfiDownload />
              </div>
            )}
          </form>

          <div
            className={styles.delete}
            onClick={(e) => {
              e.preventDefault();
              deleteDataById(SingleRecordid);
            }}
          >
            Delete Collection
            <AiOutlineDelete />
          </div>
        </div>

        <div className={styles.meatInfo__outputContainer}>
          <DisplayData allData={allData} allRatings={allRatings} />
        </div>
      </div>
    </>
  );
}
