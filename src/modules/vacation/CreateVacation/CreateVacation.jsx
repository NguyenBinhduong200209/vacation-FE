import styles from "./CreateVacation.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faLocationDot,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import Input from "antd/es/input/Input";
import { DatePicker } from "antd";
import Image from "~/components/Image/Image";
import Modal from "~/components/Modal/Modal";
import SelectLocation from "~/modules/components/SelectLocation/SelectLocation";
import SelectFriend from "~/modules/components/SelectFriend/SelectFriend";
const cx = classNames.bind(styles);

const { RangePicker } = DatePicker;
const CreateVacation = ({ showModal, setOpen }) => {
  // state for location
  const [openLocation, setOpenLocation] = useState(false);
  const [location, setLocation] = useState("");
  // open friend modal
  const [openFriend, setOpenFriend] = useState(false);
  // open status dropdown
  const [openStatus, setOpenStatus] = useState(false);
  const [status, setStatus] = useState("Public");
  // state for date
  const [date, setDate] = useState(null);
  const { info } = useSelector((state) => state.auth);
  // console.log(info);
  const [value, setValue] = useState("");
  const onChange = (e) => {
    // console.log("Change:", e.target.value);
  };
  const handleCalendar = (date) => {
    // console.log(date);
    setDate(date);
  };

  const handleStatus = (status) => {
    setStatus(status);
    setOpenStatus(false);
  };
  return (
    <Modal open={showModal} setOpen={setOpen} title="New Vacation">
      <div className={cx("wrapper")}>
        <div className={cx("modal-container")}>
          <div className={cx("user-info")}>
            <div className={cx("info-name")}>
              <Image path={info?.avatar?.path} />
              <div className={cx("username")}>
                <div>{info?.username}</div>
                <div
                  className={cx("status")}
                  onClick={() => setOpenStatus(!openStatus)}
                >
                  <span>{status}</span>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{ marginLeft: "0.8rem", cursor: "pointer" }}
                  />
                  {openStatus && (
                    <div className={cx("dropdown-status")}>
                      <div onClick={() => handleStatus("Public")}>Public</div>
                      <div onClick={() => handleStatus("Protected")}>
                        Protected
                      </div>
                      <div onClick={() => handleStatus("Only Me")}>Only Me</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <RangePicker
              placement="top-left"
              className={cx("select-date")}
              placeholder={["Start Time", "End Time"]}
              style={{
                width: "22rem",
                background: "#a29090a6",
                border: "none",
                height: "50px",
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
            <div className={cx("extension-container")}>
              <div> Add on</div>
              <div className={cx("extensions")}>
                <div>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={cx("icon")}
                    onClick={() => setOpenLocation(true)}
                  />
                  <SelectLocation
                    openLocation={openLocation}
                    setOpenLocation={setOpenLocation}
                    setLocation={setLocation}
                  />
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className={cx("icon")}
                    onClick={() => setOpenFriend(true)}
                  />
                  <SelectFriend open={openFriend} setOpen={setOpenFriend} />
                </div>
              </div>
            </div>

            <div className={cx("result")}>
              {/* <div className={cx("res-location")}>{location.city}</div> */}
              <div className={cx("res-member")}></div>
            </div>
          </div>
          <button className={cx("btn-submit")}>Create Vacation</button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateVacation;
