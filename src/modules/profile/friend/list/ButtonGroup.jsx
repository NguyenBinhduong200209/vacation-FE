import React from "react";
import { Space, Button, message } from "antd";
// import classNames from "classnames/bind";
// import styles from "../Friend.module.scss";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { acceptFriend, removeFriend } from "~/store/slices/friendSlice";
// const cx = classNames.bind(styles);

const ButtonGroup = ({ userId, id }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const handleAccept = () => {
    dispatch(acceptFriend({ friendRequestId: id, status: "accepted" }));
    messageApi.loading({
      key: "updateAdd",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.success({
        key: "updateAdd",
        content: "Success Add",
      });
    }, 1000);
  };

  const handleRemove = () => {
    dispatch(removeFriend({ id: userId }));
    messageApi.loading({
      key: "updateRemove",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.success({
        key: "updateRemove",
        content: "Success Remove",
      });
    }, 1000);
  };

  return (
    <>
      {contextHolder}
      <Space align={"center"} direction={"vertical"}>
        <Button
          style={{ width: "100px" }}
          onClick={handleAccept}
          type="primary"
          block
          ghost
          icon={<CheckOutlined />}
        >
          Accept
        </Button>
        <Button
          style={{ width: "100px" }}
          onClick={handleRemove}
          type="primary"
          block
          danger
          ghost
          icon={<CloseOutlined />}
        >
          Decline
        </Button>
      </Space>
    </>
  );
};

export default ButtonGroup;
