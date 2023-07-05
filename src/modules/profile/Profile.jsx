import React, { useRef } from "react";
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
          `https://vacation-backend.onrender.com/album?page=${currentPage}`
        );
        setAlbum(fetchAlbum.data.data);
        console.log(fetchAlbum);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage]);

  console.log(album);

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

  const scrollToTop = useRef(null);

  const handleShowVacations = () => {
    setShowVacations(true);
    setShowAlbums(false);
    scrollToTop.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleShowAlbums = () => {
    setShowVacations(false);
    setShowAlbums(true);
    scrollToTop.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={cx("user-info-background")}>
        <img
          src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          alt="?"
          className={cx("user-info-bgimg")}
        />
      </div>
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
              <div className={cx("user-info-grid")}>
                <div className={cx("grid-item", "one")}>
                  <div className={cx("grid-item-value")}>
                    {user?.totalFriends}
                  </div>
                  <div className={cx("grid-item-label")}>
                    {user?.totalFriends === 0
                      ? "No friends"
                      : user?.totalFriends === 1
                      ? "Friend"
                      : "Friends"}
                  </div>
                </div>
                <div className={cx("grid-item", "two")}>
                  <div className={cx("grid-item-value")}>
                    {user?.totalVacations}
                  </div>
                  <div className={cx("grid-item-label")}>
                    {user?.totalVacations === 0
                      ? "No vacations"
                      : user?.totalVacations === 1
                      ? "Vacation"
                      : "Vacations"}
                  </div>
                </div>
                <div className={cx("grid-item", "three")}>
                  <div className={cx("grid-item-value")}>
                    {user?.totalPosts}
                  </div>
                  <div className={cx("grid-item-label")}>
                    {user?.totalPosts === 0
                      ? "No posts"
                      : user?.totalPosts === 1
                      ? "Post"
                      : "Posts"}
                  </div>
                </div>
                <div className={cx("grid-item", "four")}>
                  <div className={cx("grid-item-value")}>
                    {user?.totalLikes}
                  </div>
                  <div className={cx("grid-item-label")}>
                    {user?.totalLikes === 0
                      ? "No likes"
                      : user?.totalLikes === 1
                      ? "Like"
                      : "Likes"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div ref={scrollToTop} />
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
      <div className={cx("container")}>
        <div className={cx("content")}>
          {showVacations && (
            <div className={cx("feed")}>
              <ul>
                {vacations.map((vacation) => (
                  <li key={vacation._id} className={cx("feed-post")}>
                    <div className={cx("feed-cover")}>
                      <img src={vacation.cover.path} alt="???" />
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
              <div className={cx("album-grid")}>
                {album.map((album) => (
                  <div key={album.id} className={cx("album-background")}>
                    <div className={cx("album-background-content")}>
                      <img
                        src="https://media.cntraveller.com/photos/611be8514e09f53b43732776/16:9/w_2560%2Cc_limit/hanoi-vietnam-condnenastraveller-18sep13-getty_b.jpg"
                        alt="???"
                      />
                      <div>{album.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
