import React, { useState, Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import AuthContext from "./context/authContext";
import { routes } from "./routes/routes";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Alert from "./components/Alert/AlertComponent";
import './App.css';

import Manager from "./components/Manager/Manager";
import Worker from "./components/Worker/Worker"
function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, updateErrorMessage] = useState(null);
  const role = "MANAGER";
  // const [userDetails, setUserDetails] = useState({
  //   "id": "5f785b4dc5c3370cc0d61670",
  //   "name": "krishna",
  //   "role": "MANAGER"
  // })



  useEffect(() => {
    let token = localStorage.getItem("__token");
    if (token !== undefined && token !== null) {
      if (String(token).length > 0) {
        setIsAuthenticated(true);
      }
    }
  }, [props])
  const PrivateRoute = (props) => (
    <Fragment>
      { isAuthenticated ? props.children : <Redirect to={routes.login} />}
    </Fragment>
  )
  return (
    <div className="App">
      <AuthContext.Provider value={{}}>
        <Router>
          <div className="container d-flex align-items-center flex-column">
            <Switch>
              <Route path={routes.login}> <Login showError={updateErrorMessage} /></Route>
              <Route path={routes.registration}> <Registration showError={updateErrorMessage} /></Route>
              <Route
                exact
                path="/dashboard"
                render={(props) =>
                  isAuthenticated ? (
                    <PrivateRoute>
                      <Route path={routes.dashboard} render={() =>
                        role === "MANAGER" ? (<Manager />) : (<Worker />)
                      }> </Route>

                    </PrivateRoute>
                  ) : (
                      <Redirect to="/login" />
                    )
                }
              />
              <Route

                path="/dashboard"
                render={(props) =>
                  isAuthenticated ? (
                    <PrivateRoute>
                      <Route path={routes.dashboard} render={() =>
                        role === "MANAGER" ? (<Manager />) : (<Worker />)
                      }> </Route>

                    </PrivateRoute>
                  ) : (
                      <Redirect to="/login" />
                    )
                }
              />
              <Route
                path="/manageerDashboard"
                component={Manager}
              />
              <Route
                path="/workerDashboard"
                component={Worker}
              />
              <Route
                path="*"
                component={NotFound}
              />
            </Switch>
            <Alert errorMessage={errorMessage} hideError={updateErrorMessage} />
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}




// const Dashboard = () => {
//   return (
//     <>
//       <h4>THis is DashBoard Page</h4>
//     </>
//   )
// }

// const Users = () => {
//   return (
//     <>
//       <p>
//         Hi this is starting point
//       </p>
//     </>
//   )
// }



const NotFound = () => {
  return (
    <>
      <p>
        Page Not Found
      </p>
    </>
  )
}


export default App;
