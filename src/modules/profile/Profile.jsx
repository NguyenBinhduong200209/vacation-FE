import React from "react";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { useState, useEffect } from "react";
import axiosClient from "~/api/axiosClient";
import { HeartFilled, CommentOutlined, EyeOutlined } from "@ant-design/icons";

const Profile = () => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });

  const [vacations, setVacations] = useState([]);
  const [user, setUser] = useState({});
  const [album, setAlbum] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showVacations, setShowVacations] = useState(true);
  const [showAlbums, setShowAlbums] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchVacation = await axiosClient.get(
          `https://vacation-backend.onrender.com/vacation?page=${currentPage}&type=userProfile`
        );

        fetchVacation.data &&
          setVacations((prevPosts) =>
            prevPosts.concat(fetchVacation.data.data)
          );

        const fetchUser = await axiosClient.get(
          `https://vacation-backend.onrender.com/auth/info`
        );
        setUser(fetchUser.data.data);

        const fetchAlbum = await axiosClient.get(
          `https://vacation-backend.onrender.com/album`
        );
        setAlbum(fetchAlbum.data.data);
        console.log(fetchAlbum);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage]);

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

  const handleShowVacations = () => {
    setShowVacations(true);
    setShowAlbums(false);
  };

  const handleShowAlbums = () => {
    setShowVacations(false);
    setShowAlbums(true);
  };

  return (
    <div className={cx("container")}>
      {/* <div className={cx("user-info-background")}>
        <img
          src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          alt="?"
          className={cx("user-info-bgimg")}
        />
      </div> */}
      <div className={cx("display")}>
        <div className={cx("user-info")}>
          <div className={cx("user-info-head")}>
            <div className={cx("user-info-header")}>
              <img
                src={user?.avatar}
                className={cx("user-info-bgava")}
                alt=""
              />
              <div className={cx("user-info-fullname")}>
                <li>{user?.lastname}</li>
                <li>{user?.firstname}</li>
              </div>
              <li className={cx("user-info-username")}>@{user?.username}</li>
              <li className={cx("user-info-des")}>{user?.description}</li>
              <li>{user?.totalFriends}</li>
              <li>{user?.totalPosts}</li>
              <li>{user?.totalVacations}</li>
              <li>{user?.totalLikes}</li>
            </div>
          </div>
        </div>
        <div className={cx("navigation")}>
          <div
            className={cx("nav-item", { active: showVacations })}
            onClick={handleShowVacations}
          >
            Vacations
          </div>
          <div
            className={cx("nav-item", { active: showAlbums })}
            onClick={handleShowAlbums}
          >
            Albums
          </div>
        </div>
      </div>
      <div className={cx("content")}>
        {showVacations && (
          <div className={cx("feed")}>
            <ul>
              {vacations.map((vacation) => (
                <li key={vacation._id} className={cx("feed-post")}>
                  <div className={cx("feed-head")}>
                    <img
                      src={user?.avatar}
                      className={cx("user-info-bgava")}
                      alt=""
                    />
                    <div className={cx("feed-head-info")}>
                      <div className={cx("user-info-username")}>
                        @{user?.username}
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
                </li>
              ))}
            </ul>
          </div>
        )}
        {showAlbums && (
          <div className={cx("albums")}>
            {album.map((album) => (
              <div>{album.title}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
