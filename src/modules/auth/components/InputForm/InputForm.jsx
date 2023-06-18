import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import classNames from "classnames/bind";
import styles from "./InputForm.module.scss";

import InputField from "~/components/InputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import { handleAuth } from "~/store/slices/authSlice";
import { Validate, initValues } from "../config/validateConfig";
import {
  FORGOT,
  LOGIN,
  UPDATE_PERSONAL,
  UPDATE_SECURITY,
} from "~/utils/constants";
import Loading from "~/components/Loading/Loading";

const cx = classNames.bind(styles);
const InputForm = (props) => {
  const { list, type, handleRoute, className } = props;
  const dispatch = useDispatch();
  // const { isLoading } = useSelector((state) => state.auth);

  let isLoading = true;
  // InitialValues variable
  let initialValues = initValues[type];

  // validate variable
  let validationSchema = Yup.object().shape(Validate[type]);

  // Handle Submit form
  const handleSubmit = (values) => {
    if (type === LOGIN && values.username.includes("@")) {
      let data = {
        email: values.username,
        password: values.password,
      };
      dispatch(handleAuth({ type, data }));
    }
    if (type === FORGOT) {
      dispatch(handleAuth({ type, data: values }));
      handleRoute();
    } else {
      dispatch(handleAuth({ type, data: values }));
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => handleSubmit(values)}
      >
        {(formikProps) => {
          const { values, errors, touched } = formikProps;
          console.log(values);

          return (
            <Form className={cx("form")}>
              <div
                className={cx(
                  "form-container",
                  (type === UPDATE_PERSONAL || type === UPDATE_SECURITY) &&
                    "form-update"
                )}
              >
                {list.data.map((item) => (
                  <FastField
                    key={item.id}
                    name={item.id}
                    type={item.type}
                    component={InputField}
                    label={item.label}
                    className={className}
                  />
                ))}
              </div>

              {type === UPDATE_PERSONAL || type === UPDATE_SECURITY ? (
                <div className={cx("btn-container")}>
                  <button className={cx("btn-save")}>
                    <span>Save change</span>
                    {isLoading && <Loading />}
                  </button>
                  <button className={cx("btn-cancel")}>
                    <span>Cancel</span>
                    {isLoading && <Loading />}
                  </button>
                </div>
              ) : (
                <button type="submit" className={cx("btn-submit")}>
                  <span>Submit</span>
                  {isLoading && <Loading />}
                </button>
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default InputForm;
