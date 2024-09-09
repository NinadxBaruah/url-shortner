import { useEffect, useState, useContext } from "react";
import isLogInContext from "./isLogInContext";

const useUser = (setIsLogIn) => {
  const [user, setUser] = useState(null);
  const {isLogIn} = useContext(isLogInContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/auth/check`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setIsLogIn({ isLogIn: data.isLogIn });
        } else {
          setIsLogIn({ isLogIn: false });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

};

export default useUser;
