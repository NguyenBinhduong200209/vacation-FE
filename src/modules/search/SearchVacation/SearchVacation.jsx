import styles from "./SearchVacation.module.scss";
import classNames from "classnames/bind";
import { searchOneModel } from "~/store/slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Avatar, Card, List } from "antd";
import Image from "~/components/Image/Image";

const cx = classNames.bind(styles);
const SearchVacation = () => {
  const [searchParams] = useSearchParams();
  const searchVal = searchParams.get("f");
  const dispatch = useDispatch();
  const { result } = useSelector((state) => state.search);
  const { vacations } = result;
  const currentPage = useRef(1);
  // console.log(vacations);

  useEffect(() => {
    dispatch(
      searchOneModel({
        body: { model: "vacation", value: searchVal, page: 1 },
        type: "vacations",
      })
    );
  }, [dispatch, searchVal]);

  const loadMoreData = () => {
    if (
      vacations.page < vacations.pages &&
      currentPage.current === vacations.page
    ) {
      dispatch(
        searchOneModel({
          body: {
            model: "user",
            value: searchVal,
            page: vacations.page + 1,
          },
          type: "vacations",
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
  }, [dispatch, vacations.page]);
  return (
    <>
      <div className={cx("title")}>Location</div>
      <div id="result" className={cx("result")}>
        <List
          grid={{
            gutter: 16,
            column: 3,
          }}
          dataSource={vacations.data}
          renderItem={(item) => (
            <List.Item>
              <Card className={cx("item")}>
                <div className={cx("user-info")}>
                  <Avatar src={item.authorInfo?.avatar.path} />
                  <div>{item.authorInfo?.username}</div>
                </div>
                <Image className={cx("cover")} path={item.cover?.path} />
                <div className={cx("item-name")}>
                  <span>{item.title}</span>
                </div>
              </Card>
            </List.Item>
          )}
        />
        {/* {vacations.data?.map((vacation) => {
          return (
            <div className={cx("item")}>
              <div className={cx("user-info")}>
                <Avatar src={vacation.authorInfo?.avatar.path} />
                <div>{vacation.authorInfo?.username}</div>
              </div>
              <Image className={cx("cover")} path={vacation.cover?.path} />
              <div>{vacation.title}</div>
            </div>
          );
        })} */}
      </div>
    </>
  );
};

export default SearchVacation;
