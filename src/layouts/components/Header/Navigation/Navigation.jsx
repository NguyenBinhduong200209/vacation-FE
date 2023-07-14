import React, { useState } from "react";
import { HomeOutlined, PictureOutlined, FolderOpenOutlined, BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getList, changeVisible } from "~/store/slices/notiSlice";
import { NavLink } from "react-router-dom";
import styles from "../Header.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Navigation = () => {
  const [fill, setFill] = useState(false);
  const { list, quantity } = useSelector((state) => state.noti);
  const dispatch = useDispatch();

  const handleBell = () => {
    dispatch(changeVisible());
    Array.isArray(list) && list.length === 0 && dispatch(getList());
    setFill(!fill);
  };

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

      <NavLink
        style={{ cursor: "pointer", padding: "0" }}
        className={fill ? cx("active") : ""}
        onClick={handleBell}
      >
        <Badge count={quantity} overflowCount={9} color="#ff6b6b">
          <BellOutlined />
        </Badge>
      </NavLink>
    </div>
  );
};

export default Navigation;
