import React, { useState, useEffect } from "react";
import axiosClient from "~/api/axiosClient";
import "./Slider.css";
import { useSearchParams } from "react-router-dom";
import styles from "./Slider.module.scss";
import classNames from "classnames/bind";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setImageUrl } from "~/store/slices/slice";

const cx = classNames.bind(styles);

const Slider = ({ onImageSelect }) => {
  const [active, setActive] = useState(0);
  const [img, setImg] = useState([]);
  const cardCount = img.length;
  const [searchParams] = useSearchParams();
  const dataId = Object.fromEntries([...searchParams]);

  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageUrl = event.target.result;
      dispatch(setImageUrl(imageUrl));
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchImg = await axiosClient.get(`vacation/${dataId.id}/images`);
        setImg(fetchImg.data.data);
        console.log(fetchImg);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dataId.id]);
  console.log(img);

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

  console.log(active, img);

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
              </div>
              <button onClick={() => onImageSelect(item?.path)}>
                Select this image
              </button>
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
