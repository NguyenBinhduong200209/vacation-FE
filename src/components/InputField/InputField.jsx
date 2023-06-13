import { ErrorMessage } from "formik";
import styles from "./InputField.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const InputField = (props) => {
  const { field, form, type, label, className } = props;

  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  // console.log(value);
  return (
    <div
      className={cx(
        "item",
        name === "firstName" || name === "lastName" ? "item-special" : ""
      )}
    >
      <input
        {...field}
        type={type}
        style={showError && { border: "1px solid blue" }}
        className={cx(
          className,
          name === "firstName" || name === "lastName" ? "special" : ""
        )}
      />
      <label
        htmlFor={name}
        className={cx("label", value !== "" ? "active" : "")}
      >
        {label}
      </label>
      <ErrorMessage
        name={name}
        render={(msg) => <p className={cx("error")}>{msg}</p>}
      />
    </div>
  );
};

export default InputField;
