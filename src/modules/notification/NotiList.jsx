import React from "react";
import NotiItem from "./NotiItem";
import { Row, Col, Button, Typography } from "antd";
import { ReadOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import styles from "./Noti.module.scss";

const cx = classNames.bind(styles);

const NotiList = () => {
  const { list, isVisible } = useSelector((state) => state.noti);

  return (
    <div className={cx("notification")} id={cx(isVisible ? "show" : "hide")}>
      <Row className={cx("header")}>
        <Col span={15}>
          <Typography.Title level={2} style={{ margin: 0, color: "white" }}>
            Notifications
          </Typography.Title>
        </Col>

        <Col offset={1} span={8}>
          <Button block={true} className={cx("button-mark")} ghost icon={<ReadOutlined />}>
            <Typography.Text style={{ marginRight: 0 }} underline>
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
