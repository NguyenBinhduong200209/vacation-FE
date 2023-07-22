import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NewFeed.module.scss";
import GlowingButton from "./glowing/GlowingButton";
import { Avatar } from "antd";
import {
  HeartFilled,
  CommentOutlined,
  EyeOutlined,
  FileTextOutlined,
  PictureOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { getListVacation, resetList } from "~/store/slices/vacationSlice";

import { getTrendingPlace } from "~/store/slices/locationSlice";
import { getDate } from "~/helpers/function";
import CreateAlbum from "../album/CreateAlbum/CreateAlbum";
import HandleVacation from "../vacation/HandleVacation/HandleVacation";
import Preloader from "~/components/Preloader/Preloader";
import { getInfoUser } from "~/store/slices/authSlice";
import images from "~/images";

const cx = classNames.bind(styles);
const NewFeed = () => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.auth);
  const { listVacation } = useSelector((state) => state.vacation);
  const { trendingList } = useSelector((state) => state.location);
  const [preLoader, setPreLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [openAlbum, setOpenAlbum] = useState(false);
  const currentPage = useRef(1);
  const initVacationDetail = {
    title: "",
    des: "",
    memberList: [],
    dates: [],
    status: "Public",
  };

  // Get list of trending place
  useEffect(() => {
    setPreLoader(true);
    dispatch(resetList());
    Promise.all([
      dispatch(
        getTrendingPlace({
          type: "trending",
          number: 7,
        })
      ),
      dispatch(
        getListVacation({
          page: 1,
          type: "newFeed",
        })
      ),
      dispatch(getInfoUser()),
    ]).then((res) => setPreLoader(false));
  }, []);

  // Get list of trending place
  useEffect(() => {
    Promise.all([
      dispatch(
        getTrendingPlace({
          type: "trending",
          number: 7,
        })
      ),
      dispatch(
        getListVacation({
          page: 1,
          type: "newFeed",
        })
      ),
    ]);
  }, []);

  const loadMorePosts = () => {
    if (
      listVacation.page < listVacation.pages &&
      listVacation.page === currentPage.current
    ) {
      dispatch(
        getListVacation({
          page: listVacation.page + 1,
          type: "newFeed",
        })
      );
      currentPage.current += 1;
    }
  };

  // add scroll event when component mounted
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
  }, [dispatch, listVacation.page]);

  return (
    <>
      {preLoader ? (
        <Preloader />
      ) : (
        <div className={cx("container")}>
          <div className={cx("user-info")}>
            <div className={cx("user-cover-linear")}></div>
            <div className={cx("user-info-background")}>
              <img
                src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                alt="?"
                className={cx("user-info-bgimg")}
              />
            </div>
            <div className={cx("user-info-head")}>
              <div className={cx("user-info-header")}>
                <div className={cx("user-info-header-details")}>
                  <NavLink to="profile/friends">{info?.friends}</NavLink>
                  <div className={cx("user-info-header-line")}>friends</div>
                </div>
                <Avatar
                  src={info.avatar?.path}
                  className={cx("user-info-bgava")}
                />
                <div className={cx("user-info-header-details")}>
                  <NavLink to="profile">{info?.posts}</NavLink>
                  <div className={cx("user-info-header-line")}>Posts</div>
                </div>
              </div>
              <div className={cx("user-info-fullname")}>
                <li>{info?.lastname}</li>
                <li>{info?.firstname}</li>
              </div>
              <li className={cx("user-info-username")}>@{info?.username}</li>
              <li className={cx("user-info-des")}>{info?.description}</li>
              <div className={cx("user-info-line")}></div>
              <button className={cx("user-info-btn")}>See Profile</button>
            </div>
          </div>
          <div className={cx("feed")}>
            <div className={cx("create")}>
              <Avatar
                size={50}
                src={info.avatar?.path}
                className={cx("user-ava")}
                alt=""
              />
              <div className={cx("create-posts")}>
                <button className={cx("create-line")}>
                  Every step is a milestone ...{" "}
                </button>
                <div className={cx("create-details")}>
                  <button className={cx("create-sthg")}>
                    <FileTextOutlined />
                    <div className={cx("create-sthg-details")}>Add Post</div>
                  </button>
                  <button
                    className={cx("create-sthg")}
                    onClick={() => setOpenAlbum(true)}
                  >
                    <PictureOutlined />

                    <div
                      className={cx("create-sthg-details")}
                      onClick={() => setOpenAlbum(true)}
                    >
                      Add Album
                    </div>
                  </button>
                  <CreateAlbum setOpen={setOpenAlbum} open={openAlbum} />
                  <button
                    className={cx("create-sthg")}
                    onClick={() => setOpen(true)}
                  >
                    <FolderOpenOutlined />

                    <div
                      className={cx("create-sthg-details")}
                      onClick={() => setOpen(true)}
                    >
                      Add Vacation
                    </div>
                  </button>
                  <HandleVacation
                    setOpen={setOpen}
                    showModal={open}
                    initVacationDetail={initVacationDetail}
                    type="create"
                  />
                </div>
              </div>
            </div>
            <ul>
              {listVacation.list?.map((vacation) => (
                <a
                  key={vacation._id}
                  className={cx("feed-post")}
                  href={`/vacation?vacationID=${vacation._id}`}
                >
                  <div className={cx("feed-head")}>
                    <Avatar
                      src={vacation.authorInfo?.avatar?.path}
                      className={cx("feed-ava")}
                    />
                    <div className={cx("feed-head-info")}>
                      <div className={cx("feed-user-name")}>
                        @{vacation.authorInfo?.username}
                      </div>
                      <div className={cx("feed-time")}>
                        {getDate(vacation.startingTime)} -{" "}
                        {getDate(vacation.endingTime)}
                      </div>
                    </div>
                  </div>
                  <div className={cx("feed-cover")}>
                    <img
                      src={vacation.cover?.path || images.noImage}
                      alt="This is Vacation cover"
                    />
                    <div className={cx("feed-cover-rad")}></div>
                    <div className={`${cx("cover-item")} ${cx("views")}`}>
                      <EyeOutlined />
                      {formatter.format(vacation.views)}
                    </div>
                    <div className={`${cx("cover-item")} ${cx("likes")}`}>
                      <HeartFilled />
                      {formatter.format(vacation.likes)}
                    </div>
                    <div className={`${cx("cover-item")} ${cx("cmts")}`}>
                      <CommentOutlined />
                      {formatter.format(vacation.comments)}
                    </div>
                  </div>
                  <div className={cx("feed-title-center")}>
                    <div className={cx("feed-title")}>{vacation.title}</div>
                  </div>
                </a>
              ))}
            </ul>
          </div>
          <div className={cx("trending")}>
            <h2 className={cx("trending-title")}>
              <GlowingButton />
            </h2>
            <ul>
              {trendingList?.map((location) => (
                <li key={location._id} className={cx("underline")}>
                  # {location.title}
                </li>
              ))}
              <div className={cx("trending-more")}>...</div>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default NewFeed;
