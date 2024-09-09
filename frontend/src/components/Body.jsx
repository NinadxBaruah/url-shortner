import React, { useState, useContext, useEffect } from "react";
import AllLinks from "./AllLinks";
import isLogInContext from "../utils/isLogInContext";
import { Link } from "react-router-dom";
const Body = () => {
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState({isShow:false,isShowValue:'',color:''});
  const [newShrotUrl, setNewShortUrl] = useState({
    shortUrl: "",
    showShortUrl: false,
  });
  const isLogIn = useContext(isLogInContext);
  const handleClick = async () => {
    const domainPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

    if (!domainPattern.test(domain)) {
      setError("Please enter a valid domain (e.g., www.example.com)");
    } else {
      setError("");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/short-url/submit`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ domain: domain }),
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setShowMessage({isShow:true,isShowValue:"Url created",color:"green"});
          setTimeout(() => {
            setShowMessage({isShow:false,isShowValue:""})
          }, 2500);
          setNewShortUrl({ shortUrl: data.urlString, showShortUrl: true });
        }
        if(response.status == 401){
          setShowMessage({isShow:true,isShowValue:"You Need to Log In!",color:"red"});
          setTimeout(() => {
            setShowMessage({isShow:false,isShowValue:""})
          }, 2500);
        }
        // const data = await response.json()
        // console.log(data)
      } catch (err) {
        console.log("err: ", err);
      }

      // console.log("Domain submitted:", domain);
      // Clear the input field if needed
      setDomain("");
    }
  };
  const handleCopy = () => {
    const valueToCopy = newShrotUrl.shortUrl;
    const textArea = document.createElement("textarea");
    textArea.value = `${window.location.href}` + "short-url/" + valueToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
    document.body.removeChild(textArea);
  };
  useEffect(() => {
    // console.log('New Short URL state:', newShrotUrl);
  }, [newShrotUrl]);
  return (
    <div className="min-h-[70vh]">
      <div className="flex justify-center items-center">
        <h1
          className="mt-[3vh] bg-clip-text text-white flex justify-center items-center max-w-md w-[100%] rounded-sm"
          style={{
            background: "linear-gradient(to right, #f59e0b, #3b82f6, #8b5cf6)",
          }}
        >
          URL SHORTNER
        </h1>
      </div>

      {showMessage.isShow && (
        <div className={`absolute flex justify-center left-1/2 -translate-x-1/2 top-[17vh] text-${showMessage.color}-500`}>
          <p>{showMessage.isShowValue}</p>
        </div>
      )}
      <div className="flex flex-col max-w-md mx-auto mt-[3vh] items-center border border-gray-300 h-[30vh] rounded-lg">
        <input
          className="border w-[80%] p-3 border-gray-300 rounded-xl mt-10"
          type="text"
          placeholder="www.example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          required
          // onKeyDown={handleClick}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          onClick={handleClick}
          className="mt-7 w-32 bg-yellow-500 p-3 rounded-lg hover:bg-yellow-600 hover:text-white transition-colors"
        >
          Shorten URL
        </button>
      </div>
      {newShrotUrl.showShortUrl && (
        <div className="flex justify-center items-center mt-3 space-x-2">
          <span
            onClick={() =>
              window.open(
                window.location.href + "short-url/" + newShrotUrl.shortUrl,
                "_blank"
              )
            }
            className="text-xs text-gray-700 truncate max-w-xs cursor-pointer"
          >
            {import.meta.env.VITE_API_URL}/short-url/{newShrotUrl.shortUrl}
          </span>
          <button
            onClick={handleCopy}
            className="bg-green-500 text-white rounded-lg text-xs px-2 py-1 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Copy
          </button>
        </div>
      )}

      {isLogIn.isLogIn.isLogIn ? (
        <div className="flex justify-center max-w-md mx-auto mt-8">
          <AllLinks key={newShrotUrl.shortUrl || "default"}/>
        </div>
      ) : 
      <div className="flex justify-center mt-3"><span>You Need to<Link to={'login'} className="text-blue-600 underline ml-2">LogIn</Link></span></div>
      }
    </div>
  );
};

export default Body;
