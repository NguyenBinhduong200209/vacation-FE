import React, { useCallback, useEffect, useRef } from "react";
import { getDate } from "~/helpers/function";
import classNames from "classnames/bind";
import styles from "./List.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { getListVacation } from "~/store/slices/vacationSlice";
import { Avatar } from "antd";
import { HeartFilled, CommentOutlined, EyeOutlined } from "@ant-design/icons";
import images from "~/images";
const cx = classNames.bind(styles);

const List = () => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  const dispatch = useDispatch();
  const { listVacation } = useSelector((state) => state.vacation);
  const currentPage = useRef(1);

  const loadMorePosts = useCallback(() => {
    if (listVacation.page < listVacation.pages && listVacation.page === currentPage.current) {
      dispatch(
        getListVacation({
          page: listVacation.page + 1,
          type: "newFeed",
        })
      );
      currentPage.current += 1;
    }
  }, [listVacation, currentPage, dispatch]);

  // add scroll event when component mounted
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        loadMorePosts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, listVacation.page, loadMorePosts]);

  return (
    <>
      {listVacation.list?.map((vacation) => (
        <a key={vacation._id} className={cx("feed-post")} href={`/vacation?vacationID=${vacation._id}`}>
          <div className={cx("feed-head")}>
            <Avatar src={vacation.authorInfo?.avatar?.path} className={cx("feed-ava")} />
            <div className={cx("feed-head-info")}>
              <div className={cx("feed-user-name")}>@{vacation.authorInfo?.username}</div>
              <div className={cx("feed-time")}>
                {getDate(vacation.startingTime)} - {getDate(vacation.endingTime)}
              </div>
            </div>
          </div>
          <div className={cx("feed-cover")}>
            <img src={vacation.cover?.path || images.noImage} alt="This is Vacation cover" />
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
        </a>
      ))}
    </>
  );
};

export default List;
