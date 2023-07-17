import classNames from "classnames/bind";
import styles from "./Posts.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";

import Timeline from "../components/Timelines/Timeline";
import PostItem from "./PostItem/PostItem";
import CreatePost from "./CreatePost/CreatePost";
import Image from "~/components/Image/Image";
import Loading from "~/components/Loading/Loading";

const cx = classNames.bind(styles);

const Posts = () => {
  const [showModal, setShowModal] = useState(false);
  const { info } = useSelector((state) => state.auth);
  const { posts, detail, isLoading } = useSelector((state) => state.vacation);
  const { postList } = posts;

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          {detail?.isMember && (
            <div className={cx("create-post")}>
              <Image path={info.avatar?.path} className={cx("avatar")} />
              <div onClick={handleOpenModal}>Every step is a milestone...</div>
            </div>
          )}
          <CreatePost
            handleCloseModal={handleCloseModal}
            showModal={showModal}
          />
          {postList?.map((item, index) => (
            <PostItem postDetail={item} key={index} />
          ))}

          <>{isLoading && <Loading />}</>
        </div>
        <Timeline />
      </div>
    </>
  );
};

export default Posts;
