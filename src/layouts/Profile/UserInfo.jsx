import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ProfileLayout.module.scss";
import axiosClient from "~/api/axiosClient";
import { Avatar, Col, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);

const UserInfo = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchUser = await axiosClient.get(`https://vacation-backend.onrender.com/auth/info`);
        setUser(fetchUser.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={cx("user-info")}>
      <div className={cx("user-info-header")}>
        <Avatar
          src={user?.avatar?.path}
          size={120}
          shape="square"
          icon={<UserOutlined />}
          style={{ border: "solid 2px", borderRadius: "20px" }}
        />

        <Typography.Title level={4} className={cx("user-info-fullname")}>
          {user?.lastname} {user?.firstname}
        </Typography.Title>

        <Typography.Text style={{ fontStyle: "italic" }}>@{user?.username}</Typography.Text>

        <Typography.Paragraph
          ellipsis={{ expandable: false, rows: 2 }}
          className={cx("user-info-des")}
          copyable={true}
        >
          {user?.description}
        </Typography.Paragraph>

        <div className={cx("user-info-grid")}>
          <Row justify="space-evenly">
            <Col span={12} className={cx("cell")} id={cx("one")}>
              <Typography.Paragraph className={cx("para")}>{user?.totalFriends}</Typography.Paragraph>
              <Typography.Paragraph className={cx("para")}>Friends</Typography.Paragraph>
            </Col>
            <Col span={12} className={cx("cell")} id={cx("two")}>
              <Typography.Paragraph className={cx("para")}>{user?.totalVacations}</Typography.Paragraph>
              <Typography.Paragraph className={cx("para")}>Vacations</Typography.Paragraph>
            </Col>
          </Row>
          <Row justify="space-evenly">
            <Col span={12} className={cx("cell")} id={cx("three")}>
              <Typography.Paragraph className={cx("para")}>{user?.totalPosts}</Typography.Paragraph>
              <Typography.Paragraph className={cx("para")}>Posts</Typography.Paragraph>
            </Col>
            <Col span={12} className={cx("cell")} id={cx("four")}>
              <Typography.Paragraph className={cx("para")}>{user?.totalLikes}</Typography.Paragraph>
              <Typography.Paragraph className={cx("para")}>Likes</Typography.Paragraph>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
