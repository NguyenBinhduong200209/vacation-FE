import React from "react";
import NotFound from "~/components/NotFound/NotFound";
import AuthenLayout from "~/layouts/Auth/AuthenLayout";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import Login from "~/modules/auth/Login/Login";
import Register from "~/modules/auth/Register/Register";

import {
  LOGIN_ROUTE,
  OVERVIEW_ROUTE,
  PERSONAL_ROUTE,
  REGISTER_ROUTE,
  SECURITY_ROUTE,
  SETTING_ROUTE,
  VACATION_ALBUM_ROUTE,
  VACATION_POSTS_ROUTE,
  VACATION_ROUTE,
} from "~/utils/constants";
const NewFeed = React.lazy(() => import("~/modules/newfeed/NewFeed"));
const Profile = React.lazy(() => import("~/modules/profile/Profile"));
const Vacation = React.lazy(() => import("~/modules/vacation/Vacation"));
const Posts = React.lazy(() => import("~/modules/vacation/Posts/Posts"));
const UpdateUser = React.lazy(() => import("~/modules/auth/Update/UpdateUser"));
const Album = React.lazy(() => import("~/modules/vacation/Album/Album"));
const Security = React.lazy(() =>
  import("~/modules/auth/Update/Security/Security")
);
const Personal = React.lazy(() =>
  import("~/modules/auth/Update/Personal/Personal")
);
const Overview = React.lazy(() =>
  import("~/modules/auth/Update/Overview/Overview")
);

export const publicRoutes = [
  { path: "/", component: NewFeed, layout: DefaultLayout },
  {
    path: LOGIN_ROUTE,
    component: Login,
    layout: AuthenLayout,
  },
  { path: REGISTER_ROUTE, component: Register, layout: AuthenLayout },
  {
    path: SETTING_ROUTE,
    component: UpdateUser,
    layout: DefaultLayout,
    child: [
      {
        path: "",
        component: Overview,
      },
      {
        path: OVERVIEW_ROUTE,
        component: Overview,
      },
      {
        path: PERSONAL_ROUTE,
        component: Personal,
      },
      {
        path: SECURITY_ROUTE,
        component: Security,
      },
    ],
  },

  { path: "/profile", component: Profile, layout: DefaultLayout },

  {
    path: VACATION_POSTS_ROUTE,
    component: Posts,
    layout: Vacation,
  },
  {
    path: VACATION_ALBUM_ROUTE,
    component: Album,
    layout: Vacation,
  },

  { path: "*", component: NotFound },
];
