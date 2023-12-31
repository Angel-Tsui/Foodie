"use client";
import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import {
  getAvailableLocation,
  getSingleAvailableLocationDetail,
} from "../../firebase/firestore";

export default function Map(props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: apiKey,
        version: "weekly",
      });
      const { Map } = await loader.importLibrary("maps");
      const { Size } = await loader.importLibrary("core");
      const { Marker } = await loader.importLibrary("marker");
      const { Autocomplete } = await loader.importLibrary("places");
      const { InfoWindow } = await loader.importLibrary("streetView");

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
        fields: [
          "formatted_address",
          "geometry",
          "name",
          "formatted_phone_number",
          "website",
          "place_id",
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

      const map = new Map(document.querySelector("#map"), mapOptions);

      const icon = {
        url: "/cow.png",
        scaledSize: new Size(40, 40),
      };

      const marker = new Marker({ map: map, icon: icon });

      const infoWindow = new InfoWindow();

      const infoWindowOpenOptions = { map: map, anchor: marker };

      infoWindow.open(infoWindowOpenOptions);

      infoWindow.addListener("closeclick", () => {
        window.history.pushState(null, "", `/`);
        props.setFilterChanges(true);
        props.setFilterResName("");
      });

      const addMarker = (spot) => {
        let otherMarkers = new Marker({
          position: spot,
          map: map,
          icon: icon,
        });
        otherMarkers.addListener("click", async () => {
          let detail = await getSingleAvailableLocationDetail(spot);

          map.setCenter(spot);
          map.setZoom(18);
          marker.setPosition(spot);

          infoWindow.setContent(
            `<h2>${detail.resto}</h2><div>${detail.address}</div><br/><div>${detail.number}</div><br/><div><a href=${detail.website} target="_blank">${detail.website}</a></div>`
          );

          infoWindow.open(infoWindowOpenOptions);

          window.history.pushState(null, "", `/?resto=${detail.resto}`);
          props.setFilterChanges(true);
          props.setFilterResName(detail.resto);
        });
      };
      // Display all available location on map
      getAvailableLocation().then((displayLocationOnMap) => {
        let availableSpots = displayLocationOnMap.location;
        availableSpots.forEach((spot) => {
          addMarker(spot);
        });
      });

      if (autoComplete) {
        // Autocomplete
        autoComplete.addListener("place_changed", () => {
          let place = autoComplete.getPlace();
          window.history.pushState(null, "", `/?resto=${place.name}`);
          props.setFilterChanges(true);
          props.setFilterResName(place.name);
          props.setAutoReply(place.name);

          // move location on map
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(18);
          }
          marker.setPosition(place.geometry.location);

          let placeWebsite;
          let websiteLink;
          if (place.website) {
            placeWebsite = place.website;
            websiteLink = place.website;
          } else {
            placeWebsite = "No Website Available";
            websiteLink = "/";
          }
          infoWindow.setContent(
            `<h2>${place.name}</h2><div>${place.formatted_address}</div><br/><div>${place.formatted_phone_number}</div><br/><div><a href=${websiteLink} target="_blank">${placeWebsite}</a></div>`
          );
        });
      }

      if (props.markerPosition != "" || props.markerPosition != null) {
        map.setCenter(props.markerPosition);
        map.setZoom(18);
        marker.setPosition(props.markerPosition);

        if (props.noDisplay != "noMapDisplay") {
          infoWindow.setContent(
            `<h2>${props.placeInfoRestoName}</h2><div>${props.placeInfo.address}</div><br/><div>${props.placeInfo.number}</div><br/><div><a href=${props.placeInfo.website} target="_blank">${props.placeInfo.website}</a></div>`
          );
        }
      }

      if (autoCompleteRecordResto) {
        autoCompleteRecordResto.addListener("place_changed", () => {
          let place = autoCompleteRecordResto.getPlace();
          props.setGotAddress(place.name);
          props.setResto(place.name);
          props.setLatlng({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
          let placeWebsite;
          if (place.website) {
            placeWebsite = place.website;
          } else {
            placeWebsite = "No Website";
          }
          props.setMapInfo({
            address: place.formatted_address,
            number: place.formatted_phone_number,
            website: placeWebsite,
            place_id: place.place_id,
          });
        });
      }
    };

    initMap();
  }, [props.markerPosition]);
}
