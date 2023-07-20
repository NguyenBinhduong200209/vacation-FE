import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Avatar, Col, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const cx = classNames.bind(styles);

const UserInfo = ({ info }) => {
  return (
    <div className={cx("user-info")}>
      <div className={cx("user-info-header")}>
        <Avatar
          className={cx("avatar")}
          src={info?.avatar?.path}
          size={140}
          shape="square"
          icon={<UserOutlined />}
        />

        <Typography.Title level={4} className={cx("user-info-fullname")}>
          {info?.lastname} {info?.firstname}
        </Typography.Title>

        <span style={{ fontStyle: "italic" }}>
          <Typography.Text>@</Typography.Text>
          <Typography.Text copyable={true}>{info?.username}</Typography.Text>
        </span>

        <Typography.Paragraph ellipsis={{ expandable: false, rows: 2 }} className={cx("user-info-des")}>
          {info?.description}
        </Typography.Paragraph>

        <div className={cx("user-info-grid")}>
          <Row justify="space-evenly">
            <Col span={12} className={cx("cell")} id={cx("one")}>
              <NavLink to="friends">
                <Typography.Paragraph className={cx("para")}>{info?.friends}</Typography.Paragraph>
                <Typography.Paragraph className={cx("para")}>Friends</Typography.Paragraph>
              </NavLink>
            </Col>
            <Col span={12} className={cx("cell")} id={cx("two")}>
              <NavLink to="">
                <Typography.Paragraph className={cx("para")}>{info?.vacations}</Typography.Paragraph>
                <Typography.Paragraph className={cx("para")}>Vacations</Typography.Paragraph>
              </NavLink>
            </Col>
          </Row>
          <Row justify="space-evenly">
            <Col span={12} className={cx("cell")} id={cx("three")}>
              <Typography.Paragraph className={cx("para")}>{info?.posts}</Typography.Paragraph>
              <Typography.Paragraph className={cx("para")}>Posts</Typography.Paragraph>
            </Col>
            <Col span={12} className={cx("cell")} id={cx("four")}>
              <Typography.Paragraph className={cx("para")}>{info?.likesPost}</Typography.Paragraph>
              <Typography.Paragraph className={cx("para")}>Likes</Typography.Paragraph>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
