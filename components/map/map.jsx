"use client";
import styles from "../../src/app/page.module.css";
import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Map(props) {
  console.log(props);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  // const [address, setAddress] = useState("");

  // if (address != "") {
  //   console.log(address);
  //   props.officialName(address);
  // }

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: apiKey,
        version: "weekly",
      });
      const { Map } = await loader.importLibrary("maps");
      const { Marker } = await loader.importLibrary("marker");
      const { Autocomplete } = await loader.importLibrary("places");

      const mapOptions = {
        center: props.mapCenter,
        zoom: 15,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }],
          },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
          },
        ],
      };

      const autoOptions = {
        // types: ["restaurant", "cafe", "bar", "bakery", "food"],
        componentRestrictions: { country: ["hk", "jp", "tw"] },
        types: ["restaurant", "cafe", "bar", "bakery", "food"],
        // types: ["address"],
        fields: [
          "formatted_address",
          "geometry",
          "name",
          "formatted_phone_number",
        ],
      };
      let autoComplete = new Autocomplete(
        document.querySelector("#restoSearchInput"),
        autoOptions
      );

      let autoCompleteRecordResto = new Autocomplete(
        document.querySelector("#input__resto"),
        autoOptions
      );

      // console.log(autoCompleteRecordResto);

      const map = new Map(document.querySelector("#map"), mapOptions);

      const maker = new Marker({ map: map, position: props.mapCenter });

      if (autoComplete) {
        autoComplete.addListener("place_changed", () => {
          let place = autoComplete.getPlace();
          console.log(place);
          props.filter({
            restaurant: place.name,
          });
          props.setTypeSearch(place.name);
        });
      }

      if (autoCompleteRecordResto) {
        autoCompleteRecordResto.addListener("place_changed", () => {
          let place = autoCompleteRecordResto.getPlace();
          console.log(place.name);
          // return place.name;
          // if (props.setGotAddress != undefined) {
          // console.log("have", props.setGotAddress);
          props.setGotAddress(place.name);
          props.setResto(place.name);
          // }

          // setAddress(place.name);
          // props.officialName(place.name);
        });
      }

      // props.setAdditionalFilter({
      //   restaurant: document.querySelector("#restoSearchInput").value,
      // });

      // const googleMapsSearch = document.querySelector("#restoSearchInput");
      // console.log(googleMapsSearch);
    };

    initMap();
  }, []);

  // autoCompleteRecordResto.addEventListener("autocomplete", onPlaceChanged)
  // return <div className={styles.HomePageContainer__maps} id="map" key="map" />;
}
