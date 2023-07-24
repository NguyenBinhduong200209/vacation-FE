import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Album.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getList, resetList } from "~/store/slices/albumSlice";
import { MoreOutlined } from "@ant-design/icons";
import { Card, List, Typography, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink, useOutletContext } from "react-router-dom";
import axiosClient from "~/api/axiosClient";
const cx = classNames.bind(styles);

const Albums = () => {
  const dispatch = useDispatch();
  const {
    list,
    meta: { page, pages },
  } = useSelector((state) => state.album);

  console.log(list);
  
  const { userId } = useOutletContext();

  useEffect(() => {
    dispatch(resetList());
    dispatch(getList({ userId, page: 1 }));
  }, [dispatch, userId]);

  const loadMoreData = () => {
    dispatch(getList({ userId, page: page + 1 }));
  };

  const takeAlbum = async(e) => {
    e.preventDefault();
    try {
      const data = {
        
      }
      const res = axiosClient.put('https://vacation-social-network.onrender.com/albumpage/', data)
    } catch (error) {
      
    }
  }

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
          grid={{ gutter: 30, column: 3 }}
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item className={cx("album-item")}>
              <NavLink to={`/`}>
                <Card
                  bordered={false}
                  className={cx("album-card")}
                  hoverable={true}
                  cover={
                    <img
                      className={cx("album-img")}
                      src={`https://picsum.photos/900/600?random=${index}`}
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
              <MoreOutlined className={cx("more")} />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Albums;
