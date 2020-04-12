import React, { useCallback, useState } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "../MapMarker/MapMarker";

import { useMappedState } from "redux-react-hook";
import InStockLogo from "../App/images/inStockLogo";
import OutOfStockLogo from "../App/images/outOfStockLogo";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";

const MapContainer = ({ loading, error, initMap }) => {
  const [lat, setLat] = useState(52.536228);
  const [lng, setLng] = useState(13.42606);

  const mapState = useCallback((state) => {
    return {
      places: state.placesState.allPlaces,
      mapCenter: state.placesState.mapCenter,
    };
  }, []);

  const { places, mapCenter } = useMappedState(mapState);

  const InitialMap = () => {
    return (
      <div id="init-map-message">
        <div id="init-map-message-text">
          User search bar to find toilet paper nearby.
        </div>
        <div id="init-map-message-text">
          <div id="init-message-marker-container">
            <div id="init-message-marker-split">
              <div id="init-message-marker-logo">
                <InStockLogo />
              </div>
              <div id="init-message-marker-text">In Stock</div>
            </div>
            <div id="init-message-marker-split">
              <div id="init-message-marker-logo">
                <OutOfStockLogo />
              </div>
              <div id="init-message-marker-text"> Out of Stock</div>
            </div>
            <div id="init-message-marker-split">
              <div id="init-message-marker-logo">
                <NotListedLocationIcon
                  id='not-listed-logo'
                />
              </div>
              <div id="init-message-marker-text"> No Reports</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const LoadingMap = () => {
    return (
      <div id="loading-map-message">
        <div id="init-map-message-text">Loading...</div>
      </div>
    );
  };
  const ErrorMap = () => {
    return (
      <div id="loading-map-message" lat={lat} lng={lng}>
        <div id="init-map-message-text">No places found.</div>
      </div>
    );
  };

  // console.log("check here", places, mapCenter);

  const MappedMarkers = places.map((marker) => {
    // console.log(marker);
    return (
      <MapMarker
        key={marker.id}
        lat={marker.geometry.location.lat}
        lng={marker.geometry.location.lng}
        marker={marker}
      />
    );
  });

  // console.log(
  //   "loading:",
  //   loading,
  //   "error",
  //   error,
  //   "initMap",
  //   initMap,
  //   places.length
  // );

  const mapSwitch = (loading, error, lat, lng) => {
    if (initMap) {
      return <InitialMap />;
    } else if (loading) {
      return <LoadingMap />;
    } else if (!loading && !error) {
      return MappedMarkers;
    } else if (!loading && error) {
      return <ErrorMap />;
    }
  };
  return (
    <div id="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ",
        }}
        center={{
          lat: mapCenter.lat,
          lng: mapCenter.lng,
        }}
        defaultZoom={14}
      >
        {mapSwitch(loading, error, lat, lng)}
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;
