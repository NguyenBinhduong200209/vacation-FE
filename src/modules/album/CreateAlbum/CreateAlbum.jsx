import React, { useState } from "react";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import styles from "./CreateAlbum.module.scss";
import classNames from "classnames/bind";
import Input from "antd/es/input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faL } from "@fortawesome/free-solid-svg-icons";
import Image from "~/components/Image/Image";
import Dropdown from "./Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
const CreateAlbum = ({ handleCloseAlbumModal, showAlbumModal }) => {
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
    <ReactModal
      isOpen={showAlbumModal}
      onRequestClose={handleCloseAlbumModal}
      className={cx("modal")}
      overlayClassName={cx("overlay")}
    >
      <header className={cx("title")}>New Album</header>
      <div className={cx("user-info")}>
        <Image path={info.avatar?.path} />
        <div className={cx("username")}>{info.username}</div>
      </div>
      <FontAwesomeIcon
        icon={faCircleXmark}
        className={cx("close-icon")}
        onClick={handleCloseAlbumModal}
      />
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
    </ReactModal>
  );
};

export default CreateAlbum;
