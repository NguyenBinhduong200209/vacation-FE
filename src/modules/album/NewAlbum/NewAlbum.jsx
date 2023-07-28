import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./NewAlbum.module.scss";
import classNames from "classnames/bind";
import Slider from "./Slider/Slider";
import VacationDetail from "./VacationDetail/VacationDetail";
import "./Preloader.scss";
import Image from "./Image/Image";
import {
  createAlbumPage,
  getAlbumPage,
  updateAlbumPage,
  resetSelectedImages,
} from "~/store/slices/albumSlice";
import ImageField from "~/components/ImageField/ImageField";
import { Avatar } from "antd";
const cx = classNames.bind(styles);

const NewAlbum = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { selectedImages, selectedPageId, userInfo } = useSelector((state) => state.album);
  const { authorInfo, cover } = useSelector((state) => state.vacation.detail);
  const { info } = useSelector((state) => state.auth);
  const { title, id, albumId } = Object.fromEntries(searchParams);
  const creatorId = searchParams.get("userId");
  const [containerSize, setContainerSize] = useState({
    outerWidth: 0,
    outerHeight: 0,
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setContainerSize({
      outerWidth: ref.current.offsetWidth,
      outerHeight: ref.current.offsetHeight,
    });
  }, [ref]);

  useEffect(() => {
    dispatch(resetSelectedImages());
    dispatch(getAlbumPage({ page: 1, albumId }));
  }, [dispatch, albumId]);

  const saveAlbum = () => {
    dispatch(
      createAlbumPage({
        albumId: albumId,
        vacationId: id,
        page: 1,
        resource: selectedImages.map((item) => {
          return {
            style: item.style,
            resourceId: item._id,
          };
        }),
      })
    ).then(() => navigate("/profile/album"));
  };

  const updateAlbum = () => {
    dispatch(
      updateAlbumPage({
        albumpageId: selectedPageId,
        data: {
          albumId: albumId,
          vacationId: id,
          page: 1,
          resource: selectedImages.map((item) => ({
            style: item.style,
            resourceId: item._id,
          })),
        },
      })
    ).then(() => navigate("/profile/album"));
  };

  const handleWrapClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("sidebar")}>
        <ImageField src={cover?.path} className={cx("img-BG")} preview={false} />
        <div className={cx("sidebar-content")}>
          <div className={cx("user-info")}>
            <div className={cx("user-avatar")}>
              <Avatar src={authorInfo?.avatar?.path} shape="square" size={100} className={cx("avatar")} />
              <div className={cx("fullname")}>
                {authorInfo?.firstname} {authorInfo?.lastname}
              </div>
              <div className={cx("username")}>{authorInfo?.username}</div>
            </div>
          </div>
          <VacationDetail vacationId={id} />
          <div className={cx("route")}>
            {creatorId === info._id && (
              <>
                <button type="button" className={cx("save-btn")} onClick={saveAlbum}>
                  Save
                </button>
                <button type="button" className={cx("save-btn")} onClick={updateAlbum}>
                  Update
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        <div>
          <div className={`wrap ${isOpen ? "open" : ""}`}>
            <div className="overlay" onClick={handleWrapClick}>
              <div className="overlay-content animate slide-left delay-2">
                <h1 className="animate slide-left pop delay-4 line">{title}</h1>
                <p
                  className="animate slide-left pop delay-5"
                  style={{ color: "white", marginBottom: "2.5rem" }}
                >
                  Sign: <em>{userInfo?.username}</em>
                </p>
              </div>
              <div className="image-content animate slide delay-5"></div>
              <div className="dots animate">
                <div className="dot animate slide-up delay-6"></div>
                <div className="dot animate slide-up delay-7"></div>
                <div className="dot animate slide-up delay-8"></div>
              </div>
            </div>
            <div className="text">
              <div className={cx("wrapper")}>
                <div className={cx(creatorId === info._id ? "mother" : "mother-banned-you")} ref={ref}>
                  {selectedImages.map((item) => (
                    <Image key={item._id} imgData={item} containerSize={containerSize} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default NewAlbum;
