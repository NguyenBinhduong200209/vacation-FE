import React, { useEffect, useState } from "react";
import axios from "axios";

const UpLoad = ({ imgRef, setImg }) => {
  const [files, setFiles] = useState(null);
  useEffect(() => {
    const upLoad = async () => {
      const formData = new FormData();
      formData.append("files", files);
      const token = localStorage.getItem("token");
      await axios.post(
        "https://vacation-backend.onrender.com/resource",
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

  const handleImgChange = (e) => {
    setFiles(e.target.files[0]);
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <input
      type="file"
      ref={imgRef}
      onChange={handleImgChange}
      hidden
      id="avatar"
      name="files"
    />
  );
};

export default UpLoad;
