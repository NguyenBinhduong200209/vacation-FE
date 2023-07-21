import React from "react";
import { HomeOutlined, TeamOutlined, ProfileOutlined, BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "../Header.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Navigation = () => {
  const { isVisible, totalUnseen } = useSelector((state) => state.noti);

  return (
    <div className={cx("nav-tools")}>
      <NavLink
        to="/"
        className={({ isActive }) => {
          return isActive ? cx("active") : "";
        }}
      >
        <HomeOutlined />
      </NavLink>

      <NavLink
        to="/profile/"
        className={({ isActive }) => {
          return isActive ? cx("active") : "";
        }}
      >
        <ProfileOutlined />
      </NavLink>

      <NavLink
        to="/profile/friends"
        className={({ isActive }) => {
          return isActive ? cx("active") : "";
        }}
      >
        <TeamOutlined />
      </NavLink>

      <div style={{ cursor: "pointer", padding: "0" }} className={isVisible ? cx("active") : ""}>
        <Badge count={totalUnseen || 0} overflowCount={9} color="#b18735">
          <BellOutlined />
        </Badge>
      </div>
    </div>
  );
};

export default Navigation;
