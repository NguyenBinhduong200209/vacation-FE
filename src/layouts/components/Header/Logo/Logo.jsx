import styles from "../Header.module.scss";
import classNames from "classnames/bind";
import images from "~/images";
import Image from "~/components/Image/Image";
import { NavLink } from "react-router-dom";
const cx = classNames.bind(styles);

const Logo = () => {
  return (
    <NavLink className={cx("nav-logo")} to="/">
      <Image path={images.Vector} className={cx("nav-logo-img")} alt="????" />
    </NavLink>
  );
};

export default Logo;
