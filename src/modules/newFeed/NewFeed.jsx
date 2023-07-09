import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./NewFeed.module.scss";
import GlowingButton from "./glowing/GlowingButton";

import {
  HeartFilled,
  CommentOutlined,
  EyeOutlined,
  FileTextOutlined,
  PictureOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { getListVacation } from "~/store/slices/vacationSlice";
import { getTrendingPlace } from "~/store/slices/locationSlice";
import { getDate } from "~/helpers/function";
import Image from "~/components/Image/Image";
import { useNavigate } from "react-router-dom";
import CreateVacation from "./CreateVacation/CreateVacation";
import CreateAlbum from "../album/CreateAlbum/CreateAlbum";
import SelectLocation from "../components/SelectLocation/SelectLocation";
// import Preloader from "../Preloader/Preloader";
const cx = classNames.bind(styles);
const NewFeed = () => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // State variable for current page number
  const [open, setOpen] = useState(false);
  const [openAlbum, setOpenAlbum] = useState(false);

  const { info } = useSelector((state) => state.auth);
  console.log(info);
  const { listVacation } = useSelector((state) => state.vacation);
  const { trendingList } = useSelector((state) => state.location);

  // Get new list of vacation when the currentPage change
  useEffect(() => {
    if (!listVacation?.meta?.pages || currentPage <= listVacation.meta.pages) {
      dispatch(
        getListVacation({
          page: currentPage,
          type: "newFeed",
        })
      );
    }
  }, [currentPage]);

  // Get list of trending place
  useEffect(() => {
    dispatch(
      getTrendingPlace({
        type: "trending",
        number: 7,
      })
    );
  }, []);

  // increase currentPage when at bottom page

  const loadMorePosts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // add scroll event when component mounted
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

  // handle open add album modal

  const handleOpenAlbumModal = () => {
    setOpenAlbum(true);
  };
  // handle close add album modal

  const handleCloseAlbumModal = () => {
    setOpenAlbum(false);
  };


  return (
    <div className={cx("container")}>
      {/* <Preloader /> */}
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
              <li>{info?.totalFriends}</li>
              <div className={cx("user-info-header-line")}>friends</div>
            </div>
            <Image
              path={info.avatar?.path}
              className={cx("user-info-bgava")}
              alt=""
            />
            <div className={cx("user-info-header-details")}>
              <li>{info?.totalPosts}</li>
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
          <Image path={info.avatar?.path} className={cx("user-ava")} alt="" />
          <div className={cx("create-posts")}>
            <button className={cx("create-line")}>
              Every step is a milestone ...{" "}
            </button>
            <div className={cx("create-details")}>
              <button className={cx("create-sthg")}>
                <FileTextOutlined />
                <div className={cx("create-sthg-details")}>Add Post</div>
              </button>
              <button className={cx("create-sthg")}>
                <PictureOutlined />
                <div
                  className={cx("create-sthg-details")}
                  onClick={() => setOpenAlbum(true)}
                >
                  Add Album
                </div>
              </button>
              <CreateAlbum setOpen={setOpenAlbum} open={openAlbum} />
              <button className={cx("create-sthg")}>
                <FolderOpenOutlined />
                <div
                  className={cx("create-sthg-details")}
                  onClick={() => setOpen(true)}
                >
                  Add Vacation
                </div>
              </button>
              <CreateVacation setOpen={setOpen} showModal={open} />
            </div>
          </div>
        </div>
        <ul>
          {listVacation.list?.map((vacation) => (
            <a
              key={vacation._id}
              className={cx("feed-post")}
              href={`/vacation/post?vacationID=${vacation._id}`}
            >
              <div className={cx("feed-head")}>
                <Image
                  path={vacation.authorInfo.avatar?.path}
                  alt=""
                  className={cx("feed-ava")}
                />
                <div className={cx("feed-head-info")}>
                  <div className={cx("feed-user-name")}>
                    @{vacation.authorInfo.username}
                  </div>
                  <div className={cx("feed-time")}>
                    {getDate(vacation.startingTime)} -{" "}
                    {getDate(vacation.endingTime)}
                  </div>
                </div>
              </div>
              <div className={cx("feed-cover")}>
                <img src={vacation.cover?.path} alt="???" />
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
  );
};

export default NewFeed;
