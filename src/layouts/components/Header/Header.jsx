import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";
import HeaderDropdown from "./Dropdown/HeaderDropdown";
import { useDispatch } from "react-redux";
import NotiList from "~/modules/notification/NotiList";
import { getList } from "~/store/slices/notiSlice";
import Navigation from "./Navigation/Navigation";
import Search from "./Search/Search";
const cx = classNames.bind(styles);

const Header = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList({ page: 1 }));
  }, [dispatch]);

  return (
    <>
      <div className={cx("wrapper")}>
        <Search />
        <Navigation />
        <HeaderDropdown />
      </div>
      <NotiList />
      {children}
    </>
  );
};

export default Header;
