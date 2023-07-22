import React, { useLayoutEffect, useRef, useState } from "react";
import "react-resizable/css/styles.css";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import styles from "./NewAlbum.module.scss";
import classNames from "classnames/bind";
import Slider from "./Slider/Slider";
import "./Preloader.scss";
import { useSearchParams } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

const NewAlbum = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [cardSizes, setCardSizes] = useState([]);

  const handleImageSelect = (imageUrl) => {
    setSelectedImages((prevImages) => [...prevImages, imageUrl]);
  };

  const handleImageRemove = (imageId) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image._id !== imageId)
    );
  };

  const [searchParams] = useSearchParams();
  const dataId = Object.fromEntries([...searchParams]);
  const [isOpen, setIsOpen] = useState(false);

  const handleWrapClick = () => {
    setIsOpen((prevState) => !prevState);
  };

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
    const { lastX, lastY } = data;

    if (event.target.parentElement) {
      setPosition({
        x: lastX,
        y: lastY,
      });
    }
  };

  const [width, setWidth] = React.useState(100);
  const [height, setHeight] = React.useState(100);

  const handleResize = async (event, { size }, imageId) => {
    setCardSizes((prevSizes) => {
      const newSizes = [...prevSizes];
      const imageIndex = selectedImages.findIndex(
        (image) => image._id === imageId
      );
      newSizes[imageIndex] = size;
      return newSizes;
    });
  };

  return (
    <div>
      <div className={`wrap ${isOpen ? "open" : ""}`}>
        <div className="overlay" onClick={handleWrapClick}>
          <div className="overlay-content animate slide-left delay-2">
            <h1 className="animate slide-left pop delay-4 line">
              {dataId.title}
            </h1>
            <p
              className="animate slide-left pop delay-5"
              style={{ color: "white", marginBottom: "2.5rem" }}
            >
              Sign: <em>Creator</em>
            </p>
          </div>
          <div className="image-content animate slide delay-5"></div>
          <div className="dots animate">
            <div className="dot animate slide-up delay-6"></div>
            <div className="dot animate slide-up delay-7"></div>
            <div className="dot animate slide-up delay-8"></div>
          </div>
        </div>
        <div className="text">
          <div className={cx("wrapper")}>
            <div className={cx("mother")} ref={ref}>
              {selectedImages.map((imageUrl) => {
                return (
                  <Draggable
                    key={`${imageUrl?._id}`}
                    handle={`.${cx("handle")}`}
                    defaultPosition={{ x: 0, y: 0 }}
                    onDrag={handleDrag}
                    bounds="parent"
                    defaultClassName={cx("draggable")}
                  >
                    <ResizableBox
                      width={
                        cardSizes.find((item) => item.id === imageUrl._id)
                          ?.width || width
                      }
                      height={
                        cardSizes.find((item) => item.id === imageUrl._id)
                          ?.height || height
                      }
                      onResize={(event, size) =>
                        handleResize(event, size, imageUrl._id)
                      }
                      maxConstraints={[
                        containerSize.outerWidth - position.x,
                        containerSize.outerHeight - position.y,
                      ]}
                    >
                      <div
                        className={cx("handle")}
                        style={{
                          backgroundImage: `url(${imageUrl?.path})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <CloseCircleOutlined
                          className={cx("close-icon")}
                          onClick={() => {
                            handleImageRemove(imageUrl._id);
                          }}
                        />
                      </div>
                    </ResizableBox>
                  </Draggable>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Slider
        onImageSelect={handleImageSelect}
        selectedImages={selectedImages}
        onImageRemove={handleImageRemove}
      />
    </div>
  );
};

export default NewAlbum;
