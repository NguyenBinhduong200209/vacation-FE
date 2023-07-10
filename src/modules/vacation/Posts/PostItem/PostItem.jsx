import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styles from "./PostItem.module.scss";
import classNames from "classnames/bind";
import moment from "moment/moment";

import Interaction from "../../components/Interact/Interaction";
import Image from "~/components/Image/Image";
import { useEffect, useRef, useState } from "react";
import { setTimeline } from "~/store/slices/vacationSlice";
import { getDate } from "~/helpers/function";
import { useDispatch } from "react-redux";
import { Popover } from "antd";
import UpdatePost from "../UpdatePost/UpdatePost";

const cx = classNames.bind(styles);

const PostItem = ({ postDetail }) => {
	const { authorInfo, content, resource, comments, likes, lastUpdateAt, _id, createdAt, isLiked } =
		postDetail;
	// console.log(postDetail);
	const postItemRef = useRef(null);
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [open, setOpen] = useState(false);

	const handleCloseModal = () => {
		setShowModal(false);
	};
	const handleOpenModal = () => {
		setShowModal(true);
		setOpen(false);
		console.log("Clicked");
	};
	const handleOpenChange = (newOpen) => {
		setOpen(newOpen);
	};

	useEffect(() => {
		const handleScrollPost = () => {
			const element = postItemRef.current;
			const distanceFromTop = element.getBoundingClientRect().top;

			if (
				distanceFromTop <= window.innerHeight * 0.2 &&
				distanceFromTop >= window.innerHeight * 0.15
			) {
				dispatch(setTimeline(postItemRef.current.getAttribute("timeline")));
			}
		};

		window.addEventListener("scroll", handleScrollPost);

		return () => window.removeEventListener("scroll", handleScrollPost);
	}, []);

	return (
		<div className={cx("wrapper")} ref={postItemRef} timeline={getDate(createdAt)}>
			<header>
				<div className={cx("user-info")}>
					<Image path={authorInfo.avatar.path} alt="" className={cx("avatar")} />

					<div className={cx("username-container")}>
						{/* <div className={cx("fullname")}>Trung Hiếu</div> */}
						<div className={cx("username")}>{authorInfo.username}</div>

						<div className={cx("moment")}>{moment(lastUpdateAt).fromNow()}</div>
					</div>
				</div>
				<Popover
					content={
						<div className={cx("pop-over")}>
							<p className={cx("options")} onClick={handleOpenModal}>Edit</p>
							<p className={cx("options")}>Delete</p>
						</div>
					}
					open={open}
					trigger="click"
					onOpenChange={handleOpenChange}
					placement="bottom"
				>
					<FontAwesomeIcon icon={faEllipsisVertical} className={cx("options")} />
				</Popover>
				<UpdatePost 
					handleCloseModal={handleCloseModal}
					showModal={showModal}
					postDetail={postDetail}
				/>
			</header>

			<main>
				<div className={cx("description")}>{content}</div>
				<div className={cx("img-container")}>
					{resource.map((item, index) => (
						<Image path={item.path} alt="" key={index} />
					))}
					{resource.map((item, index) => (
						<Image path={item.path} alt="" key={index} />
					))}
				</div>
			</main>

			<Interaction likes={likes} comments={comments} postID={_id} isLikedStatus={isLiked} />
		</div>
	);
};

export default PostItem;
