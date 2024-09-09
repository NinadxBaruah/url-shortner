import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const Redirect = () => {
  const { shortUrlId } = useParams();
  const navigate = useNavigate();
  const [showError, setShowError] = useState({
    show404: false,
    showSomethingWentWrong: false,
  });

  useEffect(() => {
    const fetchRedirectUrl = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/short-url/${shortUrlId}`
        );
        if (response.ok) {
          const data = await response.json();
          if (
            data.redirectUrl.startsWith("https://") ||
            data.redirectUrl.startsWith("http://")
          ) {
            const redirectUrl = new URL(data.redirectUrl).href;
            window.location.href = redirectUrl;
          } else {
            const redirectUrl = new URL("https://" + data.redirectUrl).href;
            window.location.href = redirectUrl;
          }
          console.log(data);
        } else if (response.status == 404) {
            setShowError({...showError,show404:true});
        }else if(response.status == 500){
            setShowError({...showError,showSomethingWentWrong:true});
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchRedirectUrl();
  }, []);
  return (
    <div>
      {showError.show404 ? (
        <h1 className="text-center text-red-600"> Url not Found!<Link className="text-blue-500" to={'/'}>Home Page</Link> </h1>
      ) : showError.showSomethingWentWrong ? (
        <h1 className="text-center text-red-600"> Something Went Wrong! <Link className="text-blue-500" to={'/'}>Home Page</Link></h1>
      ) : (
        <h1 className="text-center text-green-600">Redirecting...</h1>
      )}
    </div>
  );
};

export default Redirect;
