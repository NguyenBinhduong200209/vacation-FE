import React from "react";
import { Space, Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { acceptFriend, removeFriend } from "~/store/slices/friendSlice";

const ButtonGroup = ({ userId, id }) => {
  const dispatch = useDispatch();

  const handleAccept = () => {
    dispatch(acceptFriend({ id }));
  };

  const handleRemove = () => {
    dispatch(removeFriend({ id: userId }));
  };

  return (
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
  );
};

export default ButtonGroup;
