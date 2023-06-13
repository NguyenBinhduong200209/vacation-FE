import AuthenLayout from "~/layouts/Auth/AuthenLayout/AuthenLayout";
import Login from "~/modules/auth/Login/Login";
import Register from "~/modules/auth/Register/Register";

export const publicRoutes = [
  { path: "/login", component: Login, layout: AuthenLayout },
  { path: "/register", component: Register, layout: AuthenLayout },
];
