import React, { useEffect, useState } from "react";
import { FiLink } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

const AllLinks = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/get-links`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setLinks(data.message);
        }else{
          console.log("something went wrong!")
        }
      } catch (error) {
        console.log("Failed to fetch links: ", error);
      }
    }
    fetchLinks();
    return () => {
      console.log("AllLinks unmounted");
    };
  }, []);

  const handleDeleteLink = async(uniqueUrl) =>{
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/short-url/delete/${uniqueUrl}`,{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        credentials:'include'
      })
      if(response.ok){
        const data = await response.json()
        setLinks((prevLinks) => prevLinks.filter(item => item.shortUrl !== data.url));
        // console.log("done",data)
      }else{
        console.log("something went wrong!")
      }
    } catch (error) {
      const data = await response.json()
      console.log(data)
    }
  } 

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-4 p-4">
      <div className="flex justify-between items-center font-semibold text-sm text-gray-700 border-b border-gray-300 pb-2 mb-2">
        <span className="bg-blue-500 text-white w-1/6 py-1 text-center rounded">No</span>
        <span className="bg-gray-100 text-gray-800 w-4/6 py-1 text-center rounded">URLs</span>
        <span className="bg-purple-500 text-white w-1/6 py-1 text-center rounded">Clicks</span>
      </div>
      {links.length > 0 ? (
        links.map((item, index) => (
          <div
            key={item.shortUrl} // Use a unique identifier for key
            className="flex justify-between items-center text-sm border-b border-gray-200 py-2"
          >
            <span className="bg-blue-500 text-white w-1/6 text-center py-1 rounded">
              {index + 1}
            </span>
            <span className="bg-gray-100 text-gray-800 w-4/6 flex items-center justify-between py-1 rounded">
              <a
                href={`${window.location.href}short-url/${item.shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate"
              >
                {item.domain}
              </a>
              <FiLink className="text-gray-500 ml-2" />
            </span>
            <span className="bg-purple-500 text-white w-1/6 text-center py-1 rounded">
              {item.clicks}
            </span>
            <MdDeleteForever onClick={() =>handleDeleteLink(item.shortUrl)} className="text-red-500 cursor-pointer text-lg ml-2" />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No links available</p>
      )}
    </div>
  );
};

export default AllLinks;
