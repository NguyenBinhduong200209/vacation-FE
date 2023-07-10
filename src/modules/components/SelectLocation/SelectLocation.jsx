import styles from "./SelectLocation.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAnglesDown,
	faArrowLeft,
	faCircleXmark,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getManyLocations } from "~/store/slices/locationSlice";
import TextArea from "antd/es/input/TextArea";
import locationAPI from "~/api/locationAPI";
import Modal from "~/components/Modal/Modal";

const cx = classNames.bind(styles);
const SelectLocation = ({ setOpenLocation, openLocation, handleOnClick }) => {
	const dispatch = useDispatch();
	const [city, setCity] = useState("");
	const [district, setDistrict] = useState("");
	const [detailLocation, setDetailLocation] = useState("");
	const [level, setLevel] = useState(3); // set level: lv3: get city list, lv2: get district list, lv1: get detail list
	const [inputValue, setInputValue] = useState("");
	const [locationName, setLocationName] = useState("");
	const [locationDes, setLocationDes] = useState("");
	let cityId = useRef(null);
	let districtId = useRef(null);
	const { locationList } = useSelector((state) => state.location);
	console.log(locationList);
	useEffect(() => {
		dispatch(
			getManyLocations({
				type: "level",
				number: level,
				parentId: level === 2 ? cityId.current : level === 1 ? districtId.current : null,
			})
		);
	}, [level]);

	const handleSelect = (location, id) => {
		switch (level) {
			case 3:
				setCity(location);
				cityId.current = id;
				setDistrict("");
				setDetailLocation("");

				break;
			case 2:
				setDistrict(location);
				districtId.current = id;
				setDetailLocation("");

			default:
				setDetailLocation(location);
				break;
		}
		if (level > 1) setLevel((prev) => prev - 1);
	};

	const isEmpty = useMemo(() => {
		if (inputValue !== "") {
			const result = locationList?.every((item) =>
				item.title.toLowerCase().indexOf(inputValue.toLowerCase())
			);
			return result;
		}
	}, [inputValue]);

	const handleAddLocation = async () => {
		await locationAPI.addLocation({
			parentId: districtId,
			title: locationName,
			description: locationDes,
		});

		setDetailLocation(locationName);
	};

	return (
		<Modal open={openLocation} setOpen={setOpenLocation} title="Select Your Location">
			<div className={cx("wrapper")}>
				<div className={cx("select-input")}>
					<input
						type="text"
						spellCheck={false}
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						placeholder="Choose Your Location"
					/>
					<FontAwesomeIcon icon={faMagnifyingGlass} className={cx("icon")} />
				</div>

				<div className={cx("dropdown-content")}>
					{level < 3 && (
						<FontAwesomeIcon
							icon={faArrowLeft}
							className={cx("back-icon")}
							onClick={() => setLevel((prev) => prev < 3 && prev + 1)}
						/>
					)}

					{locationList?.map((location) => {
						return (
							location.title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 && (
								<div
									className={cx("dropdown-item")}
									onClick={() => handleSelect(location.title, location._id)}
									key={location._id}
								>
									{location.title}
								</div>
							)
						);
					})}

					{(isEmpty || locationList?.length === 0 || !locationList) && (
						<div className={cx("dropdown-error")}>Not Found</div>
					)}
				</div>
				{level === 1 && (
					<div>
						<div className={cx("add-location")}>
							Can't find location? Add New Location
							<FontAwesomeIcon icon={faAnglesDown} style={{ marginLeft: "1rem" }} />
						</div>

						<TextArea
							placeholder="Your Location Name"
							autoSize
							className={cx("new-location-name")}
							value={locationName}
							onChange={(e) => setLocationName(e.target.value)}
							spellCheck={false}
						/>
						<TextArea
							value={locationDes}
							onChange={(e) => setLocationDes(e.target.value)}
							placeholder="Introducing your location"
							autoSize={{
								minRows: 3,
								maxRows: 5,
							}}
							spellCheck={false}
							className={cx("new-location-des")}
						/>

						<button
							onClick={handleAddLocation}
							disabled={!locationName}
							className={cx("btn-create-location")}
						>
							Add New Location
						</button>
					</div>
				)}

				<div className={cx("btn-save")}>
					Save: {city}
					{district && `, ${district}`}
					{detailLocation && `, ${detailLocation}`}
				</div>
			</div>
		</Modal>
	);
};

export default SelectLocation;
