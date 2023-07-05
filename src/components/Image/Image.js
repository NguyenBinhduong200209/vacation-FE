import { useState, forwardRef } from "react";
import images from "~/images";
import classNames from "classnames/bind";
import styles from "./Image.module.scss";

const cx = classNames.bind(styles);
const Image = forwardRef(
  (
    {
      src,
      alt,
      path,
      className,
      fallback: customFallback = images.noImage,
      ...props
    },
    ref
  ) => {
    const [fallback, setFallback] = useState("");

    const handleError = () => {
      setFallback(customFallback);
    };

    return (
      <img
        className={cx(className, "image")}
        ref={ref}
        src={fallback || path}
        alt={alt}
        {...props}
        onError={handleError}
      />
    );
  }
);

export default Image;
