import React, { useContext, useState } from "react";
import searchIcon from "/dashboardIcons/search.svg";
import notificationIcon from "/dashboardIcons/notification.svg";
import { AuthContext } from "../../context/AuthContext";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import data from "../../data/sidebar.json";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = () => {
    setNav(!nav);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    toast.success("Store Admin has been logged out");

    setTimeout(() => {
      navigate("/");
    }, 2000);

    console.log("Logging out...");
  };

  return (
    <div className="py-5 px-5 md:px-10 w-full h-[68px] bg-background">
      <ToastContainer />
      <div className="flex items-center justify-between w-full h-full">
        {/* Search bar */}
        <div className="flex max-w-[290px] gap-2 bg-gray-100 p-2 rounded-xl">
          <img src={searchIcon} />
          <input
            type="search"
            className="bg-transparent outline-none"
            placeholder="Search"
          />
        </div>

        {/* Right-side items */}
        <div className="hidden md:flex items-center gap-4 relative">
          <img src={notificationIcon} />
          <p>|</p>

          {/* Profile Image & Dropdown */}
          <div className="relative">
            <img
              src={authData.storeData.imageUrl}
              width={50}
              height={50}
              className="rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <Link
                  to="/store-admin/dashboard/store-settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={toggleDropdown}
                >
                  Account Settings
                </Link>
                <Link
                  to="/change-password"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={toggleDropdown}
                >
                  Change Password
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {authData.accessToken ? (
            <p>{authData.storeData.username}</p>
          ) : (
            <p></p>
          )}
        </div>

        {/* Mobile menu icon */}
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

      {/* Mobile Sidebar */}
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
