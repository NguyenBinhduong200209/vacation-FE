import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CreateAlbum.module.scss";
import classNames from "classnames/bind";
import Input from "antd/es/input/Input";
import Dropdown from "./Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
import Modal from "~/components/Modal/Modal";
import { Avatar } from "antd";
const cx = classNames.bind(styles);
const CreateAlbum = ({ open, setOpen }) => {
  const { info } = useSelector((state) => state.auth);
  const [selected, setSelected] = useState("Choose Your Vacation");
  const [vacationId, setVacationId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleRoute = () => {
    navigate(`/newAlbum?id=${vacationId}&title=${inputValue}`);
  };
  return (
    <Modal open={open} setOpen={setOpen} title="New Album">
      <div className={cx("wrapper")}>
        <div className={cx("user-info")}>
          <Avatar src={info.avatar?.path} />
          <div className={cx("username")}>{info.username}</div>
        </div>
        <Input
          maxLength={100}
          onChange={handleInputValue}
          placeholder="Your Vacation Name"
          style={{ textAlign: "center" }}
          spellCheck={false}
          value={inputValue}
        />
        <Dropdown
          selected={selected}
          setSelected={setSelected}
          setVacationId={setVacationId}
        />
        <button
          className={cx("dropdown-route")}
          disabled={inputValue === "" || vacationId === null}
          onClick={handleRoute}
        >
          Select Images
        </button>
      </div>
    </Modal>
  );
};

export default CreateAlbum;
