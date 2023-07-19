import styles from "./SearchAlbum.module.scss";
import classNames from "classnames/bind";
import { searchOneModel } from "~/store/slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";

const cx = classNames.bind(styles);

const SearchAlbum = () => {
  const [searchParams] = useSearchParams();
  const searchVal = searchParams.get("f");
  const dispatch = useDispatch();
  const { result } = useSelector((state) => state.search);
  const { albums } = result;
  const currentPage = useRef(1);
  console.log(albums);

  useEffect(() => {
    dispatch(
      searchOneModel({
        body: { model: "album", value: searchVal, page: 1 },
        type: "albums",
      })
    );
  }, [dispatch, searchVal]);

  const loadMoreData = () => {
    if (albums.page < albums.pages && currentPage.current === albums.page) {
      dispatch(
        searchOneModel({
          body: {
            model: "user",
            value: searchVal,
            page: albums.page + 1,
          },
          type: "albums",
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
  }, [dispatch, albums.page]);
  return <div>SearchAlbum</div>;
};

export default SearchAlbum;
