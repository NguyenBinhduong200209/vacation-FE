import { useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./HandleVacation.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faImage,
  faUserPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import Input from "antd/es/input/Input";
import { Avatar, DatePicker } from "antd";

import vacationAPI from "~/api/vacationAPI";
import Modal from "~/components/Modal/Modal";
import SelectFriend from "~/modules/components/SelectFriend/SelectFriend";
import Notification from "~/components/Notification/Notification";
import UpLoad from "~/components/UpLoad/UpLoad";
import ImageField from "~/components/ImageField/ImageField";

const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);
const HandleVacation = ({
  showModal,
  setOpen,
  type,
  initVacationDetail,
  vacationId,
}) => {
  // Get the current user information from the state.
  const { info } = useSelector((state) => state.auth);
  const { resources } = useSelector((state) => state.resource);
  const [vacationDetail, setVacationDetail] = useState(initVacationDetail);
  const { title, des, dates, status } = vacationDetail;
  const [memberList, setMemberList] = useState([]);
  const [openNoti, setOpenNoti] = useState(false);
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef();

  // State for the open friend modal.
  const [openFriend, setOpenFriend] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  useEffect(() => {
    setVacationDetail(initVacationDetail);
    setMemberList(initVacationDetail.memberList);
  }, [initVacationDetail]);

  // Function to handle changes to the title.
  const onChange = (e, type) => {
    if (type === "title")
      setVacationDetail((prev) => {
        return { ...prev, title: e.target.value };
      });
    else
      setVacationDetail((prev) => {
        return { ...prev, des: e.target.value };
      });
  };

  // Function to handle changes to the date range.
  const handleCalendar = (values) => {
    const newDate = values?.map((item) => {
      return item?.format("YYYY-MM-DD");
    });
    setVacationDetail((prev) => {
      return {
        ...prev,
        dates: newDate || [],
      };
    });
  };

  // Function to handle changes to the date range.
  const handleStatus = (status) => {
    setVacationDetail((prev) => {
      return { ...prev, status: status };
    });
    setOpenStatus(false);
  };

  // Function to handle clearing a member from the list.
  const handleClear = (id) => {
    setMemberList((prev) => prev.filter((item) => item._id !== id));
  };
  // Function to create or update a vacation.
  const handleVacation = async (e) => {
    e.preventDefault();
    let res;
    // Create the vacation.
    const newMemberList = memberList?.map((item) => item._id);
    // const resourceList = resources?.map((item) => item._id);
    const params = {
      title: title,
      description: des,
      memberList: newMemberList,
      shareStatus: status.toLowerCase(),
      startingTime: dates[0],
      endingTime: dates[1],
    };
    try {
      if (type === "create") {
        // Create the vacation.
        res = await vacationAPI.createVacation(params);
      } else {
        // Update the vacation.
        res = await vacationAPI.updateVacation({
          id: vacationId,
          body: params,
        });
      }
      setIsSuccess(true);
      setMsg(res.data?.message);
    } catch (error) {
      setIsError(true);
      setMsg(error.message);
    }

    setOpen(false);
    setOpenNoti(true);
  };
  const isDisabledCreate = useMemo(
    () =>
      !(
        title !== "" &&
        des !== "" &&
        dates?.length === 2 &&
        memberList.length > 0
      ),
    [title, des, dates, memberList]
  );

  const isDisabledUpdate = useMemo(() => {
    const newVacationDetail = {
      title: title,
      des: des,
      status: status,
      dates: dates,
      memberList: memberList,
    };
    return (
      JSON.stringify(newVacationDetail) === JSON.stringify(initVacationDetail)
    );
  }, [title, des, dates, status, memberList]);

  const handleImgClick = () => {
    imgRef.current.click();
  };
  return (
    <>
      <Modal
        open={showModal}
        setOpen={setOpen}
        title={type === "create" ? "New Vacation" : "Update Vacation"}
      >
        <div className={cx("wrapper")}>
          <div className={cx("modal-container")}>
            <div className={cx("user-info")}>
              <div className={cx("info-name")}>
                <Avatar src={info?.avatar?.path} />
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
                        <div onClick={() => handleStatus("Only Me")}>
                          Only Me
                        </div>
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
                defaultValue={[dayjs(dates[0]), dayjs(dates[1])]}
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
                  {type === "update" && (
                    <div className={cx("upload")} onClick={handleImgClick}>
                      <UpLoad
                        imgRef={imgRef}
                        body={{ field: "cover", vacationId: vacationId }}
                      />
                      <FontAwesomeIcon icon={faImage} className={cx("icon")} />
                    </div>
                  )}
                </div>
              </div>

              <div className={cx("result")}>
                <div className={cx("result-list")}>
                  {memberList?.length > 0 && `with:`}
                  {memberList?.map((member) => {
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
                <div className={cx("resources")}>
                  {type === "update" && resources.length > 0 && "Cover:"}
                  {resources.map((resource, index) => {
                    return (
                      <ImageField
                        src={resource.path}
                        className={cx("resource")}
                        key={index}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <button
              className={cx("btn-submit")}
              disabled={type === "create" ? isDisabledCreate : isDisabledUpdate}
              onClick={handleVacation}
            >
              {type === "create" ? "Create Vacation" : "Update"}
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

export default HandleVacation;
