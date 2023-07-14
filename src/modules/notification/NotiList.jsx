import React, { useRef, useEffect, useCallback } from "react";
import NotiItem from "./NotiItem";
import { Row, Col, Button, Typography } from "antd";
import { ReadOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import styles from "./Noti.module.scss";
import { useDispatch } from "react-redux";
import { updateAll, changeVisible } from "~/store/slices/notiSlice";
const cx = classNames.bind(styles);

const NotiList = () => {
  const { list, isVisible } = useSelector((state) => state.noti);
  const dispatch = useDispatch();
  const notiRef = useRef(null);

  const handleClickOutside = useCallback(
    (event) => {
      const iconName = event.target.getAttribute("data-icon");
      if (notiRef.current && !notiRef.current.contains(event.target)) {
        iconName === "bell" ? dispatch(changeVisible()) : isVisible && dispatch(changeVisible(false));
      }
    },
    [dispatch, isVisible]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleUpdateAll = () => {
    dispatch(updateAll());
  };

  return (
    <div ref={notiRef} className={cx("notification")} id={cx(isVisible ? "show" : "hide")}>
      <Row className={cx("header")}>
        <Col span={13}>
          <Typography.Title level={2} style={{ margin: 0, color: "white" }}>
            Notifications
          </Typography.Title>
        </Col>

        <Col offset={4} span={7}>
          <Button block={true} className={cx("button-mark")} ghost icon={<ReadOutlined />}>
            <Typography.Text style={{ marginRight: 0 }} underline onClick={handleUpdateAll}>
              Mark as Read
            </Typography.Text>
          </Button>
        </Col>
      </Row>

      <div className={cx("noti-list")}>
        {list.map((item) => {
          return <NotiItem key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default NotiList;
