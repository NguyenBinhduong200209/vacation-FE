// import styles from "./Header.module.scss";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";
import HeaderDropdown from "./Dropdown/HeaderDropdown";
import { useDispatch, useSelector } from "react-redux";
import NotiList from "~/modules/notification/NotiList";
import { getList } from "~/store/slices/notiSlice";
import Navigation from "./Navigation/Navigation";
import Search from "./Search/Search";
const cx = classNames.bind(styles);

const Header = () => {
  const dispatch = useDispatch();
  const { size } = useSelector((state) => state.general);
  const isSmallSize = size.width <= 576;

  useEffect(() => {
    dispatch(getList({ page: 1 }));
  }, [dispatch]);

  return (
    <>
      <div className={cx("wrapper")}>
        {!isSmallSize && <Search />}
        <Navigation />
        <HeaderDropdown />
      </div>
      <NotiList />
    </>
  );
};

export default Header;
