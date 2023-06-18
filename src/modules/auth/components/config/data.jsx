export const LoginData = {
  title: "login",
  data: [
    { id: "username", label: "User's Name or Email", type: "text" },
    { id: "password", label: "Password", type: "text" },
  ],
  children: {
    data: [{ id: "email", label: "Email", type: "text" }],
    children: {
      data: [
        { id: "passwordToken", label: "Your Secret Code", type: "text" },
        { id: "newPassword", label: "Enter Your New Password", type: "text" },
        {
          id: "confirmPassword",
          label: "Enter Your Password Again",
          type: "text",
        },
      ],
    },
  },
};

export const RegisterData = {
  data: [
    { id: "firstname", label: "First Name", type: "text" },
    { id: "lastname", label: "Last Name", type: "text" },
    { id: "username", label: "User's Name", type: "text" },
    { id: "email", label: "Email", type: "text" },
    { id: "password", label: "Password", type: "text" },
  ],
};

export const UpdateUserData = {
  personal: {
    data: [
      { id: "firstname", label: "First Name", type: "text" },
      { id: "lastname", label: "Last Name", type: "text" },
      { id: "dateOfBirth", label: "Date of birth", type: "date" },
      { id: "phoneNumber", label: "Phone Number", type: "text" },
      { id: "gender", label: "Gender", type: "text" },
      { id: "nationality", label: "Nationality", type: "text" },
    ],
  },
  security: {
    data: [
      { id: "password", label: "Your Current Password", type: "text" },
      { id: "newPassword", label: "Your New Password", type: "text" },
      {
        id: "confirmPassword",
        label: "Enter Your Password Again",
        type: "text",
      },
    ],
  },
};
