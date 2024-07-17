import React from "react";
import Button from "../utils/Button";

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
        <div className="flex flex-col items-center w-full">
          <h3 className="text-[#CF6FDC] text-[25px] md:text-[38px] font-bold">
            Rapid hub
          </h3>
          <p>Delivered Door-to-Door</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center justify-center gap-4 py-10">
            {images.map((image, index) => (
              <div key={index} className=" rounded-lg">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>
            ))}
          </div>

          <div>
            <Button title="See All Products" className="bg-background text-primary text-[20px] font-semibold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RapidHub;
