import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import InputForm from "../InputForm/InputForm";
import { LoginData } from "../config";
import facebookImg from "~/images/facebook.png";
import googleImg from "~/images/google.png";
import twitterImg from "~/images/twitter.png";

const cx = classNames.bind(styles);
const Login = () => {
  return (
    <div>
      <div className={cx("title")}>Login</div>
      <InputForm data={LoginData} type="login" />

      <div className={cx("other-methods")}>
        <div>or sign in with</div>
        <div className={cx("login-icon")}>
          <img src={facebookImg} alt="This is Facebook" />
          <img src={googleImg} alt="This is Google" />
          <img src={twitterImg} alt="This is Twitter" />
        </div>
      </div>

      <div className={cx("direct")}>
        If you don't have an account, please change to <span>register</span>
      </div>
    </div>
  );
};

export default Login;
