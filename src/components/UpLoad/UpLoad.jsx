import React, { useEffect, useRef, useState } from "react";
import Image from "../Image/Image";
import { useSelector } from "react-redux";
import axios from "axios";

const UpLoad = () => {
  const { info } = useSelector((state) => state.auth);
  const inputRef = useRef();
  const [file, setFile] = useState(null);

  useEffect(() => {
    const upLoad = async () => {
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("token");
      await axios.post(
        "https://vacation-backend.onrender.com/resource",
        { field: "avatar", file: formData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setFile(null);
    };
    if (file !== null) upLoad();
  }, [file]);
  const handleImgClick = () => {
    inputRef.current.click();
  };
  const handleImgChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div onClick={handleImgClick}>
      <Image path={info.avatar?.path} alt="" />
      <input
        type="file"
        ref={inputRef}
        onChange={handleImgChange}
        style={{ display: "none" }}
        id="avatar"
        name="avatar"
      />
    </div>
  );
};

export default UpLoad;
