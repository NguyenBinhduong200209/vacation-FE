import React from "react";
import classNames from "classnames/bind";
import styles from "../ProfileLayout.module.scss";
import { NavLink } from "react-router-dom";
import { Dropdown } from "antd";
import { useSelector } from "react-redux";
import statusList from "./StatusList";
const cx = classNames.bind(styles);

const Navbar = ({ userId }) => {
  const { friendStatus } = useSelector((state) => state.auth.otherUserInfo);
  const status = friendStatus ? (friendStatus === "accepted" ? "Friends" : "Pending") : "Add Friend";
  const { button, list } = statusList(status);

  return (
    <div className={cx("header")}>
      <div className={cx("navigation")}>
        <NavLink to="/profile/" end className={({ isActive }) => (isActive ? cx("active") : "")}>
          Vacations
        </NavLink>
        <NavLink to="album" end className={({ isActive }) => (isActive ? cx("active") : "")}>
          Albums
        </NavLink>
        <NavLink to="friends" end className={({ isActive }) => (isActive ? cx("active") : "")}>
          Friends
        </NavLink>
      </div>
      {userId && (
        <Dropdown.Button
          className={cx("dropdown")}
          menu={{
            className: cx("dropdown-list"),
            items: list,
          }}
        >
          {button}
        </Dropdown.Button>
      )}
    </div>
  );
};

export default Navbar;
