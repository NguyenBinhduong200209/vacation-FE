import { Modal } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FORGOT, RESET } from "~/utils/constants";

const success = (title, message, handleSucces) => {
  Modal.success({
    title: title,
    content: message,
    afterClose: () => handleSucces(),
  });
};

const error = (title, message) => {
  Modal.error({
    title: title,
    content: message,
  });
};
const Notification = (props) => {
  const { status, messageResult } = useSelector((state) => state.auth);
  const { url, type, handleRoute } = props;
  const navigate = useNavigate();

  useEffect(() => {
    function handleSucces() {
      switch (type) {
        case FORGOT:
          handleRoute();
          break;
        case RESET:
          window.location.reload();
          break;
        default:
          navigate(url);
          window.location.reload();
          break;
      }
    }

    if (status && messageResult) {
      if (status.toString().startsWith("2")) {
        success("success",messageResult, handleSucces);
      } else {
        error("error", messageResult);
      }
    }
  }, []);

  return <></>;
};

export default Notification;
