export const LoginData = {
  title: "Login",
  data: [
    { id: "userName", label: "User's Name or Email", type: "text" },
    { id: "password", label: "Password", type: "text" },
  ],
  children: {
    data: [],
  },
};

export const RegisterData = {
  title: "Create New Account",
  data: [
    { id: "firstName", label: "First Name", type: "text" },
    { id: "lastName", label: "Last Name", type: "text" },
    { id: "userName", label: "User's Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "password", label: "Password", type: "text" },
  ],
};
