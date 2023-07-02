import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styles from "./Vacation.module.scss";
import classNames from "classnames/bind";
import { VACATION_ALBUM_ROUTE, VACATION_POSTS_ROUTE } from "~/utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faFlag,
  faPen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailVacation, getManyPosts } from "~/store/slices/vacationSlice";

import Loading from "~/components/Loading/Loading";
import { getDate } from "~/helpers/function";
import { Modal, Tooltip } from "antd";
import Image from "~/components/Image/Image";

import Header from "~/layouts/components/Header/Header";

const cx = classNames.bind(styles);
const Vacation = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  let vacationID = searchParams.get("vacationID");
  const [modal2Open, setModal2Open] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { detail, isLoading, posts } = useSelector((state) => state.vacation);
  const { authorInfo, cover, members, title, startingTime, endingTime } =
    detail;

  // console.log("detail", detail);
  const startDate = getDate(startingTime);
  const endDate = getDate(endingTime);

  const handleRoute = (url) => {
    navigate(`${url}?vacationID=${vacationID}`);
  };
  // Get vacation detail
  useEffect(() => {
    dispatch(getDetailVacation(vacationID));
  }, []);

  const loadMorePosts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  // scroll event
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      if (isAtBottom) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // get posts of vacation
  useEffect(() => {
    if (currentPage <= posts.meta?.pages || currentPage === 1) {
      dispatch(
        getManyPosts({
          type: "vacation",
          id: vacationID,
          page: currentPage,
        })
      );
    }
  }, [currentPage]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={cx("wrapper")}>
          <Header />
          <div className={cx("sidebar")}>
            <Image src={cover} alt="This is BG" className={cx("img-BG")} />
            <div className={cx("sidebar-content")}>
              <div className={cx("user-info")}>
                <div className={cx("user-index")}>
                  <div className={cx("index")}>{authorInfo?.friends}</div>
                  <div className={cx("index-title")}>friends</div>
                </div>
                <div className={cx("user-avatar")}>
                  {/* <img src="" alt="" /> */}
                  <div className={cx("avatar")}></div>
                  <div className={cx("fullname")}>
                    {authorInfo?.firstname} {authorInfo?.lastname}
                  </div>
                  <div className={cx("username")}>{authorInfo?.username}</div>
                </div>
                <div className={cx("user-index")}>
                  <div className={cx("index")}>{posts.meta?.total || 0}</div>
                  <div className={cx("index-title")}>Posts</div>
                </div>
              </div>
              <div className={cx("vacation-detail")}>
                <div className={cx("vacation-title")}>
                  Vacation Detail
                  <FontAwesomeIcon icon={faPen} className={cx("title-icon")} />
                </div>
                <div className={cx("vacation-info")}>
                  <div className={cx("vacation-name")}>
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className={cx("icon")}
                    />
                    <Tooltip
                      title={title}
                      color="grey"
                      overlayInnerStyle={{
                        textAlign: "center",
                      }}
                    >
                      <span>{title}</span>
                    </Tooltip>
                  </div>

                  <div>
                    <FontAwesomeIcon icon={faFlag} className={cx("icon")} />
                    <span>Hà Nội, Việt Nam</span>
                  </div>

                  <div onClick={() => setModal2Open(true)}>
                    <FontAwesomeIcon icon={faUser} className={cx("icon")} />
                    <span>{members} people join in</span>
                  </div>
                  <Modal
                    title="Participants"
                    centered
                    open={modal2Open}
                    onOk={() => setModal2Open(false)}
                    onCancel={() => setModal2Open(false)}
                  >
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                  </Modal>

                  <div>
                    <FontAwesomeIcon icon={faCalendar} className={cx("icon")} />
                    <span>
                      From {startDate} to {endDate}
                    </span>
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
            {/* <Outlet /> */}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Vacation;
