import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./CreateAlbum.module.scss";
import classNames from "classnames/bind";
import Input from "antd/es/input/Input";
import Dropdown from "./Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
import Modal from "~/components/Modal/Modal";
import { Avatar, message } from "antd";
import SelectFriend from "~/modules/components/SelectFriend/SelectFriend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCaretDown,
	faShield,
} from "@fortawesome/free-solid-svg-icons";
import axiosClient from "~/api/axiosClient";
const cx = classNames.bind(styles);
const CreateAlbum = ({ open, setOpen }) => {
	const statusRef = useRef();
	const { info } = useSelector((state) => state.auth);
	const [openStatus, setOpenStatus] = useState(false);
	const [openFriend, setOpenFriend] = useState(false);
	const [friendType, setFriendType] = useState("memberList");
	const [albumInfo, setAlbumInfo] = useState({
		title: "",
		des: "",
		status: "public",
	});
	const { status } = albumInfo;
	const [memberList, setMemberList] = useState([]);
	const [shareList, setShareList] = useState([]);
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
				userId: info._id,
			};
			const res = await axiosClient.post("album", data);
			navigate(
				`/newAlbum?id=${selected._id}&title=${inputValue}&albumId=${res.data.data._id}&userId=${info._id}`
			);
			console.log(res);
		} catch (error) {
			message.error(error.response?.data.message);
			console.log(error);
		}
	};

	const handleStatus = (status) => {
		setAlbumInfo((prev) => {
			return { ...prev, status: status };
		});
		if (status === "protected") {
			setOpenFriend(true);
			setFriendType("shareList");
		}
		setOpenStatus(false);
	};

	return (
		<Modal open={open} setOpen={setOpen} title="New Album">
			<div className={cx("wrapper")}>
				<div className={cx("user-info")}>
					<Avatar src={info.avatar?.path} />
					<div className={cx("username")}>{info.username}</div>
					<div ref={statusRef} className={cx("status")} onClick={() => setOpenStatus(!openStatus)}>
						<span>{status}</span>
						<FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: "0.8rem", cursor: "pointer" }} />
						{openStatus && (
							<div className={cx("dropdown-status")}>
								<div onClick={() => handleStatus("public")}>Public</div>
								<div onClick={() => handleStatus("protected")}>Protected</div>
								<div onClick={() => handleStatus("only me")}>Only Me</div>
							</div>
						)}
						{status === "protected" && (
							<FontAwesomeIcon
								icon={faShield}
								className={cx("icon")}
								onClick={() => {
									setOpenFriend(true);
									setFriendType("shareList");
								}}
							/>
						)}
					</div>
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
			{friendType === "memberList" ? (
				<SelectFriend
					open={openFriend}
					setOpen={setOpenFriend}
					setUserList={setMemberList}
					userList={memberList}
					type={friendType}
					title="Your Member"
				/>
			) : (
				<SelectFriend
					open={openFriend}
					setOpen={setOpenFriend}
					setUserList={setShareList}
					userList={shareList}
					type={friendType}
					title="Friends who will see your vacation"
				/>
			)}
		</Modal>
	);
};

export default CreateAlbum;
