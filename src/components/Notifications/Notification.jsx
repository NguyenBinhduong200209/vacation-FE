import { message } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FORGOT, RESET } from "~/utils/constants";
const Notification = (props) => {
  const { status, messageResult, isLoading } = useSelector(
    (state) => state.auth
  );
  const { url, type, handleRoute } = props;
  console.log(messageResult);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const success = () => {
      messageApi.open({
        type: "success",
        content: messageResult,
      });
    };

    const error = () => {
      messageApi.open({
        type: "error",
        content: messageResult,
      });
    };

    if (status && status.toString().startsWith("2") && messageResult) {
      success();
    } else if (messageResult) {
      error();
    }
    const timer = setTimeout(() => {
      if (
        status &&
        status.toString().startsWith("2") &&
        type !== FORGOT &&
        type !== RESET
      ) {
        navigate(url);
        window.location.reload();
      } else if (
        type === FORGOT &&
        status &&
        status.toString().startsWith("2")
      ) {
        handleRoute();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return <>{contextHolder}</>;
};

export default Notification;
