import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faHeart,
  faMessage,
  faPaperPlane,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Popover, Space } from "antd";
import { useSelector } from "react-redux";
import styles from "./Interaction.module.scss";
import classNames from "classnames/bind";

import interactionAPI from "~/api/interactionAPI";
import Image from "~/components/Image/Image";

const cx = classNames.bind(styles);

const Interaction = (props) => {
  const { comments, postID, isLikedStatus, likes } = props;
  const { info } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false); // state for open the modal of list of users has like
  const [commentList, setCommentList] = useState([]);
  const [isCommentChange, setisComment] = useState(true); // state for user comment action
  const [value, setValue] = useState(""); // state for input value
  const [totalCmt, setTotalCmt] = useState(comments);
  // state for react fnc
  const [likedList, setLikedList] = useState([]);
  const [isLiked, setIsLiked] = useState(isLikedStatus);
  const [totalLike, setTotalLike] = useState(likes);
  const [isLikeAction, setAction] = useState(false);
  // state for edit cmt
  const [editCmtId, setEditCmtId] = useState(null);
  const [editCmtValue, setEditCmtValue] = useState(""); // state for input value

  const cmtContentRef = useRef();

  // console.log(info);

  // Get comment list
  useEffect(() => {
    if (open && isCommentChange) {
      const fetchApi = async () => {
        const res = await interactionAPI.getCommentList({
          id: postID,
          type: "posts",
          page: 1,
        });
        setCommentList(res?.data.data);
        setTotalCmt(res?.data.data?.length || 0);
      };
      fetchApi();
      setisComment(false);
    }
  }, [isCommentChange, open]);

  // set input value of comment
  const handleChangeValue = (e, type) => {
    e.preventDefault();
    if (type === "newCmt") setValue(e.target.value);
    setEditCmtValue(e.target.value);
  };

  // send update comment's request
  const handleCmt = async (type, cmtId) => {
    try {
      if (type === "newCmt" && value !== "") {
        await interactionAPI.addComment({
          id: postID,
          type: "posts",
          content: value,
        });
      } else if (type === "editCmt" && editCmtValue !== "") {
        await interactionAPI.updateComment({
          id: cmtId,
          content: editCmtValue,
        });
        setEditCmtId(null);
      }
      setisComment(true);
    } catch (error) {
      console.log(error);
    }
    setValue("");
  };

  // update like when user click icon
  const handleLike = () => {
    try {
      const fetchApi = async () => {
        const res = await interactionAPI.updateLike({
          id: postID,
          type: "posts",
        });
        // console.log(res);
        setIsLiked((prev) => !prev); // set Like status
        setAction(true); // set like action

        // update total like
        if (res?.status === 200) {
          setTotalLike((prev) => prev - 1);
        } else if (res?.status === 201) {
          setTotalLike((prev) => prev + 1);
        }
      };

      fetchApi();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle when mouse enter the total like's area
  const handleMouseEnter = async () => {
    if (likedList?.length === 0 || isLikeAction) {
      //when user mouse enter first time or after user click heart icon
      try {
        const res = await interactionAPI.getLikedList({
          id: postID,
          type: "posts",
          page: 1,
        });
        // console.log(res);
        const items = res.data.data?.map((item) => {
          return {
            key: item.authorInfo._id,
            label: (
              <div className={cx("react-list-item")}>
                <Image path={item.authorInfo.avatar} alt="" />
                <span>{item.authorInfo.username}</span>
              </div>
            ),
          };
        });
        setLikedList(items); // update info list of user who liked
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // Handle Mouse leave
  const handleMouseLeave = () => {
    setAction(false);
  };

  // handle when user click "edit"
  const handleEditCmt = (id, content) => {
    setEditCmtId(id);
    setEditCmtValue(content);
  };

  // delete comment

  const handleDelCmt = async (id) => {
    await interactionAPI.deleteComment(id);
    setisComment(true);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("react")}>
          <FontAwesomeIcon
            icon={faHeart}
            onClick={handleLike}
            className={cx(isLiked ? "liked" : "unlike")}
          />
          <Dropdown
            menu={{
              items: likedList || [],
            }}
            overlayClassName={cx("dropdown")}
          >
            <Space>
              <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {totalLike}
              </span>
            </Space>
          </Dropdown>
        </div>

        <div className={cx("comment")} onClick={() => setOpen((prev) => !prev)}>
          <FontAwesomeIcon icon={faMessage} />
          <span>{totalCmt}</span>
        </div>
      </div>

      {open && (
        <div className={cx("cmt-container")}>
          <div className={cx("input-container")}>
            <div className={cx("input-content")}>
              {/* <Image path={info.avatar} /> */}
              <textarea
                value={value}
                type="text"
                placeholder="Write your comment here"
                spellCheck={false}
                onChange={(e) => handleChangeValue(e, "newCmt")}
              />
            </div>
            <FontAwesomeIcon
              icon={faPaperPlane}
              onClick={() => handleCmt("newCmt")}
            />
          </div>
          <div className={cx("cmt-list")}>
            {commentList?.map((item) => {
              return (
                <div key={item._id} className={cx("cmt-item")}>
                  <Image path={item.authorInfo.avatar.path} alt="" />
                  <div className={cx("item-content-container")}>
                    <div className={cx("item-username")}>
                      {item.authorInfo.username}
                    </div>

                    {editCmtId === item._id ? (
                      <div className={cx("edit-cmt")}>
                        <textarea
                          type="text"
                          value={editCmtValue}
                          spellCheck={false}
                          onChange={(e) => handleChangeValue(e, "editCmt")}
                        />
                        <div className={cx("icon-container")}>
                          <FontAwesomeIcon
                            icon={faPaperPlane}
                            onClick={() => handleCmt("editCmt", item._id)}
                          />
                          <FontAwesomeIcon
                            icon={faRectangleXmark}
                            onClick={() => setEditCmtId(null)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className={cx("item-content")}>{item.content}</div>
                    )}
                  </div>
                  {item.authorInfo._id === info.id && (
                    <Popover
                      content={
                        <div className={cx("pop-over")}>
                          <p
                            onClick={() =>
                              handleEditCmt(item._id, item.content)
                            }
                          >
                            Edit
                          </p>
                          <p onClick={() => handleDelCmt(item._id)}>Delete</p>
                        </div>
                      }
                      trigger="click"
                      placement="bottom"
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className={cx("icon")}
                      />
                    </Popover>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Interaction;
