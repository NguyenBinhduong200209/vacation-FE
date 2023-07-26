import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Create.module.scss";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import {
  FileTextOutlined,
  PictureOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import HandlePost from "~/modules/vacation/Posts/HandlePost/HandlePost";
import CreateAlbum from "~/modules/album/CreateAlbum/CreateAlbum";
import HandleVacation from "~/modules/vacation/HandleVacation/HandleVacation";
const cx = classNames.bind(styles);

const Create = () => {
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAlbum, setOpenAlbum] = useState(false);
  const { info } = useSelector((state) => state.auth);
  const initVacationDetail = {
    title: "",
    des: "",
    memberList: [],
    dates: [],
    status: "Public",
  };
  // post detail
  const initPostDetail = {
    content: "",
    location: {},
    initResources: [],
  };
  console.log(info);
  return (
    <div className={cx("create")}>
      <div className={cx("create-posts")}>
        {/* <button className={cx("create-line")}>
          Every step is a milestone ... 
        </button> */}
        <div className={cx("create-line")}>
          <Avatar
            size={35}
            src={info.avatar?.path}
            className={cx("user-ava")}
            alt=""
          />
          {/* <div>What is on your mind, </div> */}
          <div className={cx("create-line-text")}>
            Where have you wandered, {info.firstname} {info.lastname} ?
          </div>
        </div>
        <div className={cx("create-details")}>
          <button
            className={cx("create-sthg")}
            onClick={() => setShowModal(true)}
          >
            <FileTextOutlined />
            <div className={cx("create-sthg-details")}>Add Post</div>
          </button>
          <HandlePost
            setShowModal={setShowModal}
            showModal={showModal}
            initPostDetail={initPostDetail}
            type="newfeed"
          />
          <button
            className={cx("create-sthg")}
            onClick={() => setOpenAlbum(true)}
          >
            <PictureOutlined />

            <div
              className={cx("create-sthg-details")}
              onClick={() => setOpenAlbum(true)}
            >
              Add Album
            </div>
          </button>
          <CreateAlbum setOpen={setOpenAlbum} open={openAlbum} />
          <button className={cx("create-sthg")} onClick={() => setOpen(true)}>
            <FolderOpenOutlined />

            <div
              className={cx("create-sthg-details")}
              onClick={() => setOpen(true)}
            >
              Add Vacation
            </div>
          </button>
          <HandleVacation
            setOpen={setOpen}
            showModal={open}
            initVacationDetail={initVacationDetail}
            type="create"
          />
        </div>
      </div>
    </div>
  );
};

export default Create;
