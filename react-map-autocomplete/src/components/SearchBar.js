import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPlaces, fetchPlaceDetail } from "../store/actions";
import { Input, AutoComplete } from "antd";
import { useSelector } from "react-redux";
import { uniqueArray } from "../helpers";

const SearchBar = ({ ...props }) => {
  const places = useSelector((state) => state.placesReducer.places);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!query) {
      onFocusHandler();
    } else if (places) {
      // update options based on the places from the redux store
      setOptions(
        places.map((place) => ({
          label: place.description,
          value: place.place_id,
        }))
      );
    }
  }, [query, places]);

  const handleSearch = (value) => {
    dispatch(fetchPlaces(value));
  };

  const onSelect = (value, option) => {
    let recentSearch = JSON.parse(localStorage.getItem("recentSearch")) || [];
    recentSearch.unshift({ label: option.label, value });
    recentSearch = uniqueArray(recentSearch);
    localStorage.setItem("recentSearch", JSON.stringify(recentSearch));

    setQuery(option.label);
    dispatch(fetchPlaceDetail(value));
  };

  const onFocusHandler = () => {
    if (!query) {
      // display recent searches when the search bar is empty and focused and
      // add a title to the options array
      const recentSearch =
        JSON.parse(localStorage.getItem("recentSearch")) || [];

      setOptions([
        {
          label: <span style={{ fontWeight: "bold" }}>Recent Search</span>,
          options: recentSearch,
        },
      ]);
    }
  };

  return (
    <AutoComplete
      {...props}
      value={query}
      onFocus={onFocusHandler}
      onChange={(e) => setQuery(e)}
      onSelect={onSelect}
      onSearch={handleSearch}
      options={options}
    >
      <Input.Search placeholder="Search for places" enterButton />
    </AutoComplete>
  );
};

export default SearchBar;
