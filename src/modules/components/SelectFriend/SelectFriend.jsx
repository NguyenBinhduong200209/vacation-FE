import Modal from "~/components/Modal/Modal";
import styles from "./SelectFriend.module.scss";
import classNames from "classnames/bind";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiendList } from "~/store/slices/authSlice";

import { resetResult, searchOneModel } from "~/store/slices/searchSlice";
import Image from "~/components/Image/Image";
import { useClickOutside, useDebounce } from "~/helpers/customHook";
import Loading from "~/components/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
const SelectFriend = ({ open, setOpen, memberList, setMemberList }) => {
  const dispatch = useDispatch();
  const isFirstReq = useRef(true);
  const resultRef = useRef();
  const { friendList } = useSelector((state) => state.auth);
  const { result, isLoading, pages } = useSelector((state) => state.search);
  const [inputValue, setInputValue] = useState("");
  const [openResult, setOpenResult] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedValue = useDebounce(inputValue, 500);
  //  call API get friendList and search user
  useEffect(() => {
    if (isFirstReq.current) {
      dispatch(getFiendList());
      isFirstReq.current = false;
    }

    if (debouncedValue !== "") {
      dispatch(
        searchOneModel({
          model: "user",
          value: debouncedValue,
          page: currentPage,
        })
      );
      setOpenResult(true);
    }
  }, [debouncedValue, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    dispatch(resetResult());
  }, [inputValue]);

  useClickOutside(resultRef, () => {
    setOpenResult(false);
  });

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && currentPage < pages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // handle friend selected
  const handleSelectedUser = (friend) => {
    setMemberList((prev) => [...prev, friend]);
  };

  const handleClear = (id) => {
    setMemberList((prev) => prev.filter((item) => item._id !== id));
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} setOpen={setOpen} title="Select Your Friend">
      <div className={cx("wrapper")}>
        <div className={cx("select-result")}>
          <span>Member:</span>
          <div className={cx("result-list")}>
            {memberList.map((friend) => {
              return (
                <span key={friend._id}>
                  {friend.username}
                  <FontAwesomeIcon
                    icon={faXmarkCircle}
                    className={cx("close")}
                    onClick={() => handleClear(friend._id)}
                  />
                </span>
              );
            })}
          </div>
        </div>
        <div className={cx("search-user")}>
          <input
            type="text"
            className={cx("search")}
            value={inputValue}
            placeholder="find username"
            onChange={(e) => setInputValue(e.target.value)}
            spellCheck={false}
            onClick={() => setOpenResult((prev) => !prev)}
          />
          {openResult && (
            <div
              ref={resultRef}
              className={cx("search-result")}
              onScroll={handleScroll}
            >
              {result.length === 0 && !isLoading ? (
                <div className={cx("result-empty")}>Not Found</div>
              ) : (
                result.map((item) => {
                  if (memberList.some((friend) => friend._id === item._id)) {
                    return;
                  }
                  return (
                    <div
                      className={cx("result-item")}
                      key={item._id}
                      onClick={() => handleSelectedUser(item)}
                    >
                      <div className={cx("user-info")}>
                        <Image path={item.avatar} />
                        <span>{item.username}</span>
                      </div>
                      {/* <button>Add</button> */}
                    </div>
                  );
                })
              )}
              {isLoading && <Loading className={cx("loading")} />}
            </div>
          )}
        </div>
        <div className={cx("friendlist")}>
          {" "}
          {friendList?.length === 0 ? (
            <div className={cx("empty")}>You have 0 Friend</div>
          ) : (
            friendList?.map((item) => {
              return (
                <div
                  className={cx("result-item")}
                  key={item._id}
                  onClick={() => handleSelectedUser(item)}
                >
                  <div className={cx("user-info")} key={item._id}>
                    <Image path={item.avatar} />
                    <span>{item.username}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <button onClick={handleSubmit} className={cx("submit")}>
          Save
        </button>
      </div>
    </Modal>
  );
};

export default SelectFriend;
