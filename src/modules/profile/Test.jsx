import { Image } from "antd";
import React from "react";
import Navbar from "~/layouts/Profile/Navbar";
import UserInfo from "~/layouts/Profile/UserInfo";
import classNames from "classnames/bind";
import styles from "../../layouts/Profile/ProfileLayout.module.scss";
import { Outlet } from "react-router-dom";
const cx = classNames.bind(styles);

const Test = () => {
  return (
    <>
      <Image
        preview={false}
        rootClassName={cx("user-info-bgimg")}
        src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
      />
      <UserInfo />
      <div className={cx("container")}>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Test;
