import React from "react";
import classNames from "classnames/bind";
import styles from "./Friend.module.scss";
import { Tabs } from "antd";
import FriendList from "./List";
const cx = classNames.bind(styles);

const Friends = () => {
  const onTabChange = (key) => {
    console.log(key);
  };

  return (
    <div className={cx("friend")}>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Friend List",
            children: <FriendList />,
          },
          {
            key: "2",
            label: "Request List",
            children: <FriendList />,
          },
        ]}
        onChange={onTabChange}
      />
    </div>
  );
};

export default Friends;
