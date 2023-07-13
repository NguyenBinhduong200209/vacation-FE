import React, { useEffect, useRef, useState } from "react";
import Image from "../Image/Image";
import { useSelector } from "react-redux";
import axios from "axios";

const UpLoad = () => {
  const { info } = useSelector((state) => state.auth);
  const inputRef = useRef();
  const [files, setFiles] = useState(null);

  console.log(files);

  useEffect(() => {
    const upLoad = async () => {
      const formData = new FormData();
      formData.append("files", files);

      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3100/resource",
        { field: "avatar", files: formData.get("files") },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setFiles(null);
    };
    if (files !== null) upLoad();
  }, [files]);

  const handleImgClick = () => {
    inputRef.current.click();
  };
  const handleImgChange = (e) => {
    setFiles(e.target.files[0]);
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
        name="files"
      />
    </div>
  );
};

export default UpLoad;
