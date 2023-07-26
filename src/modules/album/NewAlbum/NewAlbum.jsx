import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./NewAlbum.module.scss";
import classNames from "classnames/bind";
import Slider from "./Slider/Slider";
import "./Preloader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserList from "~/modules/vacation/components/UserList/UserList";
import { useSearchParams } from "react-router-dom";
import { VACATION_ROUTE } from "~/utils/constants";
import HandleVacation from "~/modules/vacation/HandleVacation/HandleVacation";
import Image from "./Image/Image";
import axiosClient from "~/api/axiosClient";
import { message } from "antd";
import { getList, getAlbumPage } from "~/store/slices/albumSlice";
import ImageField from "~/components/ImageField/ImageField";
import { faCircleInfo, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { getDate } from "~/helpers/function";
import { Avatar, Tooltip } from "antd";
const cx = classNames.bind(styles);

const NewAlbum = () => {
	const list = useSelector((state) => state.album.selectedImages);
	const albumpageId = useSelector((state) => state.album.selectedPageId);
	const { detail, posts, memberList } = useSelector((state) => state.vacation);
	const { authorInfo, cover, members, title, startingTime, endingTime } = detail;
	const { totalPost } = posts;
	const info = useSelector((state) => state.auth);
	console.log(info.info._id);
	const albumInfo = useSelector((state) => state.album);
	console.log(albumInfo.userId);
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const albumId = searchParams.get("albumId");
	const vacationId = searchParams.get("id");
	const dataId = Object.fromEntries(searchParams);
	const [containerSize, setContainerSize] = useState({
		outerWidth: 0,
		outerHeight: 0,
	});
	const isAuthor = info?._id === authorInfo?._id;
	const [openUserList, setOpenUserList] = useState(false);
	const startDate = getDate(startingTime);
	const endDate = getDate(endingTime);
	const [open, setOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);
	const navigate = useNavigate();
	const urlType = searchParams.get("type") || "post";

	const saveAlbum = async (e) => {
		e.preventDefault();
		try {
			const data = {
				albumId: albumId,
				vacationId: vacationId,
				page: 1,
				resource: list.map((item) => {
					return {
						style: item.style,
						resourceId: item._id,
					};
				}),
			};
			const res = await axiosClient.post(
				"https://vacation-social-network.onrender.com/albumpage/",
				data
			);
			navigate("/profile/album");
			console.log(res.data.data._id);
		} catch (error) {
			message.error(error.response.data.message);
		}
	};

	useEffect(() => {
		dispatch(getAlbumPage({ page: 1, albumId }));
	}, [dispatch, albumId]);

	const updateAlbumPage = async () => {
		try {
			const data = {
				albumpageId: albumpageId,
				albumId: albumId,
				vacationId: vacationId,
				page: "1",
				resource: list.map((item) => ({
					style: item.style,
					resourceId: item._id,
				})),
			};
			console.log(data.resource);
			await axiosClient.put(
				`https://vacation-social-network.onrender.com/albumpage/${albumpageId}`,
				data
			);
			navigate("/profile/album");
		} catch (error) {
			message.error(error.response.data.message);
		}
	};

	const handleRoute = (type) => {
		navigate(`${VACATION_ROUTE}?vacationID=${vacationId}&type=${type}`);
	};

	useEffect(() => {
		setContainerSize({
			outerWidth: ref.current.offsetWidth,
			outerHeight: ref.current.offsetHeight,
		});
	}, [ref]);

	const handleWrapClick = () => {
		setIsOpen((prevState) => !prevState);
	};

	return (
		<>
			<div className={cx("wrapper")}>
				<div className={cx("sidebar")}>
					<ImageField src={cover?.path} className={cx("img-BG")} preview={false} />
					<div className={cx("sidebar-content")}>
						<div className={cx("user-info")}>
							<div className={cx("user-index")}>
								<div className={cx("index")}>{authorInfo?.friends}</div>
								<div className={cx("index-title")}>friends</div>
							</div>
							<div className={cx("user-avatar")}>
								<Avatar
									src={isAuthor?.avatar?.path}
									shape="square"
									size={100}
									className={cx("avatar")}
								/>

								<div className={cx("fullname")}>
									{authorInfo?.firstname} {authorInfo?.lastname}
								</div>
								<div className={cx("username")}>{authorInfo?.username}</div>
							</div>
							<div className={cx("user-index")}>
								<div className={cx("index")}>{totalPost || 0}</div>
								<div className={cx("index-title")}>Posts</div>
							</div>
						</div>
						<div className={cx("vacation-detail")}>
							<div className={cx("vacation-title")}>
								Vacation Detail
								{isAuthor && (
									<FontAwesomeIcon
										icon={faPen}
										className={cx("title-icon")}
										onClick={() => setOpen(true)}
									/>
								)}
								<HandleVacation
									setOpen={setOpen}
									showModal={open}
									type="update"
									vacationId={vacationId}
								/>
							</div>
							<div className={cx("vacation-info")}>
								<div className={cx("vacation-name")}>
									<FontAwesomeIcon icon={faCircleInfo} className={cx("icon")} />
									<Tooltip
										title={title}
										color="grey"
										overlayInnerStyle={{
											textAlign: "center",
										}}
									>
										<span>{title}</span>
									</Tooltip>
								</div>

								<div onClick={() => setOpenUserList(true)}>
									<FontAwesomeIcon icon={faUser} className={cx("icon")} />
									<span>{members} people join in</span>
								</div>
								<UserList
									openUserList={openUserList}
									setOpenUserList={setOpenUserList}
									title="Member List"
									list={memberList}
								/>

								<div>
									<FontAwesomeIcon icon={faCalendar} className={cx("icon")} />
									<span>
										{startDate} - {endDate}
									</span>
								</div>
							</div>
						</div>
						<div className={cx("route")}>
							{info.info._id !== albumInfo.userId ? (
								<></>
							) : (
								<>
									<button className={cx("save-btn")} onClick={saveAlbum}>
										Save
									</button>
									<button className={cx("save-btn")} onClick={updateAlbumPage}>
										Update
									</button>
								</>
							)}
						</div>
					</div>
				</div>

				<div>
					<div>
						<div className={`wrap ${isOpen ? "open" : ""}`}>
							<div className="overlay" onClick={handleWrapClick}>
								<div className="overlay-content animate slide-left delay-2">
									<h1 className="animate slide-left pop delay-4 line">{dataId.title}</h1>
									<p
										className="animate slide-left pop delay-5"
										style={{ color: "white", marginBottom: "2.5rem" }}
									>
										Sign: <em>{info.info.username}</em>
									</p>
								</div>
								<div className="image-content animate slide delay-5"></div>
								<div className="dots animate">
									<div className="dot animate slide-up delay-6"></div>
									<div className="dot animate slide-up delay-7"></div>
									<div className="dot animate slide-up delay-8"></div>
								</div>
							</div>
							<div className="text">
								<div className={cx("wrapper")}>
									{info.info._id === albumInfo.userId ? (
										<>
											<div className={cx("mother")} ref={ref}>
												{list.map((item) => (
													<Image key={item._id} imgData={item} containerSize={containerSize} />
												))}
											</div>
										</>
									) : (
										<>
											<div className={cx("mother-banned-you")} ref={ref}>
												{list.map((item) => (
													<Image key={item._id} imgData={item} containerSize={containerSize} />
												))}
											</div>
										</>
									)}
								</div>
							</div>
						</div>
						<Slider />
					</div>
				</div>
			</div>
		</>
	);
};

export default NewAlbum;
