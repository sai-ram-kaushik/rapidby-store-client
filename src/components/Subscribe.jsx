import React from "react";
import Button from "../utils/Button";
import { Link } from "react-router-dom";

const Subscribe = () => {
  return (
    <div className="w-full bg-background py-10 px-5 md:px-10">
      <div className="flex flex-col items-center justify-center w-full gap-5">
        <h3 className="text-[#48246C5C] text-[40px] md:text-[80px] max-w-[1150px] text-center font-bold md:leading-[96px] font-heading">
          Join Rapidby today and ignite your influence!
        </h3>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            placeholder="Enter your email"
            className="bg-[#EAEAEA] px-5 py-3 rounded-full outline-none text-primary"
          />
          <Link to="/login">
            <Button
              title="Sign up Now"
              className="bg-[#48246C] py-3 text-background"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
