import classNames from "classnames/bind";
import styles from "./Posts.module.scss";

import Timeline from "../components/Timelines/Timeline";
import PostItem from "./PostItem/PostItem";

const cx = classNames.bind(styles);
const Posts = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <PostItem />
      </div>
      <Timeline />
    </div>
  );
};

export default Posts;
