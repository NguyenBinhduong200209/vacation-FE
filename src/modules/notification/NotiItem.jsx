import React from "react";
import moment from "moment";
import { Row, Col, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./Noti.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const NotiItem = ({ item }) => {
  const { modelInfo, action, __v, isSeen, lastUpdateAt, userInfo } = item;
  const isFirstVersion = __v === 0;
  return (
    <Row className={cx("noti-item")}>
      <Col span={2} style={{ marginRight: "2px" }}>
        <Avatar
          className={cx("user-avatar")}
          src={userInfo?.avatar?.path}
          icon={<UserOutlined />}
          size="large"
        ></Avatar>
      </Col>

      <Col span={18}>
        <Typography.Text className={cx("content")}>
          <span className={cx("bold")}>{userInfo?.username}</span>
          <span>
            {(isFirstVersion ? " " : " and others ").concat(
              action,
              isFirstVersion ? "s" : "",
              " your ",
              modelInfo?.type
            )}
          </span>
          <span className={cx("italic")}> "{modelInfo?.content}"</span>
        </Typography.Text>
        <Typography.Text className={cx("datetime")}>{moment(lastUpdateAt).fromNow()}</Typography.Text>
      </Col>

      <Col span={1} offset={1}>
        {!isSeen && <div className={cx("seen")}></div>}
      </Col>
    </Row>
  );
};

export default NotiItem;
