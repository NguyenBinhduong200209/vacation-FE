import * as Yup from "yup";
import { validateSpace } from "~/helpers/function";
import { STRONG_PASSWORD } from "~/utils/constants";

export const Validate = {
  login: {
    username: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  },

  register: {
    firstname: Yup.string()
      .test((value, ctx) => validateSpace(value, ctx))
      .required("This field is required"),
    lastname: Yup.string()
      .test((value, ctx) => validateSpace(value, ctx))
      .required("This field is required"),
    username: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Please enter the correct email")
      .required("This field is required"),
    password: Yup.string()
      .matches(
        STRONG_PASSWORD,
        "Please must be 8 - 16 characters, includes uppercase letter, lowercase letter, number and special character"
      )
      .required("This field is required"),
  },
  forgotPassword: {
    email: Yup.string()
      .email("Please enter the correct email")
      .required("This field is required"),
  },

  resetPassword: {
    passwordToken: Yup.string().required("This field is required"),
    newPassword: Yup.string()
      .matches(
        STRONG_PASSWORD,
        "Please must be 8 - 16 characters, includes uppercase letter, lowercase letter, number and special character"
      )
      .required("This field is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Password not match")
      .required("This field is required"),
  },

  updatePersonal: {
    firstname: Yup.string().required("This field is required"),
    lastname: Yup.string().required("This field is required"),
    dateOfBirth: Yup.string().required("This field is required"),
    phoneNumber: Yup.string().required("This field is required"),
    gender: Yup.string().required("This field is required"),
    nationality: Yup.string().required("This field is required"),
  },
  updateSecurity: {
    password: Yup.string().required("This field is required"),
    newPassword: Yup.string().required("This field is required"),
    confirmPassword: Yup.string().required("This field is required"),
  },
};

export const initValues = {
  login: {
    username: "",
    password: "",
  },
  register: {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  },

  forgotPassword: {
    email: "",
  },

  resetPassword: {
    passwordToken: "",
    newPassword: "",
    confirmPassword: "",
  },

  updatePersonal: {
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "",
    nationality: "",
  },
  updateSecurity: {
    password: "",
    newPassword: "",
    confirmPassword: "",
  },
};
