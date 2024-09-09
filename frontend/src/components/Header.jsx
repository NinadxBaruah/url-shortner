import React, { useEffect, useState, useContext } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import useWindowSize from "../utils/useWindowSize";
import { Link, useLocation } from "react-router-dom";
import isLogInContext from "../utils/isLogInContext";
const Header = () => {
  const [isShow, setIsShow] = useState(false);
  const { width } = useWindowSize();
  const location = useLocation();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLogIn, setIsLogIn } = useContext(isLogInContext);
  useEffect(() => {
    setIsShow(false);
  }, [location]);
  useEffect(() => {
    // setIsLogIn({ isLogIn: document.cookie.includes("userId") });
  }, [location]);

  return (
    <header className="border-b pb-3 z-300 h-[7vh]">
      <nav className="flex justify-between m-3">
        <div>
          <Link>
            <span className="text-lg mt-2">Short.me</span>
          </Link>
        </div>
        {width < 640 ? (
          <>
            <div
              className={`
              absolute left-1/2 transform -translate-x-1/2 text-center 
              w-full bg-green-500 top-[7vh] ${
                isShow ? "opacity-100" : "opacity-0"
              }
              transition-opacity duration-500 ease-in-out
            `}
            >
              <ul className={`sm:flex sm:gap-5 cursor-pointer`}>
                <li>About</li>
                <li>Contact</li>
                {isLogIn.isLogIn ? "" : <Link to={"/login"}>SignIn</Link>}
              </ul>
            </div>
          </>
        ) : (
          <div>
            <ul className="flex gap-5 cursor-pointer">
              <li>About</li>
              <li>Contact</li>
              {isLogIn.isLogIn ? "" : <Link to={"/login"}>SignIn</Link>}
            </ul>
          </div>
        )}

        <div className="sm:hidden">
          {isShow.isLogIn ? (
            <RxCross1
              className="cursor-pointer"
              onClick={() => (isShow ? setIsShow(false) : setIsShow(true))}
            />
          ) : (
            <IoMenu
              className="cursor-pointer"
              onClick={() => (isShow ? setIsShow(false) : setIsShow(true))}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
