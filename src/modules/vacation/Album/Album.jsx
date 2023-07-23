import React, { useState, useEffect } from "react";
import axiosClient from "~/api/axiosClient";
import styles from "./Album.module.scss";
import classNames from "classnames/bind";
import { useSearchParams } from "react-router-dom";

const cx = classNames.bind(styles);

const Album = () => {
  const [img, setImg] = useState([]);
  const [searchParams] = useSearchParams();
  const dataId = Object.fromEntries([...searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchImg = await axiosClient.get(
          `vacation/${dataId.id}/images` // Fix the dataId object key here
        );
        setImg(fetchImg.data.data);
        console.log(fetchImg);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dataId.id]);

  return (
    <div className={cx("album-wrap")}>
      <div className={cx("album-title")}>Vacation's Album</div>
      {img.length === 0 ? (
        <div className={cx("no-images")}>Không có ảnh</div>
      ) : (
        <div className={cx("album-container")}>
          {img.map((item, index) => (
            <div className={cx("stack")} key={index}>
              <div className={cx("card-album-container")}>
                <div className={cx("image")}>
                  <img src={item?.path} alt="?" className={cx("images")} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Album;
