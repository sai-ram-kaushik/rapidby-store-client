import React, { useContext, useState, useEffect, useRef } from "react";
import Button from "../utils/Button";
import { MdOutlineMenu } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ navbar }) => {
  const { title, followButton, socials, buttonTitle } = navbar;
  const [nav, setNav] = useState(false);

  const handleChange = () => {
    setNav(!nav);
  };

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

            <Link to="/login">
              <Button title={buttonTitle} className="bg-secondary font-heading text-background"/>
            </Link>
          </div>
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
