import React from "react";
import moment from "moment";
import { Row, Col, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./Noti.module.scss";
import classNames from "classnames/bind";
import LikeComment from "./content/LikeComment";
import AddFriend from "./content/AddFriend";
import { updateOne } from "~/store/slices/notiSlice";
import { useDispatch } from "react-redux";
const cx = classNames.bind(styles);

const NotiItem = ({ item }) => {
  const { _id, modelInfo, isSeen, lastUpdateAt, userInfo } = item;
  const dispatch = useDispatch();

  const handleSeenStatus = () => {
    dispatch(updateOne(_id));
  };

  return (
    <Row className={cx("noti-item")} onClick={handleSeenStatus}>
      <Col span={1} style={{ margin: "0px 3px" }}>
        <Avatar
          className={cx("user-avatar")}
          src={userInfo?.avatar?.path}
          icon={<UserOutlined />}
          size="middle"
        ></Avatar>
      </Col>

      <Col span={18}>
        {modelInfo.type === "friends" ? <AddFriend item={item} /> : <LikeComment item={item} />}
        <Typography.Text className={cx("datetime")}>{moment(lastUpdateAt).fromNow()}</Typography.Text>
      </Col>

      <Col span={1} offset={1}>
        {!isSeen && <div className={cx("seen")}></div>}
      </Col>
    </Row>
  );
};

export default NotiItem;
