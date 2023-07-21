import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./UserInfo.module.scss";
import { Image, Col, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAvatar } from "~/store/slices/resourceSlice";
const cx = classNames.bind(styles);

const UserInfo = ({ info }) => {
  const dispatch = useDispatch();
  const { list, meta } = useSelector((state) => state.resource);
  const loginUserId = useSelector((state) => state.auth.info?._id);
  const otherUserId = info?._id;
  const isLoginUser = otherUserId === loginUserId;

  useEffect(() => {
    dispatch(getAvatar(Object.assign({ page: 1 }, isLoginUser ? {} : { userId: otherUserId })));
  }, [dispatch, isLoginUser, otherUserId]);

  console.log(list);

  return (
    <div className={cx("user-info")}>
      <div className={cx("user-info-header")}>
        <Image.PreviewGroup
          items={list.map((item) => item.path)}
          preview={{
            onChange: (current) => {
              list.length - current < 2 &&
                dispatch(
                  getAvatar(
                    Object.assign({ page: meta.page + 1 }, isLoginUser ? {} : { userId: otherUserId })
                  )
                );
            },
          }}
        >
          <Image
            className={cx("avatar")}
            draggable={false}
            height={140}
            width={140}
            preview={{ maskClassName: cx("avatar") }}
            src={info?.avatar?.path}
            icon={<UserOutlined />}
          />
        </Image.PreviewGroup>

        <Typography.Title level={4} className={cx("user-info-fullname")}>
          {info?.lastname} {info?.firstname}
        </Typography.Title>

        <i>
          <Typography.Text>@</Typography.Text>
          <Typography.Text copyable={true}>{info?.username}</Typography.Text>
        </i>

        <Typography.Paragraph ellipsis={{ expandable: false, rows: 2 }} className={cx("user-info-des")}>
          {info?.description}
        </Typography.Paragraph>

        <div className={cx("user-info-grid")}>
          <Row justify="space-evenly">
            <Col span={12} className={cx("cell")} id={cx("one")}>
              <NavLink to="friends">
                <Typography.Paragraph className={cx("para")}>{info?.friends}</Typography.Paragraph>
                <Typography.Paragraph className={cx("para")}>Friends</Typography.Paragraph>
              </NavLink>
            </Col>
            <Col span={12} className={cx("cell")} id={cx("two")}>
              <NavLink to="">
                <Typography.Paragraph className={cx("para")}>{info?.vacations}</Typography.Paragraph>
                <Typography.Paragraph className={cx("para")}>Vacations</Typography.Paragraph>
              </NavLink>
            </Col>
          </Row>
          <Row justify="space-evenly">
            <Col span={12} className={cx("cell")} id={cx("three")}>
              <Typography.Paragraph className={cx("para")}>{info?.posts}</Typography.Paragraph>
              <Typography.Paragraph className={cx("para")}>Posts</Typography.Paragraph>
            </Col>
            <Col span={12} className={cx("cell")} id={cx("four")}>
              <Typography.Paragraph className={cx("para")}>{info?.likesPost}</Typography.Paragraph>
              <Typography.Paragraph className={cx("para")}>Likes</Typography.Paragraph>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
