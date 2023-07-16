import React from "react";
import { HomeOutlined, PictureOutlined, FolderOpenOutlined, BellOutlined } from "@ant-design/icons";
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
        to="/profile"
        className={({ isActive }) => {
          return isActive ? cx("active") : "";
        }}
      >
        <PictureOutlined />
      </NavLink>

      <NavLink
        to="/setting"
        className={({ isActive }) => {
          return isActive ? cx("active") : "";
        }}
      >
        <FolderOpenOutlined />
      </NavLink>

      <NavLink style={{ cursor: "pointer", padding: "0" }} className={isVisible ? cx("active") : ""}>
        <Badge count={totalUnseen} overflowCount={9} color="#b18735">
          <BellOutlined />
        </Badge>
      </NavLink>
    </div>
  );
};

export default Navigation;
