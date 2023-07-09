import Modal from "~/components/Modal/Modal";
import styles from "./SelectFriend.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiendList } from "~/store/slices/authSlice";

const cx = classNames.bind(styles);
const SelectFriend = ({ open, setOpen }) => {
  const { friendList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiendList());
  }, []);
  return (
    <Modal open={open} setOpen={setOpen} title="Select Your Friend">
      <div className={cx("wrapper")}>
        <div className={cx("result")}>Result</div>
        <div className={cx("friendlist")}>
          {}

          {friendList?.length === 0 ? (
            <div className={cx("empty")}>Your have 0 Friend</div>
          ) : (
            friendList?.map((item) => {
              return (
                <div className={cx("friend-item")} key={item._id}>
                  <img src="" alt="" />
                  <span>Username</span>
                  <button>Choose</button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SelectFriend;
