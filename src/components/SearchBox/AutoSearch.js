import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import axios from "axios";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    this.props.changeLocation(address);
    const requestBody = {
      query: `
      mutation addTerm($term: String!) {
        addTerm(term: $term) {
          term
          dateTime
        }
      }
      `,
      variables: { term: `${address}` },
    };

    axios.post("https://tp-report-backend.herokuapp.com/graphql", requestBody);

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <div id="main-message-container">
              <div id="main-message">
                <div id="message-container">
                  <div id="main-message-left">
                    Report if a store is out of toilet paper!
                  </div>
                </div>
                <div id="search-box-container">
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      id: "search-box",
                    })}
                  />
                  <div id='search-result'>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div id="message-container">
                  <div id="main-message-right">
                    Help social distancing! Help those on the front line!
                  </div>
                </div>
              </div>
              {this.props.loading ? <div>Loading results...</div> : null}
              {!this.props.loading && this.props.error ? <div>No places found!</div> : null}
            </div>
          </>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
