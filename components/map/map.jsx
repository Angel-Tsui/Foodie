"use client";
import styles from "../../src/app/page.module.css";
import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { doc } from "firebase/firestore";

export default function Map(props) {
  // console.log(props);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

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

      // let moveToCollection = new Autocomplete(
      //   document.querySelectorAll(".foodGallery__card"),
      //   autoOptions
      // );

      let autoCompleteRecordResto = new Autocomplete(
        document.querySelector("#input__resto"),
        autoOptions
      );

      const map = new Map(document.querySelector("#map"), mapOptions);

      const marker = new Marker({ map: map });

      if (autoComplete) {
        // Autocomplete
        autoComplete.addListener("place_changed", () => {
          let place = autoComplete.getPlace();
          // console.log(autoComplete);
          // console.log(place);
          // console.log({
          //   lat: place.geometry.location.lat(),
          //   lng: place.geometry.location.lng(),
          // });
          // filter search result
          props.filter({
            restaurant: place.name,
          });
          props.setTypeSearch(place.name);

          // move location on map
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
          marker.setPosition(place.geometry.location);
          // marker.setVisibile(true);
        });
      }

      if (props.markerPosition != "" || props.markerPosition != null) {
        // console.log(props.markerPosition);
        map.setCenter(props.markerPosition);
        map.setZoom(17);
        marker.setPosition(props.markerPosition);
      }

      if (autoCompleteRecordResto) {
        autoCompleteRecordResto.addListener("place_changed", () => {
          let place = autoCompleteRecordResto.getPlace();
          // console.log(place.name);
          // console.log({
          //   lat: place.geometry.location.lat(),
          //   lng: place.geometry.location.lng(),
          // });
          props.setGotAddress(place.name);
          props.setResto(place.name);
          props.setLatlng({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        });
      }
    };

    initMap();
  }, [props.markerPosition]);

  // autoCompleteRecordResto.addEventListener("autocomplete", onPlaceChanged)
  // return <div className={styles.HomePageContainer__maps} id="map" key="map" />;
}
