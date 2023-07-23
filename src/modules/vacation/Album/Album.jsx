import React, { useState, useEffect } from "react";
import axiosClient from "~/api/axiosClient";
import styles from "./Album.module.scss";
import classNames from "classnames/bind";
import { useSearchParams } from "react-router-dom";
import { Image } from "antd";

const cx = classNames.bind(styles);

const Album = () => {
  const [img, setImg] = useState([]);
  const [searchParams] = useSearchParams();
  const dataId = Object.fromEntries([...searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchImg = await axiosClient.get(`vacation/${dataId.vacationID}/images`);
        setImg(fetchImg.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dataId.vacationID]);

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
                  <Image
                    preview={{ toolbarRender: () => null }}
                    src={item?.path}
                    alt="?"
                    rootClassName={cx("images")}
                  />
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
