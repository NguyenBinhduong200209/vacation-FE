// HeaderDropdown.jsx
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./HeaderDropdown.module.scss";
import { CaretDownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Image from "~/components/Image/Image";

const cx = classNames.bind(styles);

const HeaderDropdown = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const { info } = useSelector((state) => state.auth);
  const dropdownRef = useRef(null);
  console.log(info);

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
    navigate("/login");
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={cx("dropdown-container")}>
      <div className={cx("nav-user")} onClick={toggleDropdown}>
        <Image path={info?.avatar} className={cx("user-ava")} alt="" />
        <div className={cx("user-fullname")}>
          <li>{info?.lastname}</li>
          <li>{info?.firstname}</li>
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
