import React, { useState, useEffect } from "react";
import styles from "../Header.module.scss";
import classNames from "classnames/bind";
import { searchOneModel } from "~/store/slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { List, Avatar, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink, Link } from "react-router-dom";
import images from "~/images";
import Image from "~/components/Image/Image";
const cx = classNames.bind(styles);

const Search = () => {
  const [value, setValue] = useState("");
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const dispatch = useDispatch();
  const { result: suggestions, page, pages } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(searchOneModel({ model: "user", value: value, page: 1 }));
  }, [dispatch, value]);

  const loadMoreData = () => {
    dispatch(searchOneModel({ model: "user", value: value, page: page + 1 }));
  };

  return (
    <div className={cx("nav-search")}>
      <NavLink className={cx("nav-logo")} to="/">
        <Image path={images.Vector} className={cx("nav-logo-img")} alt="????" />
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
        onBlur={() => {
          setHideSuggestions(true);
        }}
      />
      <div id="suggestion" className={cx("suggestions")}>
        {!hideSuggestions && (
          <InfiniteScroll
            scrollThreshold="50%"
            dataLength={suggestions.length}
            next={loadMoreData}
            hasMore={page < pages}
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
              dataSource={suggestions}
              renderItem={(item, index) => (
                <Link style={{ color: "white" }} to="/profile">
                  <List.Item className={cx("item")}>
                    <List.Item.Meta
                      avatar={<Avatar size="large" src={item.avatar} />}
                      title={<span style={{ color: "white" }}>{item.username}</span>}
                      description={
                        <div style={{ color: "white" }}>{`${item.firstname} ${item.lastname}`}</div>
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
