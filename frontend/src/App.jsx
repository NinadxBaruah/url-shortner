import React, { useState, useContext, useEffect } from "react";
import { Home } from "./components/Home";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import { createBrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import isLogInContext from "../src/utils/isLogInContext";
import Redirect from "./components/Redirect";
import useUser from "./utils/useUser"
const App = () => {
  const [isLogIn, setIsLogIn] = useState({
    isLogIn: false,
  });
  const user = useUser(setIsLogIn)
  return (
    <isLogInContext.Provider
      value={{ isLogIn , setIsLogIn}}
    >
      <Header />
      <Outlet />
    </isLogInContext.Provider>
  );
};
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path:"short-url/:shortUrlId",
        element:<Redirect/>
      }
    ],
  },
]);

export default App;
