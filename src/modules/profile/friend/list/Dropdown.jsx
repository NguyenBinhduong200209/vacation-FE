import React from "react";
import { Dropdown, Space, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { removeFriend } from "~/store/slices/friendSlice";

const DropdownMore = ({ userId }) => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

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
      <Dropdown
        trigger={["click"]}
        menu={{
          items: [
            {
              key: "1",
              label: <div onClick={handleRemove}>Remove</div>,
            },
          ],
        }}
        placement="bottomRight"
        arrow
      >
        <Space style={{ cursor: "pointer", color: "white" }}>
          More
          <DownOutlined />
        </Space>
      </Dropdown>
    </>
  );
};

export default DropdownMore;
