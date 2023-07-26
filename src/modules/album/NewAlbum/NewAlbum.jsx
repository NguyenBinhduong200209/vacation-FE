import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./NewAlbum.module.scss";
import classNames from "classnames/bind";
import Slider from "./Slider/Slider";
import "./Preloader.scss";
import { useSearchParams } from "react-router-dom";
import Image from "./Image/Image";
import axiosClient from "~/api/axiosClient";
import { message } from "antd";
import { getList, getAlbumPage } from "~/store/slices/albumSlice";
const cx = classNames.bind(styles);

const NewAlbum = () => {
	const list = useSelector((state) => state.album.selectedImages);
	console.log(list.length);
	const albumpageId = useSelector((state) => state.album.selectedPageId);
	console.log(albumpageId);
	const info = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const albumId = searchParams.get("albumId");
	const vacationId = searchParams.get("id");
	const dataId = Object.fromEntries(searchParams);
	const [containerSize, setContainerSize] = useState({
		outerWidth: 0,
		outerHeight: 0,
	});
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);
	const navigate = useNavigate();

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
							<div className={cx("mother")} ref={ref}>
								{list.map((item) => (
									<Image key={item._id} imgData={item} containerSize={containerSize} />
								))}
							</div>
						</div>
					</div>
				</div>
				<Slider />
			</div>

			{list.length === 0 ? (
				<button className={cx("save-btn")} onClick={saveAlbum}>
					Save
				</button>
			) : ( 
				<button className={cx("save-btn")} onClick={updateAlbumPage}>
					Update
				</button>
			)}
		</>
	);
};

export default NewAlbum;
