import React from "react";
import { Typography } from "antd";
import styles from "../Noti.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const LikeComment = ({ item }) => {
  const { modelInfo, action, __v, userInfo } = item;
  const isFirstVersion = __v === 0;

  return (
    <Typography.Text className={cx("content")}>
      <span className={cx("bold")}>{userInfo?.username} </span>
      <span>
        {(isFirstVersion ? "" : "and others ").concat(
          action,
          isFirstVersion ? "s" : "",
          " your ",
          modelInfo?.type
        )}
      </span>
      <span className={cx("italic")}> "{modelInfo?.content}"</span>
    </Typography.Text>
  );
};

export default LikeComment;
