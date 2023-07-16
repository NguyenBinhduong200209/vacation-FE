import Modal from "~/components/Modal/Modal";
import classNames from "classnames/bind";
import styles from "./UserList.module.scss";
import Image from "~/components/Image/Image";
const cx = classNames.bind(styles);
const UserList = ({ openUserList, setOpenUserList, title, list }) => {
  console.log(list);
  return (
    <Modal
      open={openUserList}
      setOpen={setOpenUserList}
      title={title}
      className={cx("user-list")}
    >
      <div className={cx("container")}>
        {list?.map((member) => (
          <div key={member._id} className={cx("list-item")}>
            <Image path={member?.avatar.path} alt="" />
            <div className={cx("item-name")}>{member.username}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default UserList;
