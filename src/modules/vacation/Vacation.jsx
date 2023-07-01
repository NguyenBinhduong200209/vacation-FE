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
import axiosClient from "~/api/axiosClient";

const cx = classNames.bind(styles);
const Vacation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal2Open, setModal2Open] = useState(false);
  const { detail, isLoading, posts } = useSelector((state) => state.vacation);
  const { authorInfo, cover, members, title, startingTime, endingTime } =
    detail;
  const { totalPost } = posts;
  const startDate = getDate(startingTime);
  const endDate = getDate(endingTime);
  let [searchParams] = useSearchParams();
  let vacationID = searchParams.get("vacationID");
  console.log(posts);
  const handleRoute = (url) => {
    navigate(`${url}?vacationID=${vacationID}`);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosClient.get(
        "https://vacation-backend.onrender.com/vacation?page=1&type=userProfile"
      );
      console.log(res);
    };

    fetch();
  }, []);

  useEffect(() => {
    Promise.all([
      dispatch(getDetailVacation(vacationID)),
      dispatch(getManyPosts({ type: "vacation", id: vacationID, page: 1 })),
    ]);
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={cx("wrapper")}>
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
                  <div className={cx("index")}>{totalPost || 0}</div>
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
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Vacation;
