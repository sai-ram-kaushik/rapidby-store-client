import React, { useContext, useState } from "react";
import searchIcon from "/dashboardIcons/search.svg";
import notificationIcon from "/dashboardIcons/notification.svg";
import avatar from "/dashboardIcons/avatar.svg";
import { AuthContext } from "../../context/AuthContext";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import data from "../../data/sidebar.json";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { authData } = useContext(AuthContext);

  const handleChange = () => {
    setNav(!nav);
  };
  return (
    <div className="py-5 px-5 md:px-10 w-full h-[68px] bg-background">
      <div className="flex items-center justify-between w-full h-full">
        <div className="flex max-w-[290px] gap-2 bg-gray-100 p-2 rounded-xl">
          <img src={searchIcon} />
          <input
            type="search"
            className="bg-transparent outline-none"
            placeholder="Search"
          />
        </div>

        <div className="hidden md:flex items-center gap-4">
          <img src={notificationIcon} />
          <p>|</p>
          <img src={avatar} />
          {authData.accessToken ? (
            <p>{authData.storeData.username}</p>
          ) : (
            <p></p>
          )}
        </div>

        <div
          className="block md:hidden rounded-full bg-secondary p-2"
          onClick={handleChange}
        >
          {nav ? (
            <IoMdClose size={25} className="text-background" />
          ) : (
            <IoMdMenu size={25} className="text-background" />
          )}
        </div>
      </div>

      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[70%] sm:w-[60%] md:w-[45%] h-screen bg-white p-10 ease-in duration-500"
            : "fixed left-[-100%] top-0  p-10 ease-in duration-500 h-screen"
        }
      >
        <div className="w-full h-full">
          <div
            className="flex flex-col items-center justify-center w-full h-full gap-10"
            onClick={handleChange}
          >
            {data.sidebar.links.map((link, index) => {
              return (
                <div className="text-primary" key={index}>
                  <Link to={link.path}>
                    <p>{link.label}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
