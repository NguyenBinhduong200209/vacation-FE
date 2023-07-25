import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./NewAlbum.module.scss";
import classNames from "classnames/bind";
import Slider from "./Slider/Slider";
import "./Preloader.scss";
import albumAPI from "~/api/albumAPI";
import { useSearchParams } from "react-router-dom";
import Image from "./Image/Image";
import axios from "axios";
import axiosClient from "~/api/axiosClient";
const cx = classNames.bind(styles);

const NewAlbum = () => {
  const list = useSelector((state) => state.album.selectedImages);
  const [searchParams] = useSearchParams();
  const albumId = searchParams.get("albumId");
  const vacationId = searchParams.get("id");
  const dataId = Object.fromEntries(searchParams);
  const [containerSize, setContainerSize] = useState({
    outerWidth: 0,
    outerHeight: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  const saveAlbum = async (e) => {
    e.preventDefault();
    try {
      const data = {
        albumId: albumId,
        vacationId: vacationId,
        page: 1,
        resource: list.map((item) => ({
          style: item.style,
          resourceId: item._id
        }))
			};
			const res = await axiosClient.post("https://vacation-social-network.onrender.com/album/", data);
      navigate("/profile/album");
		} catch (error) {
			console.log(error);
		}
	};


  useEffect(() => {
    setContainerSize({
      outerWidth: ref.current.offsetWidth,
      outerHeight: ref.current.offsetHeight,
    });
  }, [ref]);

  const handleWrapClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <div>
        <div className={`wrap ${isOpen ? "open" : ""}`}>
          <div className="overlay" onClick={handleWrapClick}>
            <div className="overlay-content animate slide-left delay-2">
              <h1 className="animate slide-left pop delay-4 line">
                {dataId.title}
              </h1>
              <p
                className="animate slide-left pop delay-5"
                style={{ color: "white", marginBottom: "2.5rem" }}
              >
                Sign: <em>Creator</em>
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
              <div className={cx("mother")} ref={ref}>
                {list.map((item) => (
                  <Image
                    key={item._id}
                    imgData={item}
                    containerSize={containerSize}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Slider />
      </div>
      <button className={cx("save-btn")} onClick={saveAlbum}>
        Save
      </button>
    </>
  );
};

export default NewAlbum;
