import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CreateAlbum.module.scss";
import classNames from "classnames/bind";
import Input from "antd/es/input/Input";
import Dropdown from "./Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
import Modal from "~/components/Modal/Modal";
import { Avatar } from "antd";
import axios from "axios";
import axiosClient from "~/api/axiosClient";
const cx = classNames.bind(styles);
const CreateAlbum = ({ open, setOpen }) => {
	const { info } = useSelector((state) => state.auth);
	const [selected, setSelected] = useState({
		title: "Choose Your Vacation",
		id: "",
	});
	const [inputValue, setInputValue] = useState("");
	const navigate = useNavigate();
	const handleInputValue = (e) => {
		setInputValue(e.target.value);
	};

	const handleRoute = async (e) => {
		e.preventDefault();
		try {
			const data = {
				vacationId: selected._id,
				title: inputValue,
			};
			const res = await axiosClient.post("https://vacation-backend.onrender.com/album", data);
			navigate(`/newAlbum?id=${selected._id}&title=${inputValue}&albumId=${res.data.data._id}`);
			return res.data.data._id;
		} catch (error) {
			console.log(error);
		}
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
				<Dropdown selected={selected} setSelected={setSelected} />
				<button
					className={cx("dropdown-route")}
					disabled={inputValue === "" || selected._id === ""}
					onClick={handleRoute}
				>
					Select Images
				</button>
			</div>
		</Modal>
	);
};

export default CreateAlbum;
