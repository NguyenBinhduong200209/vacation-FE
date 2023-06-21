import { Outlet, useNavigate } from "react-router-dom";
import styles from "./Vacation.module.scss";
import classNames from "classnames/bind";
import { VACATION_ALBUM_ROUTE, VACATION_POSTS_ROUTE } from "~/utils/constants";
import userBG from "~/images/userBG.png";
import google from "~/images/google.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faFlag,
  faFlagCheckered,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);
const Vacation = () => {
  const navigate = useNavigate();
  const handleRoute = (url) => {
    navigate(url);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("sidebar")}>
        <img src={userBG} alt="This is BG" className={cx("img-BG")} />
        <div className={cx("sidebar-content")}>
          <div className={cx("user-info")}>
            <div className={cx("user-index")}>
              <div className={cx("index")}>4324</div>
              <div className={cx("index-title")}>friends</div>
            </div>
            <div className={cx("user-avatar")}>
              {/* <img src="" alt="" /> */}
              <div className={cx("avatar")}></div>
              <div className={cx("fullname")}>Ng Công Sơn</div>
              <div className={cx("username")}>@Co.Sonnguyen1122</div>
            </div>
            <div className={cx("user-index")}>
              <div className={cx("index")}>3</div>
              <div className={cx("index-title")}>Posts</div>
            </div>
          </div>
          <div className={cx("vacation-detail")}>
            <div className={cx("vacation-title")}>Vacation Detail</div>
            <div className={cx("vacation-info")}>
              <div>
                <FontAwesomeIcon icon={faCircleInfo} className={cx("icon")} />
                <span>S.O.S in Hà Nội</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faFlag} className={cx("icon")} />
                <span>Hà Nội, Việt Nam</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faUser} className={cx("icon")} />
                <span>4 people join in</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCalendar} className={cx("icon")} />
                <span>01/06/2023 - 22/06/2023</span>
              </div>
            </div>
          </div>
          <div className={cx("route")}>
            <div
              onClick={() => handleRoute(VACATION_POSTS_ROUTE)}
              className={cx("active")}
            >
              See All Posts
            </div>
            <div onClick={() => handleRoute(VACATION_ALBUM_ROUTE)}>
              See Album
            </div>
          </div>
        </div>
      </div>
      <div className={cx("content")}>
        <Outlet />
      </div>
    </div>
  );
};

export default Vacation;
