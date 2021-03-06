import React, { useState } from "react";
import MapContainer from "../MapContainer/MapContainer";
import SearchBox from "../SearchBox/SearchBox";
import LocationSearchInput from '../SearchBox/AutoSearch'

import axios from "axios";

import { useDispatch } from "redux-react-hook";
import * as actions from "../../constants/action_types";

import Geocode from "react-geocode";


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [initMap, setInitMap] = useState(true);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
  
  const geoCodeLocation = (loc) => {
    Geocode.setApiKey("AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ");
    setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 30));
    
    Geocode.fromAddress(loc).then(
      (response) => {
        console.log(loc)
        const { lat, lng } = response.results[0].geometry.location;
        // console.log(lat, lng);
        // this.fetchMarkers(lat, lng);
        const locale = { lat, lng };

        dispatch({ type: actions.SET_MAP_CENTER, locale });
        dispatch({ type: actions.CLEAR_PLACES });
        
        // this.setState({
        //   locationLat: lat,
        //   locationLng: lng,
        // });
        fetchPlaces(loc, lat, lng);
      },
      (error) => {
        console.error(error);
      }
      );
    };
    
    const getPlaceData = async (place) => {
      // console.log(place)
      const requestBody = {
        query: `
        query FetchPlace($googleId: String!){
        place(googleId: $googleId){
          name
          googleId
          reports{
            id
            itemName
            googleId
            dateTime
            status
          }
        }
      }
      `,
      variables: { googleId: `${place.place_id}` },
    };

    const { data } = await axios.post(
      "https://tp-report-backend.herokuapp.com/graphql",
      requestBody
    );
    // console.log(data.data.place);
    return data.data.place;
  };

  const triggerLocationChange = (location) => {
    geoCodeLocation(location);
  };

  const fetchPlaces = async (location, lat, lng) => {
    setLoading(true);
    setError(true)
    setInitMap(false);
    const headers = {
      "X-Requested-With": "XMLHttpRequest",
      "mode" : 'cors'
    };
    const uri = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=distance&keyword=supermarket&key=AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ`;
    // console.log("uri", uri);
    const response = await fetch(uri, headers);
    const json = await response.json();
    console.log("map data from json", json.status, json.results);
    
    if (json.status === 'OK') {
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 30));
      setError(false)
      setLoading(false);
      json.results.forEach((element) => {
        // console.log(element)
        getPlaceData(element).then((dbPlace) => {
          // console.log(dbPlace)
          if (dbPlace === null) {
            // console.log("hi");
            dispatch({ type: actions.ADD_PLACE, place: element });
            
            // newMarkers.push(element)
          } else {
            let newPlace;
            
            newPlace = { ...element, reports: dbPlace.reports };
            dispatch({ type: actions.ADD_PLACE, place: newPlace });
            // console.log(newPlace);
            // newMarkers.push(newPlace)
            // console.log(newMarkers)
          }
        });
      });
    }
    if (json.status === 'ZERO_RESULTS') {
      setLoading(false)
      setError(true);
      // console.log(error)
    }
    
    
    setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 40));
    // console.log('loading', loading, 'error', error)
  };
  return (
    <div id="main">
      <LocationSearchInput changeLocation={triggerLocationChange} loading={loading} error={error} />
      <MapContainer loading={loading} error={error} initMap={initMap} progress={progress}/>
    </div>
  );
};
export default Home;
