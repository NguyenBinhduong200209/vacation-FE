import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Friend.module.scss";
import { List, Skeleton, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink } from "react-router-dom";
import axiosClient from "~/api/axiosClient";
const cx = classNames.bind(styles);

const FriendList = () => {
  const [list, setList] = React.useState([]);
  useEffect(() => {
    axiosClient
      .get("https://vacation-backend.onrender.com/friend?page=1")
      .then((res) => setList(res.data.data));
  }, []);

  const loadMoreData = () => {
    axiosClient
      .get("https://vacation-backend.onrender.com/friend?page=1")
      .then((res) => setList(list.concat(res.data.data)));
  };

  console.log(list);

  return (
    <InfiniteScroll
      dataLength={list.length}
      next={loadMoreData}
      hasMore={true}
      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
    >
      <List
        className={cx("list")}
        dataSource={list}
        grid={{ column: 2 }}
        renderItem={(item, index) => (
          <NavLink className={cx("nav")} to={`/`}>
            <List.Item className={cx("item")}>
              <List.Item.Meta
                style={{ alignItems: "center", height: "inherit" }}
                avatar={
                  <Avatar
                    className={cx("avatar")}
                    size={60}
                    src={`https://picsum.photos/900/600?random=${index}`}
                    icon={<UserOutlined />}
                  />
                }
                title={<span style={{ color: "white" }}>{item.username}</span>}
                description={<div style={{ color: "white" }}>{`${item.firstname} ${item.lastname}`}</div>}
              />
            </List.Item>
          </NavLink>
        )}
      />
    </InfiniteScroll>
  );
};

export default FriendList;
