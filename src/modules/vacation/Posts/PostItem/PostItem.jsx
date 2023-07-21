import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styles from "./PostItem.module.scss";
import classNames from "classnames/bind";
import moment from "moment/moment";
import { Avatar, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";

import Interaction from "../../components/Interact/Interaction";
import { setTimeline } from "~/store/slices/vacationSlice";
import { getDate } from "~/helpers/function";
import UpdatePost from "../UpdatePost/UpdatePost";
import vacationAPI from "~/api/vacationAPI";
import Modal from "~/components/Modal/Modal";
import ImageField from "~/components/ImageField/ImageField";

const cx = classNames.bind(styles);

const PostItem = ({ postDetail }) => {
  const {
    authorInfo,
    content,
    resource,
    comments,
    likes,
    lastUpdateAt,
    _id,
    createdAt,
    isLiked,
  } = postDetail;
  // console.log(_id, authorInfo.username, isLiked, likes);

  const { info } = useSelector((state) => state.auth);
  const postItemRef = useRef(null);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const handleScrollPost = () => {
      const element = postItemRef.current;
      const distanceFromTop = element.getBoundingClientRect().top;

      if (
        distanceFromTop <= window.innerHeight * 0.2 &&
        distanceFromTop >= window.innerHeight * 0.15
      ) {
        dispatch(setTimeline(postItemRef.current.getAttribute("timeline")));
      }
    };

    window.addEventListener("scroll", handleScrollPost);

    return () => window.removeEventListener("scroll", handleScrollPost);
  }, []);

  const handleDeletePost = async () => {
    await vacationAPI.deletePost(_id);
    setOpen(false);
  };
  return (
    <div
      className={cx("wrapper")}
      ref={postItemRef}
      timeline={getDate(createdAt)}
    >
      <header>
        <div className={cx("user-info")}>
          <Avatar src={authorInfo?.avatar?.path} size={45} />

          <div className={cx("username-container")}>
            <div className={cx("username")}>{authorInfo.username}</div>

            <div className={cx("moment")}>{moment(lastUpdateAt).fromNow()}</div>
          </div>
        </div>
        {authorInfo._id === info.id && (
          <Popover
            content={
              <div className={cx("pop-over")}>
                <p className={cx("options")} onClick={handleOpenModal}>
                  Edit
                </p>
                <p className={cx("options")} onClick={handleDeletePost}>
                  Delete
                </p>
              </div>
            }
            open={open}
            trigger="click"
            onOpenChange={handleOpenChange}
            placement="bottom"
          >
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className={cx("options")}
            />
          </Popover>
        )}
        <UpdatePost
          handleCloseModal={handleCloseModal}
          showModal={showModal}
          postDetail={postDetail}
        />
      </header>

      <main>
        <div className={cx("description")}>{content}</div>
        <div className={cx("img-container")}>
          {[...resource, ...resource, ...resource].map((item, index) => (
            <>
              {index <= 5 && (
                <div
                  className={cx(index === 5 && "last-img")}
                  onClick={() => index === 5 && setOpenImg(true)}
                  key={index}
                >
                  <ImageField src={item.path} preview={index < 5} />
                </div>
              )}
            </>
          ))}
        </div>

        <Modal open={openImg} setOpen={setOpenImg} title="Resources">
          <div className={cx("img-container")}>
            {[
              ...resource,
              ...resource,
              ...resource,
              ...resource,
              ...resource,
            ].map((item, index) => (
              <div key={index}>
                <ImageField src={item.path} />
              </div>
            ))}
          </div>
        </Modal>
      </main>

      <Interaction
        likes={likes}
        comments={comments}
        postID={_id}
        isLikedStatus={isLiked}
      />
    </div>
  );
};

export default PostItem;
