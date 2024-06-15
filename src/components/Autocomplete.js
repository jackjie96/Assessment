import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPlaces } from "../store/actions";
import { Input } from "antd";

export const Autocomplete = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (value) => {
    if (value) {
      dispatch(fetchPlaces(value));
    }
  };

  return (
    <Input.Search
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onSearch={handleSearch}
      placeholder="Search for places"
      enterButton
    />
  );
};
