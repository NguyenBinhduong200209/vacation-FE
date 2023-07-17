import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "../../layouts/Profile/ProfileLayout.module.scss";
import { HeartFilled, CommentOutlined, EyeOutlined } from "@ant-design/icons";
import axiosClient from "~/api/axiosClient";
const cx = classNames.bind(styles);

const Vacations = () => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  const [vacations, setVacations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  console.log("vacation");

  useEffect(() => {
    axiosClient
      .get(`https://vacation-backend.onrender.com/vacation?page=${currentPage}&type=userProfile`)
      .then((result) => result.data && setVacations((prevPosts) => prevPosts.concat(result?.data?.data)));
  }, []);

  return (
    <ul className={cx("feed")}>
      {vacations.map((vacation) => (
        <li key={vacation._id} className={cx("feed-post")}>
          <div className={cx("feed-cover")}>
            <img src={vacation?.cover?.path} alt="???" />
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
  );
};

export default Vacations;
