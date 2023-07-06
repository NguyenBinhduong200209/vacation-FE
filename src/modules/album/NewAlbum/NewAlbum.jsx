import { useSearchParams } from "react-router-dom";
import styles from "./NewAlbum.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const NewAlbum = () => {
  const [searchParam] = useSearchParams();

  const title = searchParam.get("title");
  const vacationId = searchParam.get("id");
  console.log(title);
  console.log(vacationId);

  return <div className={cx("wrapper")}>NewAlbum</div>;
};

export default NewAlbum;
