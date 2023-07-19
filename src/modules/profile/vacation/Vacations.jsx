import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Vacation.module.scss";
import { HeartFilled, CommentOutlined, EyeOutlined } from "@ant-design/icons";
import { getListVacation, resetList } from "~/store/slices/vacationSlice";
import { Card, List, Typography, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const cx = classNames.bind(styles);

const Vacations = () => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  const dispatch = useDispatch();
  const { list, page, pages } = useSelector((state) => state.vacation.listVacation);

  useEffect(() => {
    dispatch(resetList());
    dispatch(getListVacation({ type: "userProfile", page: 1 }));
  }, [dispatch]);

  const loadMoreData = () => {
    dispatch(getListVacation({ type: "userProfile", page: page + 1 }));
  };

  return (
    <div className={cx("feed-container")}>
      <InfiniteScroll
        dataLength={list.length}
        next={loadMoreData}
        hasMore={page < pages}
        loader={<Skeleton paragraph={{ rows: 1 }} active />}
      >
        <List
          className={cx("feed")}
          grid={{ gutter: 35, column: 3 }}
          dataSource={list}
          renderItem={(item) => (
            <List.Item className={cx("feed-item")}>
              <NavLink to={`/vacation?vacationID=${item._id}`}>
                <Card
                  bordered={false}
                  className={cx("feed-card")}
                  hoverable={true}
                  cover={<img className={cx("feed-cover")} src={item?.cover?.path} alt="" />}
                >
                  <Typography.Paragraph
                    className={cx("feed-title")}
                    ellipsis={{ expandable: false, rows: 1 }}
                  >
                    {item.title}
                  </Typography.Paragraph>
                  <div className={cx("feed-cover-rad")}></div>
                  <div className={cx("feed-info")}>
                    <div className={cx("views")}>
                      <EyeOutlined />
                      {formatter.format(item.views)}
                    </div>
                    <div className={cx("likes")}>
                      <HeartFilled />
                      {formatter.format(item.likes)}
                    </div>
                    <div className={cx("cmts")}>
                      <CommentOutlined />
                      {formatter.format(item.comments)}
                    </div>
                  </div>
                </Card>
              </NavLink>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Vacations;
