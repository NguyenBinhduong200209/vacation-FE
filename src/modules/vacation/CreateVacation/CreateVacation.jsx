import styles from "./CreateVacation.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faLocationDot,
  faUserPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import Input from "antd/es/input/Input";
import { DatePicker } from "antd";
import Image from "~/components/Image/Image";
import Modal from "~/components/Modal/Modal";

import SelectFriend from "~/modules/components/SelectFriend/SelectFriend";
import moment from "moment";
import vacationAPI from "~/api/vacationAPI";
const { RangePicker } = DatePicker;

const cx = classNames.bind(styles);
const CreateVacation = ({ showModal, setOpen }) => {
  const { info } = useSelector((state) => state.auth);
  // open friend modal
  const [openFriend, setOpenFriend] = useState(false);
  const [memberList, setMemberList] = useState([]);
  // open status dropdown
  const [openStatus, setOpenStatus] = useState(false);
  const [status, setStatus] = useState("Public");
  // state for date
  const [dates, setDates] = useState(null);

  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");

  const onChange = (e, type) => {
    if (type === "title") setTitle(e.target.value);
    else setDes(e.target.value);
  };
  const handleCalendar = (values) => {
    setDates(
      values?.map((item) => {
        return item?.format("YYYY-MM-DD");
      })
    );
  };

  const handleStatus = (status) => {
    setStatus(status);
    setOpenStatus(false);
  };

  const handleClear = (id) => {
    setMemberList((prev) => prev.filter((item) => item._id !== id));
  };

  const handleCreateVacation = async () => {
    const newList = memberList.map((item) => item._id);
    const res = await vacationAPI.createVacation({
      title: title,
      description: des,
      memberList: newList,
      shareStatus: status.toLowerCase(),
      startingTime: dates[0],
      endingTime: dates[1],
    });
    console.log(res);
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
              onChange={(values) => handleCalendar(values)}
            />
          </div>
          <Input
            maxLength={100}
            onChange={(e) => onChange(e, "title")}
            placeholder="Title"
            style={{ textAlign: "center" }}
            value={title}
            spellCheck={false}
          />
          <TextArea
            maxLength={500}
            onChange={(e) => onChange(e, "des")}
            placeholder="Description..."
            style={{
              textAlign: "center",
              resize: "none",
            }}
            spellCheck={false}
            value={des}
          />
          <div className={cx("post-extension")}>
            <div className={cx("extension-container")}>
              <div> Add on</div>
              <div className={cx("extensions")}>
                <div>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className={cx("icon")}
                    onClick={() => setOpenFriend(true)}
                  />
                  <SelectFriend
                    open={openFriend}
                    setOpen={setOpenFriend}
                    setMemberList={setMemberList}
                    memberList={memberList}
                  />
                </div>
              </div>
            </div>

            <div className={cx("result")}>
              <div className={cx("result-list")}>
                {memberList?.length > 0 && `with:`}
                {memberList.map((member) => {
                  return (
                    <span key={member._id}>
                      {member.username}
                      <FontAwesomeIcon
                        icon={faXmarkCircle}
                        className={cx("close")}
                        onClick={() => handleClear(member._id)}
                      />
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <button
            className={cx("btn-submit")}
            disabled={
              dates === undefined ||
              dates === null ||
              title === "" ||
              des === "" ||
              memberList.length === 0
            }
            onClick={handleCreateVacation}
          >
            Create Vacation
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateVacation;
