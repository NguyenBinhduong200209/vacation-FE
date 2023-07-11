import Modal from "react-modal";
import styles from "./CreatePost.module.scss";
import classNames from "classnames/bind";
import Image from "~/components/Image/Image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faImage, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import vacationAPI from "~/api/vacationAPI";
import locationAPI from "~/api/locationAPI";
import { getManyLocations } from "~/store/slices/locationSlice";
import SelectLocation from "~/modules/components/SelectLocation/SelectLocation";

const cx = classNames.bind(styles);
Modal.setAppElement("#root");
const CreatePost = ({ showModal, handleCloseModal, newfeed }) => {
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.vacation);
  const [modalIsOpen, setIsOpen] = useState(false);
  
  const { authorInfo } = detail;
  const [searchParams]= useSearchParams()
  let vacationId = searchParams.get("vacationID");

  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let [locationId, setLocationID] = useState('')
  const uploadResourcesRef = useRef()
  // const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const locationsList  = useSelector((state) => state.location)
  console.log(locationsList);
  const maxItems = 5;
  // const displayedLocations = locationsList.locationList.data?.slice(0, maxItems);

  let parentId = "6486cb0e4d45b8403f02a4d6";
  useEffect(() => {
    dispatch(
      getManyLocations({
        type: "level",
        number: "2",
        parentId: parentId,
      })
    )
  }, []);
  
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
      const res = await vacationAPI.createPost({vacationId:vacationId, locationId:locationId, content: content});
      handleCloseModal()
    } catch (error) {
      console.log(error);
      console.log(locationId, vacationId, content); 
    }
    setIsLoading(false);
  }

  const handleUpload = (e) => {

    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files);
      setFiles([...files, ...Object.values(e.target.files)]);
    }
  }

  const handleOnClick = (locationID, title) => {
    setLocationID(locationID);
    setSelectedLocation(title);
    closeModal();
  }  

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      className={cx("modal")}
      overlayClassName={cx("overlay")}
    >
      <div className={cx("wrapper")}>
        <h2 className={cx("title")}>New Post</h2>

        <FontAwesomeIcon
          icon={faCircleXmark}
          className={cx("close-icon")}
          onClick={handleCloseModal}
        />
        <div className={cx("modal-container")}>
          <div className={cx("user-info")}>
            <div className={cx("info-name")}>
              <Image path={authorInfo && authorInfo.avatar} />
              <div className={cx("username")}>
                {authorInfo && authorInfo.username}
              </div>
            </div>
            {newfeed && (
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
            onChange={(e) => setContent(e.target.value)}
          />
          <div className={cx("img-uploader")}>
            {files.map((file) =>  <div>
                <img alt="" src={URL.createObjectURL(file)} />
              </div>
            )}
          </div>
          <div className={cx("post-extension")}>
            <div> Add on: {selectedLocation}</div>
            <div className={cx("extensions")}>
              <div>
                <FontAwesomeIcon onClick={openModal} icon={faLocationDot} className={cx("icon")} />
                <SelectLocation openLocation={modalIsOpen} setOpenLocation={setIsOpen}/>
                {/* <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  className={cx("location-modal")}
                >
                  <div className={cx("location-wrapper")}>
                    <h2 className={cx("title")}>Choose your Location</h2>
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className={cx("close-icon")}
                      onClick={closeModal}
                    />
                    <div className={cx("modal-container")}>
                      <div className={cx("location-methods")}>
                        <input
                          className={cx("location-input")}
                          type="text"
                          placeholder="Where are you ??"
                          value={locations}
                          onChange={(e) => {
                            setLocations(e.target.value);
                          }}
                        />
                        <FontAwesomeIcon onClick={openModal} icon={faCirclePlus} className={cx("add-icon")} />
                      </div>
                      <ul className={cx("location-list")}>
                        {Array.isArray(displayedLocations) && displayedLocations.map((data) => (
                          <li key={data._id} onClick={() => handleOnClick(data._id, data.title)}>{data.title}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Modal> */}
              </div>
              <div>
                <input type="file" ref={uploadResourcesRef} onChange={handleUpload} hidden/>
                  <FontAwesomeIcon icon={faImage} className={cx("icon")} onClick={() => {uploadResourcesRef.current.click()}} />                  
              </div>
            </div>
          </div>
          <button onClick={handleClick} disabled={isLoading} className={cx("btn-submit")}>
            Sending Post
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePost;
