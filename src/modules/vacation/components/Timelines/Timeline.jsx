import { useDispatch, useSelector } from "react-redux";
import styles from "./Timeline.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { setTimeline } from "~/store/slices/vacationSlice";
import Loading from "~/components/Loading/Loading";

const cx = classNames.bind(styles);

const Timeline = () => {
  const dispatch = useDispatch();
  const { isLoading, posts, activeTimeline } = useSelector(
    (state) => state.vacation
  );
  console.log(posts);

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <header># Timeline</header>
          <main>
            {posts.meta.timeline?.map((item, index) => {
              return (
                <div
                  className={cx(
                    "timeline-item",
                    activeTimeline === item && "item-active"
                  )}
                  key={index}
                >
                  <span className={cx("index")}>{index + 1}.</span>
                  <span className={cx("value")}>{item}</span>
                </div>
              );
            })}
          </main>
        </div>

        <div className={cx("active")}>
          <span>Date</span>
          <span className={cx("date")}>{activeTimeline}</span>
        </div>
      </div>
    </>
  );
};

export default Timeline;
