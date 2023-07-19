import { useEffect } from "react";
import styles from "./SearchLocation.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { searchOneModel } from "~/store/slices/searchSlice";

import Loading from "~/components/Loading/Loading";
import EmptyRes from "../Empty/EmptyRes";

const cx = classNames.bind(styles);

const SearchLocation = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchVal = searchParams.get("f");
  const { result, isLoading } = useSelector((state) => state.search);
  const { locations } = result;
  console.log(locations);
  useEffect(() => {
    dispatch(
      searchOneModel({
        body: { model: "location", value: searchVal, page: 1 },
        type: "locations",
      })
    );
  }, [dispatch, searchVal]);

  return (
    <>
      <div className={cx("title")}>Location</div>
      <div id="result" className={cx("result")}>
        {locations.data?.map((item) => {
          return (
            <div className={cx("item")} key={item._id}>
              <span className={cx("detail")}> {item.title}</span>
              <div className={cx("des")}>
                {`${item.district} - ${item.city}`}
              </div>
            </div>
          );
        })}
      </div>
      {locations.data?.length === 0 && !isLoading && <EmptyRes />}
      {isLoading && <Loading className="searching" />}
    </>
  );
};

export default SearchLocation;
