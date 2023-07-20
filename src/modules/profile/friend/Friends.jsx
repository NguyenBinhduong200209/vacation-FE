import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Friend.module.scss";
import { Tabs } from "antd";
import FriendList from "./list/List";
import { resetList } from "~/store/slices/friendSlice";
import { useDispatch } from "react-redux";
const cx = classNames.bind(styles);

const Friends = () => {
  const [type, setType] = useState("friend");
  const dispatch = useDispatch();
  const onTabChange = (key) => {
    dispatch(resetList());
    setType(Number(key) === 1 ? "friend" : "request");
  };

  return (
    <Tabs
      className={cx("friend-nav")}
      type="line"
      defaultActiveKey="1"
      size="large"
      items={[
        {
          key: "1",
          label: "Friend List",
          children: <FriendList type={type} />,
        },
        {
          key: "2",
          label: "Request List",
          children: <FriendList type={type} />,
        },
      ]}
      onChange={onTabChange}
    />
  );
};

export default Friends;
