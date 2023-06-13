import { FastField, Form, Formik } from "formik";
import InputField from "~/components/InputField/InputField";
import * as Yup from "yup";
import styles from "./InputForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const InputForm = (props) => {
  const { data, type } = props;

  const initialValues = {
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const validationSchemaLogin = Yup.object().shape({
    userName: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const validationSchemaRegister = Yup.object().shape({
    userName: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Please enter the correct email")
      .required("This field is required"),
  });
  const handleSubmit = (values) => {
    console.log("Submit");
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={
          type === "login" ? validationSchemaLogin : validationSchemaRegister
        }
        onSubmit={(values) => handleSubmit(values)}
      >
        {(formikProps) => {
          const { values, errors, touched } = formikProps;
          console.log(errors);

          return (
            <Form className={cx("form")}>
              {data.data.map((item) => (
                <FastField
                  key={item.id}
                  name={item.id}
                  type={item.type}
                  component={InputField}
                  label={item.label}
                  className="input-authen"
                />
              ))}
              {type === "login" && (
                <div className={cx("sub-ft")}>
                  <div className={cx("checkbox")}>
                    <input type="checkbox" id="squaredcheck" />
                    <label htmlFor="squaredcheck">Remember me</label>
                  </div>
                  <div className={cx("re-pass")}>Forgot password</div>
                </div>
              )}
              <button type="submit" className={cx("btn")}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default InputForm;
