import React, { useState, useEffect } from "react";
import axiosClient from "~/api/axiosClient";
import "./Slider.css";
import { useSearchParams } from "react-router-dom";
import styles from "./Slider.module.scss";
import classNames from "classnames/bind";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

const Slider = ({ onImageSelect, selectedImages, onImageRemove }) => {
  const [active, setActive] = useState(0);
  const [img, setImg] = useState([]);
  const cardCount = img.length;
  const [searchParams] = useSearchParams();
  const dataId = Object.fromEntries([...searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchImg = await axiosClient.get(`vacation/${dataId.id}/images`);
        setImg(fetchImg.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dataId.id]);

  const prevSlide = () => {
    setActive((active - 1 + cardCount) % cardCount);
  };

  const nextSlide = () => {
    setActive((active + 1) % cardCount);
  };

  useEffect(() => {
    const cardContainers = document.querySelectorAll(
      `.${cx("card-container")}`
    );

    cardContainers.forEach((container, i) => {
      const offset = ((active - i) % cardCount) / 3;
      const direction = Math.sign(active - i);
      const absOffset = Math.abs(active - i) / 3;
      const isActive = i === active ? 1 : 0;
      const opacity = Math.abs(active - i) <= 1 ? 1 : 0;

      container.style.setProperty("--offset", offset);
      container.style.setProperty("--direction", direction);
      container.style.setProperty("--abs-offset", absOffset);
      container.style.setProperty("--active", isActive);
      container.style.setProperty("--opacity", opacity);
    });
  }, [active, cardCount]);

  return (
    <div className={cx("carousel-container")}>
      {img.length === 0 ? (
        <div className={cx("no-picture")}>No pictures available.</div>
      ) : (
        <div className={cx("carousel")}>
          {img.map((item, index) => (
            <div className={cx("card-container")} key={index}>
              <div className={cx("card")}>
                <img src={item?.path} alt="?" />
                <button
                  onClick={() => {
                    if (
                      !selectedImages.some((image) => image._id === item._id)
                    ) {
                      onImageSelect(item);
                    }
                  }}
                  disabled={selectedImages.some(
                    (image) => image._id === item._id
                  )}
                >
                  {selectedImages.some((image) => image._id === item._id)
                    ? "Selected"
                    : "Select this image"}
                </button>
              </div>
            </div>
          ))}
          <button className={cx("nav-left")} onClick={prevSlide}>
            <LeftCircleOutlined />
          </button>
          <button className={cx("nav-right")} onClick={nextSlide}>
            <RightCircleOutlined />
          </button>
        </div>
      )}
    </div>
  );
};

export default Slider;
