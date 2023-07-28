import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Preloader.scss";
import styles from "../NewAlbum.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserList from "~/modules/vacation/components/UserList/UserList";
import HandleVacation from "~/modules/vacation/HandleVacation/HandleVacation";
import { faCircleInfo, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { getDate } from "~/helpers/function";
import { getDetailVacation } from "~/store/slices/vacationSlice";
import { Tooltip } from "antd";
const cx = classNames.bind(styles);

const VacationDetail = ({ vacationId }) => {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.auth);
  const {
    detail: { authorInfo, members, title, startingTime, endingTime },
    memberList,
  } = useSelector((state) => state.vacation);
  const isAuthor = info?._id === authorInfo?._id;
  const [open, setOpen] = useState(false);
  const [openUserList, setOpenUserList] = useState(false);
  const startDate = getDate(startingTime);
  const endDate = getDate(endingTime);

  useEffect(() => {
    vacationId && dispatch(getDetailVacation(vacationId));
  }, [dispatch, vacationId]);

  return (
    <div className={cx("vacation-detail")}>
      <div className={cx("vacation-title")}>
        Vacation Detail
        {isAuthor && (
          <FontAwesomeIcon icon={faPen} className={cx("title-icon")} onClick={() => setOpen(true)} />
        )}
        <HandleVacation setOpen={setOpen} showModal={open} type="update" vacationId={vacationId} />
      </div>
      <div className={cx("vacation-info")}>
        <div className={cx("vacation-name")}>
          <FontAwesomeIcon icon={faCircleInfo} className={cx("icon")} />
          <Tooltip
            title={title}
            color="grey"
            overlayInnerStyle={{
              textAlign: "center",
            }}
          >
            <span>{title}</span>
          </Tooltip>
        </div>

        <div onClick={() => setOpenUserList(true)}>
          <FontAwesomeIcon icon={faUser} className={cx("icon")} />
          <span>{members} people join in</span>
        </div>
        <UserList
          openUserList={openUserList}
          setOpenUserList={setOpenUserList}
          title="Member List"
          list={memberList}
        />

        <div>
          <FontAwesomeIcon icon={faCalendar} className={cx("icon")} />
          <span>
            {startDate} - {endDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VacationDetail;
