import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
const cx = classNames.bind(styles);

const Navbar = () => {
  return (
    <div className={cx("navigation")}>
      <NavLink to="" end className={({ isActive }) => (isActive ? cx("active") : "")}>
        Vacations
      </NavLink>
      <NavLink to="album" end className={({ isActive }) => (isActive ? cx("active") : "")}>
        Albums
      </NavLink>
      <NavLink to="friends" end className={({ isActive }) => (isActive ? cx("active") : "")}>
        Friends
      </NavLink>
    </div>
  );
};

export default Navbar;
