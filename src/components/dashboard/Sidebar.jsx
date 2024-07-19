import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = ({ sidebar }) => {
  const { logo, title, links, logoutTitle, logoutIcon } = sidebar;
  const navigate = useNavigate();
  const handleLogOut = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("adminData");

    toast.success("Admin has been logged out");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  return (
    <div className="hidden md:flex md:flex-col md:justify-between md:w-[220px] px-5 py-5 h-screen sticky top-0">
      <div>
        <ToastContainer />
        <div className="flex flex-col items-start gap-5">
          <div className="flex items-center gap-2">
            <img src={logo} width={24} height={21} alt="Logo" />
            <p className="text-secondary text-[24px] font-bold">{title}</p>
          </div>

          <div className="flex flex-col items-start gap-4">
            {links.map((link, index) => (
              <Link to={link.path} key={index}>
                <ul className="flex items-center gap-4 cursor-pointer">
                  <img src={link.icon} alt={link.label} />
                  <p>{link.label}</p>
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleLogOut}
        >
          <img src={logoutIcon} width={24} height={24} alt="Logout Icon" />
          <p>{logoutTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
