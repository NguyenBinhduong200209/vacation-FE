import React from "react";
import { Menu } from "antd";
import { EllipsisOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { removeFriend } from "~/store/slices/friendSlice";
import classNames from "classnames/bind";
import styles from "../Friend.module.scss";
const cx = classNames.bind(styles);

const DropdownMore = ({ id }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFriend({ id }));
  };

  return (
    <Menu
      className={cx("drop")}
      mode="horizontal"
      theme="dark"
      items={[
        {
          key: "SubMenu",

          icon: <EllipsisOutlined style={{ color: "white", width: "100%", display: "inline-block" }} />,
          children: [
            {
              key: "1",
              label: (
                <div className={cx("drop-item")}>
                  <CloseOutlined style={{ fontSize: "2rem" }} />
                  <span onClick={handleRemove}>Remove</span>
                </div>
              ),
            },
          ],
        },
      ]}
    />
  );
};

export default DropdownMore;
