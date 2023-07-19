import React from "react";
import { Typography } from "antd";
import styles from "../Noti.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Post = ({ item }) => {
    const { userInfo, modelInfo } = item;
    const action = modelInfo.action === "create" ? "created" : "updated";

    return (
        <Typography.Text className={cx("content")}>
            <span className={cx("bold")}>{userInfo?.username} </span>
            {action} a post
        </Typography.Text>
    );
};

export default Post;
