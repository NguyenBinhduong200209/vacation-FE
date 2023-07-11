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
const SelectLocation = ({ setOpenLocation, openLocation, setLocation }) => {
  const dispatch = useDispatch();
  const { locationList } = useSelector((state) => state.location);
  const [selectedLocation, setSelectedLocation] = useState({
    city: "",
    district: "",
    detail: "",
  });
  const [level, setLevel] = useState(3); // set level: lv3: get city list, lv2: get district list, lv1: get detail list
  const [inputValue, setInputValue] = useState("");
  const [locationName, setLocationName] = useState("");
  const [locationDes, setLocationDes] = useState("");
  const isChangeList = useRef(false);
  let cityId = useRef(null);
  let districtId = useRef(null);
  //   console.log(locationList);

  // get locationList
  useEffect(() => {
    dispatch(
      getManyLocations({
        type: "level",
        number: level,
        parentId:
          level === 2
            ? cityId.current
            : level === 1
            ? districtId.current
            : null,
      })
    );

    isChangeList.current = false;
  }, [level, isChangeList.current]);

  // handle select event
  const handleSelect = (location, id) => {
    if (level > 1) setLevel((prev) => prev - 1);
    switch (level) {
      case 3:
        setSelectedLocation((prev) => {
          return { ...prev, city: location };
        });
        cityId.current = id;
        break;
      case 2:
        setSelectedLocation((prev) => {
          return { ...prev, district: location };
        });
        districtId.current = id;
        break;

      case 1:
        setSelectedLocation((prev) => {
          return { ...prev, detail: location };
        });
        break;
      default:
        break;
    }
    setInputValue("");
  };

  // handle back event
  const handleBack = () => {
    setLevel((prev) => prev < 3 && prev + 1);
    switch (level) {
      case 1:
        setSelectedLocation((prev) => {
          return { ...prev, detail: "" };
        });
        break;
      case 2:
        setSelectedLocation((prev) => {
          return { ...prev, district: "" };
        });
        break;
      default:
        break;
    }
  };

  const isEmpty = useMemo(() => {
    if (inputValue !== "") {
      const result = locationList?.every((item) =>
        item.title.toLowerCase().indexOf(inputValue.toLowerCase())
      );
      return result;
    }
  }, [inputValue]);

  // add new location
  const handleAddLocation = async () => {
    await locationAPI.addLocation({
      parentId: districtId.current,
      title: locationName,
      description: locationDes,
    });
    setSelectedLocation((prev) => {
      return { ...prev, detail: locationName };
    });
    setInputValue("");
    setLocationName("");
    setLocationDes("");
    isChangeList.current = true;
  };

  const handleSaveLocation = () => {
    setLocation(selectedLocation);
    setOpenLocation(false);
  };
  return (
    <Modal
      open={openLocation}
      setOpen={setOpenLocation}
      title="Select Your Location"
    >
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
              onClick={handleBack}
            />
          )}

          {locationList?.map((location) => {
            return (
              location.title.toLowerCase().indexOf(inputValue.toLowerCase()) !==
                -1 && (
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
              <FontAwesomeIcon
                icon={faAnglesDown}
                style={{ marginLeft: "1rem" }}
              />
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

        <button
          className={cx("btn-save")}
          disabled={Object.values(selectedLocation).some((item) => item === "")}
          onClick={handleSaveLocation}
        >
          Save {selectedLocation.city && `:${selectedLocation.city}`}
          {selectedLocation.district && `, ${selectedLocation.district}`}
          {selectedLocation.detail && `, ${selectedLocation.detail}`}
        </button>
      </div>
    </Modal>
  );
};

export default SelectLocation;
