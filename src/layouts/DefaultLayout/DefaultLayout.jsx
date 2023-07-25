import Header from "~/layouts/components/Header/Header";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getInfoUser, refreshToken } from "~/store/slices/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Preloader from "~/components/Preloader/Preloader";

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLogin) {
      dispatch(getInfoUser());
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className={cx("wrapper")}>
      <>
        <Header />
        <div className={cx("container")}>{children}</div>
      </>
    </div>
  );
};

export default DefaultLayout;
