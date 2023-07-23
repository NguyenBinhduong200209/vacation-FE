import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./NewAlbum.module.scss";
import classNames from "classnames/bind";
import Slider from "./Slider/Slider";
import "./Preloader.scss";
import { useSearchParams } from "react-router-dom";
import Image from "./Image/Image";
const cx = classNames.bind(styles);

const NewAlbum = () => {
  const list = useSelector((state) => state.album.selectedImages);
  const [searchParams] = useSearchParams();
  const dataId = Object.fromEntries(searchParams);
  const [containerSize, setContainerSize] = useState({ outerWidth: 0, outerHeight: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setContainerSize({ outerWidth: ref.current.offsetWidth, outerHeight: ref.current.offsetHeight });
  }, [ref]);

  const handleWrapClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div>
      <div className={`wrap ${isOpen ? "open" : ""}`}>
        <div className="overlay" onClick={handleWrapClick}>
          <div className="overlay-content animate slide-left delay-2">
            <h1 className="animate slide-left pop delay-4 line">{dataId.title}</h1>
            <p className="animate slide-left pop delay-5" style={{ color: "white", marginBottom: "2.5rem" }}>
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
                <Image key={item._id} imgData={item} containerSize={containerSize} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Slider />
    </div>
  );
};

export default NewAlbum;
