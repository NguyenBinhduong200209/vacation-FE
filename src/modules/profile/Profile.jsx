import { Image } from "antd";
import React, { useEffect } from "react";
import Navbar from "~/modules/profile/nav/Navbar";
import UserInfo from "./userInfo/UserInfo";
import classNames from "classnames/bind";
import styles from "./ProfileLayout.module.scss";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser } from "~/store/slices/authSlice";
const cx = classNames.bind(styles);

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info, otherUserInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getInfoUser(id));
  }, [dispatch, id]);

  return (
    <>
      <Image
        preview={false}
        rootClassName={cx("user-info-bgimg")}
        src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
      />
      <div className={cx("info")}>
        {id ? <UserInfo info={otherUserInfo} /> : <UserInfo info={info} />}
        <div className={cx("container")}>
          <Navbar userId={id} />
          <Outlet context={{ userId: id }} />
        </div>
      </div>
    </>
  );
};

export default Profile;
