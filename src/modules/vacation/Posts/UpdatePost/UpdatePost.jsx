import Modal from "react-modal";
import styles from "./UpdatePost.module.scss";
import classNames from "classnames/bind";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import vacationAPI from "~/api/vacationAPI";
import locationAPI from "~/api/locationAPI";
import { getManyLocations } from "~/store/slices/locationSlice";
import SelectLocation from "~/modules/components/SelectLocation/SelectLocation";
import { CloseCircleOutlined } from "@ant-design/icons";
import Notification from "~/components/Notification/Notification";

const cx = classNames.bind(styles);
Modal.setAppElement("#root");
const UpdatePost = ({ showModal, handleCloseModal, postDetail }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { authorInfo, content, _id, location } = postDetail;
  const [resource, setResource] = useState(postDetail.resource);
  const [updateContent, setUpdateContent] = useState(content);
  const [searchParams] = useSearchParams();
  let vacationId = searchParams.get("vacationID");
  const { posts, detail } = useSelector((state) => state.vacation);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationState, setLocationState] = useState(location);
  const uploadResourcesRef = useRef();
  const [openNoti, setOpenNoti] = useState(false);
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const resourceIds = resource.map((file) => file.id);
      console.log(resourceIds);
      const res = await vacationAPI.updatePost({
        vacationId: vacationId,
        locationId: location?.detail?.id,
        content: updateContent,
        resource: resourceIds,
        id: _id,
      });
    } catch (error) {
      console.log(error);
    }
    handleCloseModal();
    setIsLoading(false);
  };

  const handleDelete = async (file, index) => {
    setFiles(files.filter((file, i) => i !== index));
    // try {
    // 	await axios.delete(`https://vacation-backend.onrender.com/resource/${file._id}`, {
    // 		headers: {
    // 			Authorization: localStorage.getItem("token"),
    // 		},
    // 	});
    // 	setResource(resource.filter((_, i) => i !== index));
    // } catch (error) {
    // 	console.error(error);
    // }
  };

  const uploadFiles = async () => {
    // const formData = new FormData();
    // files.forEach((file) => {
    //   formData.append("files", file);
    // });
    // formData.append("field", "post");
    // formData.append("vacationId", vacationId);
    // try {
    //   const response = await axios.post(
    //     "https://vacation-backend.onrender.com/resource/",
    //     formData,
    //     {
    //       headers: {
    //         Authorization: localStorage.getItem("token"),
    //       },
    //     }
    //   );
    //   const data = response.data.data;
    //   const ids = data.map((item) => item._id);
    //   console.log(ids);
    //   return ids;
    // } catch (error) {}
  };

  useEffect(() => {
    uploadFiles();
  }, []);

  const handleUpdateContent = (e) => {
    setUpdateContent(e.target.value);
  };

  const handleUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files);
      setFiles([...files, ...Object.values(e.target.files)]);
    }
    uploadFiles();
    e.target.value = null;
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        className={cx("modal")}
      >
        <div className={cx("wrapper")}>
          <h2 className={cx("title")}>Update Post</h2>

          <FontAwesomeIcon
            icon={faCircleXmark}
            className={cx("close-icon")}
            onClick={handleCloseModal}
          />

          <div className={cx("modal-container")}>
            <div className={cx("user-info")}>
              <div className={cx("info-name")}>
                <img path={authorInfo && authorInfo.avatar} />
                <div className={cx("username")}>
                  {authorInfo && authorInfo.username}
                </div>
              </div>
              <div className={cx("vacation-info")}>{detail.title}</div>
            </div>
            <TextArea
              placeholder="What is on your mind..."
              autoSize={{
                minRows: 6,
                maxRows: 12,
              }}
              value={updateContent}
              onChange={handleUpdateContent}
            />
            <div className={cx("img-uploader")}>
              {resource.map((file, index) => (
                <div className={cx("img-container")} key={index}>
                  <img alt="" src={file.path} />
                  <CloseCircleOutlined
                    onClick={() => handleDelete(file, index)}
                    className={cx("img-btn")}
                  />
                </div>
              ))}
              {files.map((file, index) => (
                <div className={cx("img-container")} key={index}>
                  <img alt="" src={URL.createObjectURL(file)} />
                  <CloseCircleOutlined
                    onClick={() => handleDelete(file, index)}
                    className={cx("img-btn")}
                  />
                </div>
              ))}
            </div>
            <div className={cx("post-extension")}>
              <div> Add on: {location?.detail} </div>
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
                    setLocation={setLocationState}
                  />
                </div>
                <div>
                  <input
                    type="file"
                    ref={uploadResourcesRef}
                    onChange={handleUpload}
                    hidden
                  />
                  <FontAwesomeIcon
                    icon={faImage}
                    className={cx("icon")}
                    onClick={() => {
                      uploadResourcesRef.current.click();
                    }}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleClick}
              disabled={isLoading}
              className={cx("btn-submit")}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
      <Notification
        openNoti={openNoti}
        setOpenNoti={setOpenNoti}
        msg={msg}
        type="handleVacation"
        isError={isError}
        isSuccess={isSuccess}
      />
    </>
  );
};

export default UpdatePost;
