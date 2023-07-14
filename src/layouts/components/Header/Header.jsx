import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import images from "~/images";
import { useEffect } from "react";
import HeaderDropdown from "./Dropdown/HeaderDropdown";
import Image from "~/components/Image/Image";
import { useDispatch } from "react-redux";
import NotiList from "~/modules/notification/NotiList";
import { getList } from "~/store/slices/notiSlice";
import Navigation from "./Navigation/Navigation";
import Search from "./Search/Search";
import { NavLink } from "react-router-dom";
const cx = classNames.bind(styles);

const Header = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("nav")}>
          <NavLink className={cx("nav-logo")} to="/">
            <Image path={images.Vector} className={cx("nav-logo-img")} alt="????" />
          </NavLink>

          <div className={cx("nav-left")}>
            <Search />
            <Navigation />
            <HeaderDropdown />
          </div>
        </div>
      </div>
      <NotiList />
      {children}
    </>
  );
};

export default Header;
