import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import { createBrowserHistory } from "history";
import { publicRoutes } from "./routes";

function App() {
  const history = createBrowserHistory();

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
                    return (
                      <Route key={index} path={item.path} element={<Child />} />
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
