import styles from "./CreateVacation.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUserPlus } from "@fortawesome/free-solid-svg-icons";
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
  const [openLocation, setOpenLocation] = useState(false);
  const [openFriend, setOpenFriend] = useState(false);

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
  return (
    <Modal open={showModal} setOpen={setOpen} title="New Vacation">
      <div className={cx("wrapper")}>
        <div className={cx("modal-container")}>
          <div className={cx("user-info")}>
            <div className={cx("info-name")}>
              <Image path={info?.avatar} />
              <div className={cx("username")}>
                <div>{info?.username}</div>
                <div className={cx("status")}>Public</div>
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
          <button className={cx("btn-submit")}>Create Vacation</button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateVacation;
