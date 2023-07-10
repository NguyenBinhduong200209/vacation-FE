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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailVacation,
  getManyPosts,
  setTimeline,
} from "~/store/slices/vacationSlice";

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
  const isFristReq = useRef(true);
  const totalPage = useRef(0);
  const [modal2Open, setModal2Open] = useState(false);
  const { detail, posts } = useSelector((state) => state.vacation);
  const { authorInfo, cover, members, title, startingTime, endingTime } =
    detail;
  // console.log(detail);
  const [currentPage, setCurrentPage] = useState(1);

  // console.log("detail", detail);
  const startDate = getDate(startingTime);
  const endDate = getDate(endingTime);

  const handleRoute = (url) => {
    navigate(`${url}?vacationID=${vacationID}`);
  };
  // Get vacation detail &7 set activeTimeline
  useEffect(() => {
    dispatch(getDetailVacation(vacationID));
    if (posts.meta.timeline) {
      dispatch(setTimeline(posts.meta.timeline[0]));
    }
  }, []);

  // handle Scroll increase currentPage
  const loadMorePosts = () => {
    if (currentPage < totalPage.current) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // add event onscroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        loadMorePosts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);
  // get list posts of vacation
  useEffect(() => {
    dispatch(
      getManyPosts({
        type: "vacation",
        id: vacationID,
        page: currentPage,
      })
    ).then((res) => {

      console.log(res);
      if (res.payload !== "" && res.payload?.pages !== totalPage.current)
        totalPage.current = res.payload.meta?.pages;

    });
  }, [currentPage]);

  return (
    <>
      <div className={cx("wrapper")}>
        <Header />
        <div className={cx("sidebar")}>
          <Image path={""} alt="This is BG" className={cx("img-BG")} />
          <div className={cx("sidebar-content")}>
            <div className={cx("user-info")}>
              <div className={cx("user-index")}>
                <div className={cx("index")}>{authorInfo?.friends}</div>
                <div className={cx("index-title")}>friends</div>
              </div>
              <div className={cx("user-avatar")}>
                {/* <img path="" alt="" /> */}
                <div className={cx("avatar")}>
                  <Image path={authorInfo?.avatar.path} />
                </div>
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
                  <FontAwesomeIcon icon={faCircleInfo} className={cx("icon")} />
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
                    {startDate} - {endDate}
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
    </>
  );
};

export default Vacation;
