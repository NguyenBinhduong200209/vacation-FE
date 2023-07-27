import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Album.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getList, resetList, deleteAlbum } from "~/store/slices/albumSlice";
import { MoreOutlined, LoadingOutlined } from "@ant-design/icons";
import { Card, List, Typography, Skeleton, Popover, Button, Image } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
const cx = classNames.bind(styles);

const Albums = () => {
	const dispatch = useDispatch();
	const {
		list,
		meta: { page, pages },
	} = useSelector((state) => state.album);


	const { info } = useSelector((state) => state.auth);

	const { userId } = useOutletContext();
	const currentUserId = userId ? userId : info._id;

	useEffect(() => {
		dispatch(resetList());
		dispatch(getList({ userId: currentUserId, page: 1 }));
	}, [dispatch, currentUserId]);



	const loadMoreData = () => {
		dispatch(getList({ userId: currentUserId, page: page + 1 }));
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
							<NavLink
								to={`/newAlbum?id=${item.vacationId}&title=${item.title}&albumId=${item._id}&userId=${currentUserId}`}
							>
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
										<NavLink
											to={`/newAlbum?id=${item.vacationId}&title=${item.title}&albumId=${item._id}&userId=${currentUserId}`}
										>
											Edit
										</NavLink>
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
