import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
import isLogInContext from "../utils/isLogInContext";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { isLogIn, setIsLogIn } = useContext(isLogInContext);
  const navigate = useNavigate(); // Hook for navigation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    if (isLogIn?.isLogIn) {
      navigate("/");
    }
  }, [isLogIn]);
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (formData.username) {
        fetch(`${import.meta.env.VITE_API_URL}/api/check-username`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: formData.username }),
          credentials: "include",
        })
          .then((res) => res.json())
          // .then((data) => console.log(data))
          .then((data) => setUsernameStatus(data.isUnique ? true : false))
          .catch((err) => console.error(err));
      }
    }, 700);

    return () => clearTimeout(debounce);
  }, [formData.username]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        navigate("/");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "An error occurred");
        // console.log("not ok",response.json())
      }
    } catch (err) {
      setErrorMessage("Network error: " + err.message);
      // console.log("catch",err)
    }
  };

  return (
    <div className="mx-auto my-8 p-4 w-full max-w-md border border-gray-300 bg-white shadow-lg rounded-lg">
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
      <RegisterForm
        formData={formData}
        handleInputChange={handleInputChange}
        usernameStatus={usernameStatus}
        setUsernameStatus={setUsernameStatus}
        onHandleSubmit={onHandleSubmit}
      />
    </div>
  );
};

export default Register;
