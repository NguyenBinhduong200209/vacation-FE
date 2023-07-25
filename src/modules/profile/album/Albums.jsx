import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Album.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getList, resetList, deleteAlbum } from "~/store/slices/albumSlice";
import { MoreOutlined, LoadingOutlined } from "@ant-design/icons";
import { Card, List, Typography, Skeleton, Popover, Button, Image } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink, useOutletContext } from "react-router-dom";
const cx = classNames.bind(styles);

const Albums = () => {
  const dispatch = useDispatch();
  const {
    list,
    meta: { page, pages },
  } = useSelector((state) => state.album);

  const { userId } = useOutletContext();

  useEffect(() => {
    dispatch(resetList());
    dispatch(getList({ userId, page: 1 }));
  }, [dispatch, userId]);

  const loadMoreData = () => {
    dispatch(getList({ userId, page: page + 1 }));
  };

  const handleDelete = (id) => {
    dispatch(deleteAlbum({ id }));
  };

  return (
    <div className={cx("albums")}>
      <InfiniteScroll
        dataLength={list.length}
        next={loadMoreData}
        hasMore={page < pages}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
      >
        <List
          className={cx("album-grid")}
          grid={{ gutter: 35, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }}
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item className={cx("album-item")}>
              <NavLink to={`/`}>
                <Card
                  bordered={false}
                  className={cx("album-card")}
                  hoverable={true}
                  cover={
                    <Image
                      className={cx("album-img")}
                      preview={false}
                      src={`https://picsum.photos/900/600?random=${index}`}
                      placeholder={<LoadingOutlined />}
                      alt=""
                    />
                  }
                >
                  <Typography.Paragraph
                    className={cx("album-title")}
                    ellipsis={{ expandable: false, rows: 1 }}
                  >
                    {item.title}
                  </Typography.Paragraph>
                </Card>
              </NavLink>
              <Popover
                className={cx("pop-over")}
                arrow
                placement="bottomRight"
                trigger={"click"}
                color="#282828"
                content={
                  <div className={cx("pop-content")}>
                    <Button>Edit</Button>
                    <Button onClick={() => handleDelete(item._id)}>Delete</Button>
                  </div>
                }
              >
                <MoreOutlined className={cx("more")} />
              </Popover>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Albums;
