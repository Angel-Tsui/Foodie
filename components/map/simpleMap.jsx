import styles from "./map.module.css";

export default function SimpleMap(props) {
  // console.log(props);
  return (
    <>
      {/* <div className={styles.sideInfo__mapInfo}> */}
      <div>{props.mapInfo.address}</div>
      <div>{props.mapInfo.number}</div>
      {props.mapInfo.website != "No Website" && (
        <div>{props.mapInfo.website}</div>
      )}
      {/* </div> */}
    </>
  );
}
