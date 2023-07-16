import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import { handleAuth } from "~/store/slices/authSlice";
import styles from "./Overview.module.scss";
import Loading from "~/components/Loading/Loading";

import Notification from "~/components/Notification/Notification";
import UpLoad from "~/components/UpLoad/UpLoad";
import Image from "~/components/Image/Image";

const cx = classNames.bind(styles);

const Overview = () => {
  const dispatch = useDispatch();
  const { isLoading, info } = useSelector((state) => state.auth);
  const { avatar, username, firstname, lastname, description } = info;
  const [inputValue, setInputValue] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const imgRef = useRef();
  const [img, setImg] = useState("");
  console.log(info);
  // Set Input Value when component mounted
  useEffect(() => {
    setInputValue(description);
  }, [description]);

  // Handle Input Change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(
      handleAuth({
        type: "updateUser",
        data: {
          description: inputValue,
        },
      })
    );
  };

  const handleClear = () => {
    window.location.reload();
  };

  const handleFocus = () => {
    setIsChanged(true);
  };

  const handleImgClick = () => {
    imgRef.current.click();
    window.location.reload();
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("userName-container")}>
        <div className={cx("avatar")} onClick={handleImgClick}>
          <UpLoad imgRef={imgRef} setImg={setImg} />
          <Image path={info.avatar?.path} alt="This is icon" />
        </div>

        <div className={cx("userName")}>
          <div className={cx("sub-name")}>{username}</div>
          <div className={cx("name")}>{`${firstname} ${lastname}`}</div>
        </div>
      </div>
      <div className={cx("des-container")}>
        <div className={cx("title")}>Description</div>
        <div className={cx("des-detail")}>
          <textarea
            value={inputValue}
            onChange={handleChange}
            spellCheck={false}
            onFocus={handleFocus}
          />
        </div>
      </div>
      {isChanged && (
        <div className={cx("btn-container")}>
          <button className={cx("btn-save")} onClick={handleSubmit}>
            <span>Save change</span>
            {isLoading && <Loading />}
          </button>
          <button className={cx("btn-cancel")} onClick={handleClear}>
            <span>Cancel</span>
          </button>
        </div>
      )}

      <Notification />
    </div>
  );
};

export default Overview;
