import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Vacation.module.scss";
import classNames from "classnames/bind";
import { VACATION_ROUTE } from "~/utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailVacation,
  getManyPosts,
  getMemberList,
  setTimeline,
} from "~/store/slices/vacationSlice";

import { getDate } from "~/helpers/function";
import { Modal, Tooltip } from "antd";
import Image from "~/components/Image/Image";
import Posts from "./Posts/Posts";
import Album from "./Album/Album";
import UserList from "./components/UserList/UserList";
import HandleVacation from "./HandleVacation/HandleVacation";

const cx = classNames.bind(styles);
const Vacation = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  let vacationID = searchParams.get("vacationID"); // get vacationId of url
  const urlType = searchParams.get("type"); // get type  of url (post || album)
  const isFristReq = useRef(true);
  const totalPage = useRef(0);
  const { detail, posts, memberList } = useSelector((state) => state.vacation);
  const { info } = useSelector((state) => state.auth);
  const {
    authorInfo,
    cover,
    members,
    title,
    description,
    startingTime,
    endingTime,
    shareStatus,
    shareList,
  } = detail;
  console.log(detail);
  const [currentPage, setCurrentPage] = useState(1);
  const [openUserList, setOpenUserList] = useState(false);
  const [open, setOpen] = useState(false);
  const startDate = getDate(startingTime);
  const endDate = getDate(endingTime);

  const handleRoute = (type) => {
    navigate(`${VACATION_ROUTE}?vacationID=${vacationID}&type=${type}`);
  };

  // Get vacation detail &7 set activeTimeline
  useEffect(() => {
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
    ]);
    if (posts?.meta?.timeline) {
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
      if (res.payload !== "" && res.payload?.pages !== totalPage.current)
        totalPage.current = res.payload.meta?.pages;
    });
  }, [currentPage]);
  const isAuthor = info?.id === authorInfo?._id;
  const initVacationDetail = {
    title: title,
    des: description,
    status: shareStatus,
    shareList: shareList,
    dates: [getDate(startingTime), getDate(endingTime)],
    memberList: memberList,
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("sidebar")}>
          <Image path={""} alt="This is BG" className={cx("img-BG")} />
          <div className={cx("sidebar-content")}>
            <div className={cx("user-info")}>
              <div className={cx("user-index")}>
                <div className={cx("index")}>{authorInfo?.friends}</div>
                <div className={cx("index-title")}>friends</div>
              </div>
              <div className={cx("user-avatar")}>
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
                  initVacationDetail={initVacationDetail}
                  type="update"
                  vacationId={vacationID}
                />
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
              <div onClick={() => handleRoute("post")} className={cx("active")}>
                See All Posts
              </div>
              <div onClick={() => handleRoute("album")}>See Album</div>
            </div>
          </div>
        </div>
        <div className={cx("content")}>
          {urlType === null || urlType === "post" ? <Posts /> : <Album />}
        </div>
      </div>
    </>
  );
};

export default Vacation;
