import React from "react";
import Button from "../utils/Button";
import { Link } from "react-router-dom";

const RapidHub = () => {
  const images = [
    "/productImages/1.png",
    "/productImages/2.png",
    "/productImages/3.png",
    "/productImages/4.png",
    "/productImages/5.png",
    "/productImages/6.png",
  ];

  return (
    <div className="w-full px-5 lg:px-10 py-10 bg-primary">
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-center w-full relative">
          <h3 className="text-[#CF6FDC] text-[25px] md:text-[44px] font-bold font-heading">
            Rapid hub
          </h3>
          <p className="text-background font-heading text-[22px] md:text-[44px] z-[990px]">
            Delivered Door-to-Door
          </p>

          <p className="absolute text-background/20 text-[60px] md:text-[232px] z-[980px] top-3 md:top-0 font-bold">PRODUCTS</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center justify-center gap-4 py-10">
            {images.map((image, index) => (
              <div key={index} className="group rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-auto object-cover rounded-md transform transition-transform duration-300 group-hover:scale-125"
                />
              </div>
            ))}
          </div>

          <div>
            <Link to="/login">
              <Button
                title="See All Products"
                className="bg-background text-primary text-[20px] font-semibold"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RapidHub;
