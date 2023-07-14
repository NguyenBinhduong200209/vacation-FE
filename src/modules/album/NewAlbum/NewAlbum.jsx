import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import "react-resizable/css/styles.css";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import styles from "./NewAlbum.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import axiosClient from "~/api/axiosClient";
const cx = classNames.bind(styles);

const NewAlbum = () => {
  const [img, setImg] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchImg = await axiosClient.get(`vacation/:id/images`);
        setImg(fetchImg.data.data);
        console.log(fetchImg);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // console.log(fetchImg, img);
  const [searchParam] = useSearchParams();

  const title = searchParam.get("title");
  const vacationId = searchParam.get("id");
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = React.useState({
    outerWidth: 100,
    outerHeight: 100,
  });
  const ref = useRef(null);

  useLayoutEffect(() => {
    setContainerSize({
      outerWidth: ref.current.offsetWidth,
      outerHeight: ref.current.offsetHeight,
    });
  }, []);

  const handleDrag = async (event, data) => {
    // console.log(event, data);
    const { lastX, lastY } = data;

    if (event.target.parentElement) {
      setPosition({
        x: lastX,
        y: lastY,
      });
    }
  };

  const [width, setWidth] = React.useState(200);
  const [height, setHeight] = React.useState(200);

  const handleResize = async (event, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  };
  // console.log(
  //   containerSize.outerWidth - position.x,
  //   containerSize.outerHeight - position.y
  // );

  return (
    <div className={cx("wrapper")}>
      <div className={cx("mother")} ref={ref}>
        <Draggable
          defaultPosition={{ x: position.x, y: position.y }}
          onDrag={handleDrag}
          bounds="parent"
        >
          <ResizableBox
            width={width}
            height={height}
            onResize={handleResize}
            maxConstraints={[
              containerSize.outerWidth - position.x,
              containerSize.outerHeight - position.y,
            ]}
          >
            {/* <img
              className="handle"
              src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"
              alt="???"
            /> */}
            <div className={cx("handle")}></div>
          </ResizableBox>
        </Draggable>
      </div>

      <div>
        <ul>
          {img.map((img) => (
            <img key={img._id} src={img?.path} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewAlbum;
