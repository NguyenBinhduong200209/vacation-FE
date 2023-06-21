import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./PostItem.module.scss";
import classNames from "classnames/bind";
import {
  faEllipsisVertical,
  faEye,
  faHeart,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const PostItem = () => {
  return (
    <div className={cx("wrapper")}>
      <header>
        <div className={cx("user-info")}>
          <div className={cx("avatar")}></div>
          <div className={cx("username-container")}>
            <div className={cx("fullname")}>Trung Hiếu</div>
            <div className={cx("username")}>@trunghieult.223</div>
          </div>
        </div>
        <FontAwesomeIcon icon={faEllipsisVertical} className={cx("options")} />
      </header>

      <main>
        <div className={cx("description")}>
          Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Orci varius natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Orci varius natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus.Orci varius
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </div>
        <div className={cx("img-container")}></div>
      </main>
      <footer>
        <div className={cx("react")}>
          <FontAwesomeIcon icon={faHeart} style={{ color: "#E66C6C" }} />
          <span>50k</span>
        </div>
        <div className={cx("comment")}>
          <FontAwesomeIcon icon={faMessage} />
          <span>50k</span>
        </div>
        <div className={cx("view")}>
          <FontAwesomeIcon icon={faEye} />
          <span>50k</span>
        </div>
      </footer>
    </div>
  );
};

export default PostItem;
