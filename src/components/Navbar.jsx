import React, { useContext, useState, useEffect, useRef } from "react";
import Button from "../utils/Button";
import { MdOutlineMenu } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ navbar }) => {
  const { title, followButton, socials, buttonTitle } = navbar;
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = () => {
    setNav(!nav);
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");

    // Trigger a page refresh
    window.location.reload();
  };

  const store = () => {
    navigate("/store");
  };

  const cart = () => [
    navigate("/store/product/cart")
  ]


  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-28 border-b-8 border-secondary px-5 md:px-[64px] bg-background">
      <div className="flex items-center justify-between w-full h-full">
        <Link to="/">
          <div>
            <img src={title} className="md:w-[217.89px]" />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <Button
            title={followButton}
            className="bg-[#C685D62E] font-heading text-[#104665]"
          />

          <div className="flex items-center gap-2">
            {socials.map((social, index) => {
              return (
                <div
                  key={index}
                  className="p-3 shadow-xl bg-background rounded-full"
                >
                  <img src={social.icon} />
                </div>
              );
            })}
          </div>

          {authData.accessToken ? (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleDropdown}
              >
                <img
                  src={authData.storeData.imageUrl}
                  width={30}
                  height={30}
                  className="rounded-full"
                  alt="User Profile"
                />
                <p className="text-primary text-[18px] font-bold">
                  Hi,{" "}
                  <span className="text-secondary">
                    {authData.storeData.username}
                  </span>
                </p>
              </div>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 flex flex-col items-start">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={store}
                  >
                    Store
                  </button>

                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={cart}
                  >
                    Cart
                  </button>

                  <button
                    onClick={logout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button
                title={buttonTitle}
                className="bg-secondary text-background font-heading"
              />
            </Link>
          )}
        </div>

        <div
          className="flex md:hidden p-2 rounded-full bg-secondary text-background"
          onClick={handleChange}
        >
          {nav ? <IoCloseSharp size={30} /> : <MdOutlineMenu size={30} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
