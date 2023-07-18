import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Friend.module.scss";
import { List, Skeleton, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import axiosClient from "~/api/axiosClient";
import { NavLink } from "react-router-dom";
const cx = classNames.bind(styles);

const Friends = () => {
  const [list, setList] = React.useState([]);
  useEffect(() => {
    axiosClient
      .get("https://vacation-backend.onrender.com/friend?page=1")
      .then((res) => setList(res.data.data));
  }, []);

  const loadMoreData = () => {
    axiosClient
      .get("https://vacation-backend.onrender.com/friend?page=1")
      .then((res) => setList(res.data.data));
  };

  console.log(list);

  return (
    <div className={cx("friend")}>
      <InfiniteScroll
        dataLength={list.length}
        next={loadMoreData}
        hasMore={true}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
      >
        <List
          className={cx("list")}
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item>
              <NavLink className={cx("item")} to={`/`}>
                <Avatar
                  size={40}
                  src={`https://picsum.photos/900/600?random=${index}`}
                  icon={<UserOutlined />}
                />
                <Typography.Paragraph className={cx("title")} ellipsis={{ expandable: false, rows: 1 }}>
                  {item.firstname} {item.lastname}
                </Typography.Paragraph>
              </NavLink>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Friends;
