import Modal from "react-modal";
import styles from "./CreatePost.module.scss";
import classNames from "classnames/bind";
import Image from "~/components/Image/Image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faImage, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import vacationAPI from "~/api/vacationAPI";
import SelectLocation from "~/modules/components/SelectLocation/SelectLocation";

const cx = classNames.bind(styles);
Modal.setAppElement("#root");
const CreatePost = ({ showModal, handleCloseModal, newfeed }) => {
	const dispatch = useDispatch();
	const { detail } = useSelector((state) => state.vacation);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [img, setImg] = useState([]);
	const { authorInfo } = detail;
	const [searchParams] = useSearchParams();
	let vacationId = searchParams.get("vacationID");
	const [content, setContent] = useState("");
	const [files, setFiles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [location, setLocation] = useState({});
	const uploadResourcesRef = useRef();
	// const [locations, setLocations] = useState([]);
	const [locationTitle, setLocationTitle] = useState("");
	

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const handleClick = async (e) => {
		let fileList = []
		e.preventDefault();
		const idList = await uploadFiles();
		console.log(idList);
		try {
			setIsLoading(true);
			const res = await vacationAPI.createPost({
				vacationId: vacationId,
				locationId: location.detail.id,
				content: content,
				resources: idList,
			});
			
			handleCloseModal();
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
		fileList.splice(0, fileList.length)
	};

	const uploadFiles = async () => {
		const formData = new FormData();
		files.forEach((file) => {
		  formData.append('files', file);
		});
		formData.append('field', "post");
		formData.append('vacationId', vacationId);
		try {
			const response = await axios.post(
				'https://vacation-backend.onrender.com/resource/',
				formData,
				{
					headers: {
						'Authorization': localStorage.getItem("token"),
					},
				}
			);
			const data = response.data.data;
			const ids = data.map(item => item._id);
			console.log(ids);
			return ids;
		} catch (error) {
			
		}
	};

	useEffect(() => {
		uploadFiles();
	}, [])
	

	const handleUpload = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			console.log(e.target.files);
			setFiles([...files, ...Object.values(e.target.files)]);
		}
		uploadFiles();
		e.target.value = null;
	};

	const handleDelete = (deletedFile, index) => {
		setFiles(files.filter((file, i) => i !== index));
	};

	return (
		<Modal
			isOpen={showModal}
			onRequestClose={handleCloseModal}
			className={cx("modal")}
			overlayClassName={cx("overlay")}
		>
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
						{newfeed && <div className={cx("select-vacation")}>Choose your Vacation</div>}
					</div>
					<TextArea
						placeholder="What is on your mind..."
						autoSize={{
							minRows: 6,
							maxRows: 12,
						}}
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
					<div className={cx("img-uploader")}>
						{files.map((file, index) => (
							<div className={cx("img-container")}>
								<img alt="" src={URL.createObjectURL(file)} />
								<CloseCircleOutlined onClick={() => handleDelete(file, index)} className={cx("img-btn")}/>
							</div>
						))}
					</div>
					<div className={cx("post-extension")}>
						<div> Add on: {location?.detail?.title} </div>
						{/* console.log(locationTitle); */}
						<div className={cx("extensions")}>
							<div>
								<FontAwesomeIcon onClick={openModal} icon={faLocationDot} className={cx("icon")} />
								<SelectLocation
									openLocation={modalIsOpen}
									setOpenLocation={setIsOpen}
									setLocation={setLocation}
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

export default CreatePost;
