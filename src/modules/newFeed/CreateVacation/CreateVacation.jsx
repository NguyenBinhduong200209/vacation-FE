import Modal from "react-modal";
import styles from "./CreateVacation.module.scss";
import classNames from "classnames/bind";
import Image from "~/components/Image/Image";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faLocationDot,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import Input from "antd/es/input/Input";
import { DatePicker } from "antd";
const cx = classNames.bind(styles);

const { RangePicker } = DatePicker;
Modal.setAppElement("#root");
const CreateVacation = ({ showModal, handleCloseModal }) => {
  const [date, setDate] = useState(null);
  const { info } = useSelector((state) => state.auth);
  // console.log(info);
  const [value, setValue] = useState("");
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  const handleCalendar = (date) => {
    console.log(date);
    setDate(date);
  };
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      className={cx("modal")}
      overlayClassName={cx("overlay")}
    >
      <div className={cx("wrapper")}>
        <h2 className={cx("title")}>New Vacation</h2>

        <FontAwesomeIcon
          icon={faCircleXmark}
          className={cx("close-icon")}
          onClick={handleCloseModal}
        />
        <div className={cx("modal-container")}>
          <div className={cx("user-info")}>
            <div className={cx("info-name")}>
              <Image path={info?.avatar} />
              <div className={cx("username")}>
                <span>{info?.username}</span>
                <div className={cx("status")}>Public</div>
              </div>
            </div>
            <RangePicker
              placement="top-left"
              className={cx("select-date")}
              placeholder={["Start Time", "End Time"]}
              style={{
                width: "220px",
                background: "#a29090a6",
                border: "none",
              }}
              format="YYYY/MM/DD"
              onCalendarChange={(dateStrings) => handleCalendar(dateStrings)}
            />
          </div>
          <Input
            maxLength={100}
            onChange={onChange}
            placeholder="Title"
            style={{ textAlign: "center" }}
          />
          <TextArea
            maxLength={500}
            onChange={onChange}
            placeholder="Description..."
            style={{
              textAlign: "center",
              resize: "none",
            }}
            spellCheck={false}
          />
          <div className={cx("post-extension")}>
            <div> Add on</div>
            <div className={cx("extensions")}>
              <div>
                <FontAwesomeIcon icon={faLocationDot} className={cx("icon")} />
              </div>
              <div>
                <FontAwesomeIcon icon={faUserPlus} className={cx("icon")} />
              </div>
            </div>
          </div>
          <button className={cx("btn-submit")}>Create Vacation</button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateVacation;
