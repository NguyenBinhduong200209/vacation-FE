import styles from "./HandlePost.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import vacationAPI from "~/api/vacationAPI";
import SelectLocation from "~/modules/components/SelectLocation/SelectLocation";
import Notification from "~/components/Notification/Notification";
import ImageField from "~/components/ImageField/ImageField";
import Modal from "~/components/Modal/Modal";
import { Avatar } from "antd";
import UpLoad from "~/components/UpLoad/UpLoad";

const cx = classNames.bind(styles);
const HandlePost = ({
  showModal,
  setShowModal,
  type,
  initPostDetail,
  postId,
}) => {
  // get vacationId
  const [searchParams] = useSearchParams();
  let vacationId = searchParams.get("vacationID");
  // get vacation detail
  const { detail } = useSelector((state) => state.vacation);
  const { authorInfo } = detail;
  // init post detail
  const [postDetail, setPostDetail] = useState(initPostDetail);
  const { location, content } = postDetail;
  // get resources when upload
  const { resources } = useSelector((state) => state.resource);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [files, setFiles] = useState([]);
  const [listFileId, setListFileId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});
  const imgRef = useRef();

  //   initPostDetail = {
  //     location:{},
  //     resources:[],
  //     content:""
  //   }

  useEffect(() => {
    setPostDetail(initPostDetail);
    setSelectedLocation(location);
  }, [initPostDetail]);

  function openModal() {
    setIsOpen(true);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const srcListId = resources.map((item) => item._id);
    const params = {
      vacationId: vacationId,
      locationId: selectedLocation.detail?.id,
      content: postDetail.content,
      resources: srcListId,
    };
    try {
      let res;
      setIsLoading(true);
      if (type === "create || newfeed") {
        res = await vacationAPI.createPost(params);
      } else {
        await vacationAPI.updatePost({ id: postId, body: params });
      }
      setIsSuccess(true);
      setMsg(res.data?.message);
    } catch (error) {
      setIsError(true);
      setMsg(error.message);
    }
    setIsLoading(false);
    setShowModal(false);
    setOpenNoti(true);
  };

  const titleModal =
    type === "create" || type === "newfeed" ? "New Post" : "Update Post";
  return (
    <>
      <Modal open={showModal} setOpen={setShowModal} title={titleModal}>
        <div className={cx("modal-container")}>
          <div className={cx("user-info")}>
            <div className={cx("info-name")}>
              <Avatar src={authorInfo?.avatar.path} />
              <div className={cx("username")}>{authorInfo?.username}</div>
            </div>
            {type === "newfeed" && (
              <div className={cx("select-vacation")}>Choose your Vacation</div>
            )}
          </div>
          <TextArea
            placeholder="What is on your mind..."
            autoSize={{
              minRows: 6,
              maxRows: 12,
            }}
            value={content}
            onChange={(e) =>
              setPostDetail((prev) => {
                return { ...prev, content: e.target.value };
              })
            }
          />
          <div className={cx("img-uploader")}>
            {resources.map((resource, index) => (
              <div className={cx("img-container")} key={index}>
                <ImageField src={resource.path} className={cx("resource")} />
                {/* <CloseCircleOutlined
                  onClick={() => handleDelete(file, index)}
                  className={cx("img-btn")}
                /> */}
              </div>
            ))}
          </div>
          <div className={cx("post-extension")}>
            <div> Add on: {selectedLocation?.detail?.title} </div>
            <div className={cx("extensions")}>
              <div>
                <FontAwesomeIcon
                  onClick={openModal}
                  icon={faLocationDot}
                  className={cx("icon")}
                />
                <SelectLocation
                  openLocation={modalIsOpen}
                  setOpenLocation={setIsOpen}
                  setLocation={setSelectedLocation}
                />
              </div>
              {/* <div>
                <input
                  type="file"
                  ref={uploadResourcesRef}
                  onChange={handleUpload}
                  name="files"
                  hidden
                />
                <FontAwesomeIcon
                  icon={faImage}
                  className={cx("icon")}
                  onClick={() => {
                    uploadResourcesRef.current.click();
                  }}
                />
              </div> */}

              <div
                className={cx("upload")}
                onClick={() => imgRef.current.click()}
              >
                <UpLoad
                  imgRef={imgRef}
                  body={{ field: "post", vacationId: vacationId }}
                />
                <FontAwesomeIcon icon={faImage} className={cx("icon")} />
              </div>
            </div>
          </div>
          <button
            onClick={handleClick}
            disabled={isLoading}
            className={cx("btn-submit")}
          >
            Sending Post
          </button>
        </div>
      </Modal>
    </>
  );
};

export default HandlePost;
