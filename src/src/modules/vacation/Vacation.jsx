import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Vacation.module.scss";
import classNames from "classnames/bind";
import { VACATION_ROUTE } from "~/utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Tooltip } from "antd";
import {
  getDetailVacation,
  getManyPosts,
  getMemberList,
  isPostListChanged,
  setTimeline,
} from "~/store/slices/vacationSlice";
import { getDate } from "~/helpers/function";
import Posts from "./Posts/Posts";
import Album from "./Album/Album";
import UserList from "./components/UserList/UserList";
import HandleVacation from "./HandleVacation/HandleVacation";
import Preloader from "~/components/Preloader/Preloader";
import ImageField from "~/components/ImageField/ImageField";
const cx = classNames.bind(styles);
const Vacation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  let vacationID = searchParams.get("vacationID"); // get vacationId of url
  const urlType = searchParams.get("type") || "post"; // get type  of url (post || album)
  const { info } = useSelector((state) => state.auth);
  const { detail, posts, memberList } = useSelector((state) => state.vacation);
  const { authorInfo, cover, members, title, startingTime, endingTime } =
    detail;
  const { page, pages, timeline, totalPost, isUpdatePost } = posts;
  const currentPage = useRef(1);
  const [openUserList, setOpenUserList] = useState(false);
  const [open, setOpen] = useState(false);
  const [preload, setPreload] = useState(true);
  const startDate = getDate(startingTime);
  const endDate = getDate(endingTime);

  const handleRoute = (type) => {
    navigate(`${VACATION_ROUTE}?vacationID=${vacationID}&type=${type}`);
  };
  // Get vacation detail &7 set activeTimeline
  useEffect(() => {
    setPreload(true);

    if (urlType === "post") {
      Promise.all([
        dispatch(getDetailVacation(vacationID)),
        dispatch(
          getMemberList({
            type: "vacations",
            id: vacationID,
            listType: "memberList",
            page: 1,
          })
        ),
        dispatch(
          getManyPosts({
            type: "vacation",
            id: vacationID,
            page: 1,
          })
        ),
      ]).then(() => setPreload(false));
      if (timeline) {
        dispatch(setTimeline(timeline[0]));
      }
    }
  }, []);

  useEffect(() => {
    if (isUpdatePost) {
      dispatch(
        getManyPosts({
          type: "vacation",
          id: vacationID,
          page: 1,
        })
      );

      dispatch(isPostListChanged(false));
    }
  }, [isUpdatePost, dispatch, vacationID]);

  // handle Scroll increase currentPage
  const loadMorePosts = () => {
    if (page < pages && page === currentPage.current) {
      dispatch(
        getManyPosts({
          type: "vacation",
          id: vacationID,
          page: page + 1,
        })
      );
      currentPage.current += 1;
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
  }, [page]);

  //check user is author or not
  const isAuthor = info?._id === authorInfo?._id;

  return (
    <>
      {preload ? (
        <Preloader />
      ) : (
        <div className={cx("wrapper")}>
          <div className={cx("sidebar")}>
            <ImageField
              src={cover?.path}
              className={cx("img-BG")}
              preview={false}
            />
            <div className={cx("sidebar-content")}>
              <div className={cx("user-info")}>
                <div className={cx("user-index")}>
                  <div className={cx("index")}>{authorInfo?.friends}</div>
                  <div className={cx("index-title")}>friends</div>
                </div>
                <div className={cx("user-avatar")}>
                  <Avatar
                    src={authorInfo?.avatar.path}
                    shape="square"
                    size={100}
                    className={cx("avatar")}
                  />

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
                  {isAuthor && (
                    <FontAwesomeIcon
                      icon={faPen}
                      className={cx("title-icon")}
                      onClick={() => setOpen(true)}
                    />
                  )}
                  <HandleVacation
                    setOpen={setOpen}
                    showModal={open}
                    type="update"
                    vacationId={vacationID}
                  />
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

                  <div onClick={() => setOpenUserList(true)}>
                    <FontAwesomeIcon icon={faUser} className={cx("icon")} />
                    <span>{members} people join in</span>
                  </div>
                  <UserList
                    openUserList={openUserList}
                    setOpenUserList={setOpenUserList}
                    title="Member List"
                    list={memberList}
                  />

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
                  onClick={() => handleRoute("post")}
                  className={cx(urlType === "post" && "active")}
                >
                  See All Posts
                </div>
                <div
                  onClick={() => handleRoute("album")}
                  className={cx(urlType === "album" && "active")}
                >
                  See Album
                </div>
              </div>
            </div>
          </div>
          <div className={cx("content")}>
            {urlType === null || urlType === "post" ? <Posts /> : <Album />}
          </div>
        </div>
      )}
    </>
  );
};

export default Vacation;
