import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Album.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getList, resetList, deleteAlbum } from "~/store/slices/albumSlice";
import { MoreOutlined } from "@ant-design/icons";
import { Card, List, Typography, Skeleton, Popover, Button, Image } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink, useOutletContext, useParams } from "react-router-dom";
import images from "~/images";
const cx = classNames.bind(styles);

const Albums = () => {
  const dispatch = useDispatch();
  const {
    list,
    meta: { page, pages },
  } = useSelector((state) => state.album);
  const { userId } = useOutletContext();
  const { id } = useParams();

  useEffect(() => {
    dispatch(resetList());
    dispatch(getList({ userId, page: 1 }));
  }, [dispatch, userId]);

  const loadMoreData = () => dispatch(getList({ userId, page: page + 1 }));

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
          renderItem={(item) => {
            const { _id, title, vacationId, cover } = item;
            return (
              <List.Item className={cx("album-item")}>
                <NavLink
                  to={id ? `/album/${_id}` : `/album/new?id=${vacationId}&title=${title}&albumId=${_id}`}
                >
                  <Card
                    bordered={false}
                    className={cx("album-card")}
                    hoverable={true}
                    cover={
                      <Image
                        className={cx("album-img")}
                        preview={false}
                        src={cover}
                        fallback={images.noImage}
                      />
                    }
                  >
                    <Typography.Paragraph
                      className={cx("album-title")}
                      ellipsis={{ expandable: false, rows: 1 }}
                    >
                      {title}
                    </Typography.Paragraph>
                  </Card>
                </NavLink>
                {!userId && (
                  <Popover
                    className={cx("pop-over")}
                    arrow
                    placement="bottomRight"
                    trigger={"click"}
                    color="#282828"
                    content={
                      <div className={cx("pop-content")}>
                        <NavLink to={`/newAlbum?id=${vacationId}&title=${title}&albumId=${_id}`}>
                          Edit
                        </NavLink>
                        <Button onClick={() => handleDelete(_id)}>Delete</Button>
                      </div>
                    }
                  >
                    <MoreOutlined className={cx("more")} />
                  </Popover>
                )}
              </List.Item>
            );
          }}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Albums;
