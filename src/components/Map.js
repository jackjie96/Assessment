import React from "react";
import { useSelector } from "react-redux";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const places = useSelector((state) => state.places);
  const containerStyle = { width: "400px", height: "400px" };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: -34.397, lng: 150.644 }}
        zoom={8}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            position={{
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
