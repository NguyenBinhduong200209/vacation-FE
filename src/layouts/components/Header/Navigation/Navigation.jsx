import React, { useState } from "react";
import {
  HomeOutlined,
  HomeFilled,
  PictureOutlined,
  PictureFilled,
  FolderOpenOutlined,
  FolderOpenFilled,
  BellOutlined,
  BellFilled,
} from "@ant-design/icons";
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
      <NavLink to="/">
        {({ isActive }) => (isActive ? <HomeFilled className={cx("active")} /> : <HomeOutlined />)}
      </NavLink>

      <NavLink to="/profile">
        {({ isActive }) => (isActive ? <PictureFilled className={cx("active")} /> : <PictureOutlined />)}
      </NavLink>

      <NavLink to="/setting">
        {({ isActive }) =>
          isActive ? <FolderOpenFilled className={cx("active")} /> : <FolderOpenOutlined />
        }
      </NavLink>

      <div style={{ cursor: "pointer", padding: "0" }} onClick={handleBell}>
        <NavLink>
          <Badge count={quantity} overflowCount={9} color="#ff6b6b">
            {fill ? <BellFilled className={cx("active")} /> : <BellOutlined />}
          </Badge>
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
