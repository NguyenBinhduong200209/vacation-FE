import Modal from "react-modal";
import styles from "./UpdatePost.module.scss";
import classNames from "classnames/bind";
import Image from "~/components/Image/Image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faImage, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import vacationAPI from "~/api/vacationAPI";
import locationAPI from "~/api/locationAPI";
import { getManyLocations } from "~/store/slices/locationSlice";
import SelectLocation from "~/modules/components/SelectLocation/SelectLocation";

const cx = classNames.bind(styles);
Modal.setAppElement("#root");
const UpdatePost = ({ showModal, handleCloseModal, postDetail }) => {
	const [modalIsOpen, setIsOpen] = useState(false);
	const { authorInfo, content, resource, _id, location } = postDetail;
	const [updateContent, setUpdateContent] = useState(content);
	const [searchParams] = useSearchParams();
	let vacationId = searchParams.get("vacationID");
	const { posts, detail } = useSelector((state) => state.vacation);

	console.log(detail);

	const [files, setFiles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [locationState, setLocationState] = useState(location);
	const uploadResourcesRef = useRef();

	const [selectedLocation, setSelectedLocation] = useState("");

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const handleClick = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const res = await vacationAPI.updatePost({
				vacationId: vacationId,
				locationId: location?.detail?.id,
				content: updateContent,
				id: _id,
			});
			handleCloseModal();
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	const handleDelete = (deletedFile, index) => {
		setFiles(files.filter((file, i) => i !== index));
	};

	const handleUpdateContent = (e) => {
		setUpdateContent(e.target.value);
	};

	const handleUpload = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			console.log(e.target.files);
			setFiles([...files, ...Object.values(e.target.files)]);
		}
	};

	return (
		<Modal isOpen={showModal} onRequestClose={handleCloseModal} className={cx("modal")}>
			<div className={cx("wrapper")}>
				<h2 className={cx("title")}>New Post</h2>

				<FontAwesomeIcon
					icon={faCircleXmark}
					className={cx("close-icon")}
					onClick={handleCloseModal}
				/>

				<div className={cx("modal-container")}>
					<div className={cx("user-info")}>
						<div className={cx("info-name")}>
							<Image path={authorInfo && authorInfo.avatar} />
							<div className={cx("username")}>{authorInfo && authorInfo.username}</div>
						</div>

						<div className={cx("vacation-info")}>{detail.title}</div>
					</div>
					<TextArea
						placeholder="What is on your mind..."
						autoSize={{
							minRows: 6,
							maxRows: 12,
						}}
						value={updateContent}
						onChange={handleUpdateContent}
					/>
					<div className={cx("img-uploader")}>
						{files.map((file, index) => (
							<div className={cx("img-container")}>
								<img alt="" src={URL.createObjectURL(file)} />
								<button className={cx("x-button")} onClick={() => handleDelete(file, index)}>
									X
								</button>
							</div>
						))}
					</div>
					<div className={cx("post-extension")}>
						<div> Add on: {location?.detail} </div>
						{/* console.log(locationTitle); */}
						<div className={cx("extensions")}>
							<div>
								<FontAwesomeIcon onClick={openModal} icon={faLocationDot} className={cx("icon")} />
								<SelectLocation
									openLocation={modalIsOpen}
									setOpenLocation={setIsOpen}
									setLocation={setLocationState}
								/>
							</div>
							<div>
								<input type="file" ref={uploadResourcesRef} onChange={handleUpload} hidden />
								<FontAwesomeIcon
									icon={faImage}
									className={cx("icon")}
									onClick={() => {
										uploadResourcesRef.current.click();
									}}
								/>
							</div>
						</div>
					</div>
					<button onClick={handleClick} disabled={isLoading} className={cx("btn-submit")}>
						Sending Post
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default UpdatePost;
