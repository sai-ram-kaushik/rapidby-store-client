import React, { useContext } from "react";
import searchIcon from "/dashboardIcons/search.svg";
import notificationIcon from "/dashboardIcons/notification.svg";
import avatar from "/dashboardIcons/avatar.svg";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { authData } = useContext(AuthContext);
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

        <div className="flex items-center gap-4">
          <img src={notificationIcon} />
          <p>|</p>
          <img src={avatar} />
          {authData.accessToken ? (
            <p>{authData.storeData.username}</p>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
