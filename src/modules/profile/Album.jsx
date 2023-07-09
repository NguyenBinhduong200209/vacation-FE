import React, { useEffect, useLayoutEffect, useRef } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import styles from "./css.css";
import "react-resizable/css/styles.css";

const Album = () => {
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

  const [width, setWidth] = React.useState(200);
  const [height, setHeight] = React.useState(200);

  const handleResize = async (event, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  };
  console.log(
    containerSize.outerWidth - position.x,
    containerSize.outerHeight - position.y
  );

  return (
    <div className="mother" ref={ref}>
      <Draggable
        handle=".handle"
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
          <div className="handle"></div>
        </ResizableBox>
      </Draggable>
    </div>
  );
};

export default Album;
