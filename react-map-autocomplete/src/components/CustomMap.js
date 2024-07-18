import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const CustomMap = () => {
  const placeDetail = useSelector((state) => state.placesReducer.detail);
  const [focusPosition, setFocusPosition] = useState({
    lat: 3.140853,
    lng: 101.693207,
  }); // default to Kuala Lumpur
  const containerStyle = { width: "100vw", height: "100vh" };

  useEffect(() => {
    if (placeDetail?.geometry?.location) {
      setFocusPosition(placeDetail.geometry.location);
    }
  }, [placeDetail]);

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={focusPosition}
        zoom={12}
      >
        {placeDetail?.geometry?.location && (
          <Marker
            id={placeDetail.place_id}
            position={placeDetail.geometry.location}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default CustomMap;
