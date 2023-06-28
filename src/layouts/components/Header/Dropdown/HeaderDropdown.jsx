// HeaderDropdown.jsx
import axiosClient from "~/api/axiosClient";
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./HeaderDropdown.module.scss";
import { CaretDownOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

const HeaderDropdown = () => {
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({});
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const fetchUser = await axiosClient.get(
          `https://vacation-backend.onrender.com/auth/info`
        );
        setUser(fetchUser.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div ref={dropdownRef} className={cx("dropdown-container")}>
      <div className={cx("nav-user")} onClick={toggleDropdown}>
        <img src={user?.avatar} className={cx("user-ava")} alt="" />
        <div className={cx("user-fullname")}>
          <li>{user?.lastname}</li>
          <li>{user?.firstname}</li>
        </div>
        <CaretDownOutlined className={cx("dropdown-icon")} />
      </div>
      {isOpen && (
        <div className={cx("dropdown-menu")}>
          {/* Dropdown menu content goes here */}
          <ul>
            <li>See Profile</li>
            <li>Setting</li>
            <div className={cx("dropdown-menu-line")}></div>
            <li onClick={handleLogout}>Log Out</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderDropdown;
