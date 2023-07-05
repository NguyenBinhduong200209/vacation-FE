import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Fragment, useEffect } from "react";
import { createBrowserHistory } from "history";
import { publicRoutes } from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser } from "./store/slices/authSlice";

import vacationAPI from "./api/vacationAPI";
import { getManyLocations } from "./store/slices/locationSlice";

function App() {
  const history = createBrowserHistory();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isLogin) dispatch(getInfoUser());
  }, []);

  // useEffect(() => {
  //   vacationAPI.createPost({
  //     vacationId: "6486bcc25782c2081f86fe9d",
  //     locationId: "6486e2090af107d230657fa1",
  //     content:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
  //   });
  // }, []);

  // useEffect(() => {
  //   dispatch(
  //     getManyLocations({
  //       parentId: "6486cb0e4d45b8403f02a4d6",
  //       type: "level",
  //       number: "2",
  //     })
  //   );
  // }, []);
  return (
    <Router history={history}>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let childArr;

            let Layout = null;
            if (route.child !== undefined) {
              childArr = route.child;
            }
            if (route.layout) {
              Layout = route.layout;
            } else {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              >
                {childArr !== undefined &&
                  childArr.map((item, index) => {
                    const Child = item.component;
                    const ChildLayout = item.layout ? item.layout : Fragment;
                    return (
                      <Route
                        key={index}
                        path={item.path}
                        element={
                          <ChildLayout>
                            <Child />
                          </ChildLayout>
                        }
                      />
                    );
                  })}
              </Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
