"use client";
import styles from "../record.module.css";
import { useState, useEffect } from "react";
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

export default function Record(recordId) {
  let SingleRecordid = recordId.params.recordId;

  // Initialize Page and Data
  useEffect(() => {
    verify();

    getSingleRecordData(SingleRecordid).then((recordData) => {
      // console.log("recordData", recordData);
      if (recordData) {
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
    // getOnlyOutputImage(SingleRecordid).then((outputImage) => {
    //   // console.log("current", outputImage);
    //   setOutput(outputImage);
    // });
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
  const [isSaved, setIsSaved] = useState(
    <div className={styles.saveBtnInner}>
      Save <AiOutlineSave />
    </div>
  );
  // const [outputPrev, setOutputPrev] = useState("")
  const [output, setOutput] = useState("");
  // console.log("output", output);

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

  useEffect(() => {
    let userInfo = getUserInfoFromToken();
    let user = userInfo.userId;
    setUserId(user);
  });

  // const downloadOutput = async (output, name) => {
  //   // console.log("downloading", output);
  //   const image = await fetch(output);
  //   console.log("image", image);
  //   const imageBlog = await image.blob();
  //   console.log("imageBlog", imageBlog);
  //   const imageURL = URL.createObjectURL(imageBlog);
  //   console.log("imageURL", imageURL);

  //   const link = document.createElement("a");
  //   link.href = imageURL;
  //   link.download = name;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(userId);
    if (imageUrl == "") {
      setIsSaved("Please Upload Image");
    } else if (name == "") {
      setIsSaved("Please Set Name of Dish");
    } else if (resto == "") {
      setIsSaved("Please Set Restaurant Name");
    } else if (price == "") {
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
                  <option value="Tongue" key="Tongue">
                    Tongue
                  </option>
                  <option value="Fillet" key="Fillet">
                    Fillet
                  </option>
                  <option value="Short Ribs" key="Short Ribs">
                    Short Ribs
                  </option>
                  <option value="Rib Finger" key="Rib Finger">
                    Ribs
                  </option>
                  <option value="Prime Rib" key="Prime Rib">
                    Prime Rib
                  </option>
                  <option value="Rib Eye" key="Rib Eye">
                    Rib Eye
                  </option>
                  <option value="Strip" key="Strip">
                    Strip
                  </option>
                  <option value="Tenderloin" key="Tenderloin">
                    Tenderloin
                  </option>
                  <option value="Knuckle" key="Knuckle">
                    Knuckle
                  </option>
                  <option value="Shank" key="Shank">
                    Shank
                  </option>
                  <option value="Tendon" key="Tendon">
                    Tendon
                  </option>
                  <option value="Brisket" key="Brisket">
                    Brisket
                  </option>
                  <option value="Ox Tail" key="Ox Tail">
                    Ox Tail
                  </option>
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
                  <option value="Western" key="Western">
                    Western
                  </option>
                  <option value="Japanese" key="Japanese">
                    Japanese
                  </option>
                  <option value="Korean" key="Korean">
                    Koren
                  </option>
                  <option value="Chinese" key="Chinese">
                    Chinese
                  </option>
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
                    <option value="HKD" key="HKD">
                      HKD
                    </option>
                    {/* <option value="JPY">JPY</option>
                    <option value="TWD">TWD</option>
                    <option value="USD">USD</option> */}
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
                    <option value="Rare" key="Rare">
                      Rare
                    </option>
                    <option value="Medium-rare" key="Medium-rare">
                      Medium-rare
                    </option>
                    <option value="Medium" key="Medium">
                      Medium
                    </option>
                    <option value="Medium-well" key="Medium-well">
                      Medium-well
                    </option>
                    <option value="Well-done" key="Well-done">
                      Well-done
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.input__radarChart}>
              <div className={styles.input__radarChartHeader}>
                Rate your Dish
              </div>
              <div className={styles.input__radarChartItems}>
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
                      <option value={index} key={`Fat${index}`}>
                        {index}
                      </option>
                    ))}
                  </select>
                </div>
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
                      <option value={index} key={`Tender${index}`}>
                        {index}
                      </option>
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
                      <option value={index} key={`Juicy${index}`}>
                        {index}
                      </option>
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
                      <option value={index} key={`Chewy${index}`}>
                        {index}
                      </option>
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
                      <option value={index} key={`Thick${index}`}>
                        {index}
                      </option>
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
              e.preventDefault()
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
