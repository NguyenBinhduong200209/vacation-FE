import Avatar from "~/components/Avatar/Avatar";
import styles from "./Overview.module.scss";
import classNames from "classnames/bind";
import Loading from "~/components/Loading/Loading";

const cx = classNames.bind(styles);

const Overview = () => {
  let isLoading = true;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("userName-container")}>
        <div className={cx("avatar")}>
          <Avatar />
          {/* <img src="" alt="This is icon" /> */}
        </div>
        <div className={cx("userName")}>
          <div className={cx("sub-name")}>@trunghieult.223</div>
          <div className={cx("name")}>Trung Hiếu</div>
        </div>
      </div>
      <div className={cx("des-container")}>
        <div className={cx("title")}>Description</div>
        {/* <input type="text" value={""} /> */}
      </div>

      <div className={cx("btn-container")}>
        <button className={cx("btn-save")}>
          <span>Save change</span>
          {isLoading && <Loading />}
        </button>
        <button className={cx("btn-cancel")}>
          <span>Cancel</span>
          {isLoading && <Loading />}
        </button>
      </div>
    </div>
  );
};

export default Overview;
