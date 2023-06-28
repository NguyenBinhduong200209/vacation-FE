import React from "react";
import classNames from "classnames/bind";
import styles from "./NewFeed.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
import axiosClient from "~/api/axiosClient";
// import { object } from "prop-types";
import {
  HeartFilled,
  CommentOutlined,
  EyeOutlined,
  FileTextOutlined,
  PictureOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
=======
import Image from "~/components/Image/Image";
>>>>>>> dd3ed9c (add createPost component)
// import Preloader from "../Preloader/Preloader";

const NewFeed = () => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });

  const [locations, setLocations] = useState([]); // State variable for trending locations
  const [vacations, setVacation] = useState([]); // State variable for feed posts
  const [user, setUser] = useState({}); // State variable for user information
  const [currentPage, setCurrentPage] = useState(1); // State variable for current page number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchTrendingPlace = await axiosClient.get(
          `https://vacation-backend.onrender.com/location/?type=trending&number=7`
        );
        setLocations(fetchTrendingPlace.data.data);

        const fetchVacation = await axiosClient.get(
          `https://vacation-backend.onrender.com/vacation?page=${currentPage}&type=newFeed`
        );

        fetchVacation.data &&
          setVacation((prevPosts) => prevPosts.concat(fetchVacation.data.data));

        const fetchUser = await axiosClient.get(
          `https://vacation-backend.onrender.com/auth/info`
        );
        setUser(fetchUser.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage]);

  // console.log(vacations);

  const cx = classNames.bind(styles);

  const loadMorePosts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

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
              <li>{user?.totalFriends}</li>
              <div className={cx("user-info-header-line")}>friends</div>
            </div>
            <img src={user?.avatar} className={cx("user-info-bgava")} alt="" />
            <div className={cx("user-info-header-details")}>
              <li>{user?.totalPosts}</li>
              <div className={cx("user-info-header-line")}>Posts</div>
            </div>
          </div>
          <div className={cx("user-info-fullname")}>
            <li>{user?.lastname}</li>
            <li>{user?.firstname}</li>
          </div>
          <li className={cx("user-info-username")}>@{user?.username}</li>
          <li className={cx("user-info-des")}>{user?.description}</li>
          <div className={cx("user-info-line")}></div>
          <button className={cx("user-info-btn")}>See Profile</button>
        </div>
      </div>
      <div className={cx("feed")}>
        <div className={cx("create")}>
          <img src={user?.avatar} className={cx("user-ava")} alt="" />
          <div className={cx("create-posts")}>
            <button className={cx("create-line")}>
              {" "}
              Every step is a milestone ...{" "}
            </button>
            <div className={cx("create-details")}>
              <button className={cx("create-sthg")}>
                <FileTextOutlined />
                <div className={cx("create-sthg-details")}>Add Post</div>
              </button>
              <button className={cx("create-sthg")}>
                <PictureOutlined />
                <div className={cx("create-sthg-details")}>Add Album</div>
              </button>
              <button className={cx("create-sthg")}>
                <FolderOpenOutlined />
                <div className={cx("create-sthg-details")}>Add Vacation</div>
              </button>
            </div>
          </div>
        </div>
        <ul>
          {vacations.map((vacation) => (
<<<<<<< HEAD
            <li key={vacation._id} className={cx("feed-post")}>
              <div className={cx("feed-head")}>
                <img
                  src={vacation.authorInfo.avatar}
                  alt="?"
                  className={cx("feed-ava")}
                />
                <div className={cx("feed-head-info")}>
                  <div className={cx("feed-user-name")}>
                    @{vacation.authorInfo.username}
                  </div>
                  <div className={cx("feed-time")}>
                    {vacation.startingTime.slice(0, 10)} -{" "}
                    {vacation.endingTime.slice(0, 10)}
                  </div>
                </div>
              </div>
              <div className={cx("feed-cover")}>
                <img src={vacation.cover} alt="???" />
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
=======
            <li key={vacation._id}>
              {/* <div>{vacation.authorInfo._id}</div> */}
              <Image src={vacation.authorInfo.avatar} alt="?" />
              <div>{vacation.authorInfo.username}</div>
              <div>
                {vacation.startingTime} - {vacation.endingTime}
              </div>
              <Image src={vacation.cover} alt="???" />
              <div>{vacation.views}</div>
              <div>{vacation.likes}</div>
              <div>{vacation.comments}</div>
              <div>{vacation.title}</div>
>>>>>>> dd3ed9c (add createPost component)
            </li>
          ))}
        </ul>
      </div>
      <div className={cx("trending")}>
        <h2 className={cx("trending-title")}>Trending Place Today</h2>
        <ul>
          {locations.map((location) => (
            <li key={location._id}># {location.title}</li>
          ))}
          <div className={cx("trending-more")}>...</div>
        </ul>
      </div>
    </div>
  );
};

export default NewFeed;
