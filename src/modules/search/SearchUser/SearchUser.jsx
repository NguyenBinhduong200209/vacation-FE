import { Link, useSearchParams } from "react-router-dom";
import styles from "./SearchUser.module.scss";
import classNames from "classnames/bind";
import { searchOneModel } from "~/store/slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "antd";

import { useEffect, useRef } from "react";
import Loading from "~/components/Loading/Loading";

import EmptyRes from "../Empty/EmptyRes";

const cx = classNames.bind(styles);

const SearchUser = () => {
  const [searchParams] = useSearchParams();
  const searchVal = searchParams.get("f");
  const dispatch = useDispatch();
  const { result } = useSelector((state) => state.search);
  const { users } = result;
  const { isLoading } = users;
  const currentPage = useRef(1);

  // console.log(users, isLoading);

  useEffect(() => {
    dispatch(
      searchOneModel({
        body: { model: "user", value: searchVal, page: 1 },
        type: "users",
      })
    );
  }, [dispatch, searchVal]);

  const loadMoreData = () => {
    if (users.page < users.pages && currentPage.current === users.page) {
      dispatch(
        searchOneModel({
          body: {
            model: "user",
            value: searchVal,
            page: users.page + 1,
          },
          type: "users",
        })
      );
      currentPage.current += 1;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        loadMoreData();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, users.page]);
  return (
    <>
      <div className={cx("title")}>People</div>
      <div id="result" className={cx("result")}>
        {users.data?.map((item) => {
          return (
            <Link
              className={cx("item")}
              key={item._id}
              to={`/profile?id=${item._id}`}
            >
              <Avatar size={64} src={item.avatar} />
              <div className={cx("user-info")}>
                <div className={cx("username")} style={{ color: "white" }}>
                  {item.username}
                </div>
                <div className={cx("fullname")} style={{ color: "white" }}>
                  {`${item.firstname} ${item.lastname}`}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {isLoading && <Loading className="searching" />}
      {!isLoading && users.data?.length === 0 && <EmptyRes />}
    </>
  );
};

export default SearchUser;
