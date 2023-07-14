import React, { useState, useEffect } from "react";
import styles from "../Header.module.scss";
import classNames from "classnames/bind";
import axiosClient from "~/api/axiosClient";
const cx = classNames.bind(styles);

const Search = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hideSuggestions, setHideSuggestions] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosClient.get(
          `https://vacation-backend.onrender.com/search/user?value=${value}&page=1`
        );
        setSuggestions(res.data.data || []);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [value]);

  return (
    <div className={cx("nav-search")}>
      <input
        className={cx("search-input")}
        type="text"
        placeholder="# Explore..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setHideSuggestions(false);
        }}
        onBlur={() => {
          setTimeout(() => {
            setHideSuggestions(true);
          }, 100);
        }}
      />
      <div className={cx("bar")}>
        <div className={cx("suggestions")}>
          {!hideSuggestions && (
            <div>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setValue(suggestion.username);
                      setHideSuggestions(true);
                    }}
                  >
                    {suggestion.username}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
