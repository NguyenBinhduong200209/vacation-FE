import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Dropdown.module.scss";
import classNames from "classnames/bind";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import vacationAPI from "~/api/vacationAPI";

const cx = classNames.bind(styles);

const Dropdown = ({ selected, setSelected, setVacationId }) => {
  const [open, setOpen] = useState(false);
  const [options, setOption] = useState([]);
  let totalPage = useRef(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && currentPage < totalPage.current) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await vacationAPI.getListVacation({
          type: "userProfile",
          page: currentPage,
        });
        // console.log(res);
        if (res.data !== "") {
          setOption((prev) => [...prev, ...res.data.data]);
        }
        if (totalPage.current === 0) totalPage.current = res.data.meta.pages;
      };

      fetch();
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);

  return (
    <div className={cx("wrapper")}>
      <div
        className={cx("dropdown-btn")}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{selected}</span>
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      {open && (
        <div className={cx("dropdown-content")} onScroll={handleScroll}>
          {options.map((option) => {
            return (
              <div
                className={cx("dropdown-item")}
                key={option._id}
                onClick={() => {
                  setSelected(option.title);
                  setOpen((prev) => !prev);
                  setVacationId(option._id);
                }}
              >
                {option.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
