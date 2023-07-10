import classNames from "classnames/bind";
import styles from "./Posts.module.scss";

import Timeline from "../components/Timelines/Timeline";
import PostItem from "./PostItem/PostItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import CreatePost from "./CreatePost/CreatePost";
import Image from "~/components/Image/Image";
import { getManyPosts } from "~/store/slices/vacationSlice";
import { useSearchParams } from "react-router-dom";
import Loading from "~/components/Loading/Loading";
import UpdatePost from "./UpdatePost/UpdatePost";

const cx = classNames.bind(styles);

const Posts = () => {
  const [showModal, setShowModal] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const currentPageRef = useRef(0);
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  let vacationID = searchParams.get("vacationID");
  const { posts, detail, isLoading } = useSelector((state) => state.vacation);
  const { postList } = posts;
  // console.log(posts);
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
          <div className={cx("create-post")}>
            <Image
              path={detail?.authorInfo?.avatar.path}
              className={cx("avatar")}
            />
            <div onClick={handleOpenModal}>Every step is a milestone...</div>
          </div>

          <CreatePost
            handleCloseModal={handleCloseModal}
            showModal={showModal}
          />
          {postList?.map((item, index) => (
            <PostItem postDetail={item} key={index} />
          ))}

          <>{isLoading && <Loading />}</>
        </div>
        {/* <Timeline /> */}
      </div>
    </>
  );
};

export default Posts;
