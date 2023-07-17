import Header from "~/layouts/components/Header/Header";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getInfoUser } from "~/store/slices/authSlice";
import Preloader from "~/components/Preloader/Preloader";

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.auth);
  const [preLoader, setPreLoader] = useState(false);
  useEffect(() => {
    if (isLogin) {
      setPreLoader(true);
      dispatch(getInfoUser());
      setPreLoader(false);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>{children}</div>
    </div>
  );
};

export default DefaultLayout;
