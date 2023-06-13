import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import InputForm from "../InputForm/InputForm";
import { RegisterData } from "../config";

const cx = classNames.bind(styles);

const Register = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>Create A New Account</div>
      <InputForm data={RegisterData} />
      <div className={cx("direct")}>
        If you have an account, please change to <span>login</span>
      </div>
    </div>
  );
};

export default Register;
