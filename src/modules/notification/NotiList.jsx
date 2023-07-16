import React, { useRef, useEffect, useCallback } from "react";
import NotiItem from "./NotiItem";
import { Row, Col, Button, Typography, List } from "antd";
import { ReadOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import styles from "./Noti.module.scss";
import { useDispatch } from "react-redux";
import { getList } from "~/store/slices/notiSlice";
import { updateAll, changeVisible } from "~/store/slices/notiSlice";
import { query, where, orderBy, onSnapshot, collection } from "firebase/firestore";
import firestore from "~/utils/firestore";
const cx = classNames.bind(styles);

const NotiList = () => {
  const { list, isVisible } = useSelector((state) => state.noti);
  const userId = useSelector((state) => state.auth?.info?.id);
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

  useEffect(() => {
    if (userId) {
      const notiRef = collection(firestore, "notifications");
      const q = query(notiRef, where("receiverId", "==", userId), orderBy("lastUpdateAt", "desc"));
      onSnapshot(q, (query) => {
        dispatch(getList({ page: 1 }));
      });
    }
  }, [userId, dispatch]);

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

      <List
        className={cx("noti-list")}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item, index) => <NotiItem key={item.id} item={item} />}
      />
    </div>
  );
};

export default NotiList;
