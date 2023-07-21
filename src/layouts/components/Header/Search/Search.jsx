import React, { useState, useEffect } from "react";
import styles from "../Header.module.scss";
import classNames from "classnames/bind";
import { searchOneModel } from "~/store/slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { List, Avatar, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink, Link, useNavigate, useSearchParams } from "react-router-dom";
import images from "~/images";
import { useDebounce } from "~/helpers/customHook";
const cx = classNames.bind(styles);

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchVal = searchParams.get("f");
  const [value, setValue] = useState(searchVal || "");
  const navigate = useNavigate();
  const debouncedValue = useDebounce(value, 500);
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const dispatch = useDispatch();
  const { result } = useSelector((state) => state.search);
  const { suggestions } = result;

  useEffect(() => {
    dispatch(
      searchOneModel({
        body: { model: "user", value: debouncedValue, page: 1 },
        type: "suggestions",
      })
    );
  }, [dispatch, debouncedValue]);

  const loadMoreData = () => {
    dispatch(
      searchOneModel({
        body: {
          model: "user",
          value: debouncedValue,
          page: suggestions.page + 1,
        },
        type: "suggestions",
      })
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && value !== "") {
      setHideSuggestions(true);
      navigate(`/search/user?f=${value}`);
    }
  };

  return (
    <div className={cx("nav-search")}>
      <NavLink className={cx("nav-logo")} to="/">
        <img src={images.Vector} className={cx("nav-logo-img")} />
      </NavLink>
      <input
        className={cx("search-input")}
        type="text"
        placeholder="# Explore..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setHideSuggestions(false);
        }}
        onKeyPress={handleKeyPress}
        onBlur={() => {
          setHideSuggestions(true);
        }}
        spellCheck={false}
      />
      <div id="suggestion" className={cx("suggestions")}>
        {!hideSuggestions && (
          <InfiniteScroll
            scrollThreshold="50%"
            dataLength={suggestions.data.length || 0}
            next={loadMoreData}
            hasMore={suggestions.page < suggestions.pages}
            loader={
              <Skeleton
                avatar
                paragraph={{
                  rows: 1,
                }}
                active
              />
            }
            scrollableTarget="suggestion"
          >
            <List
              itemLayout="horizontal"
              dataSource={suggestions.data}
              renderItem={(item, index) => (
                <Link style={{ color: "white" }} to="/profile">
                  <List.Item className={cx("item")}>
                    <List.Item.Meta
                      avatar={<Avatar size="large" src={item.avatar} />}
                      title={
                        <span style={{ color: "white" }}>{item.username}</span>
                      }
                      description={
                        <div
                          style={{ color: "white" }}
                        >{`${item.firstname} ${item.lastname}`}</div>
                      }
                    />
                  </List.Item>
                </Link>
              )}
            />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Search;
