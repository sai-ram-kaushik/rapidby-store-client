import React from "react";
import Button from "../utils/Button";

const PlatformDetails = ({ platformDetails }) => {
  const {
    firstBoxTitle,
    firstBoxContent,
    firstBoxButtonTitle,
    firstBoxImage,
    noiceBg,
    secondBoxTitle,
    secondBoxContent,
    secondBoxButtonTitle,
    secondBoxImage,
  } = platformDetails;


  return (
    <div className="px-5 md:px-10 py-10 w-full bg-primary">
      <div
        className="flex flex-col items-start justify-center w-full"
      >
        <div className="flex flex-col md:flex-row items-start justify-center w-full gap-10">
          <div className="max-w-[664px] h-[600px] md:h-[965px] border bg-gradient-to-r from-[#EF7447] to-[#DA57AA] px-10 py-10 rounded-xl relative">
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-primary text-[25px] md:text-[56px] font-bold md:leading-[67.2px]">
                {firstBoxTitle}
              </h3>

              <p className="font-heading text-[16px] md:text-[24px] text-primary">
                {firstBoxContent}
              </p>

              <Button
                title={firstBoxButtonTitle}
                className="bg-primary py-4 mt-5 text-[16px] md:text-[24px] text-background"
              />

              <img src={firstBoxImage} className="absolute bottom-0 right-0" />
            </div>
          </div>

          <div className="max-w-[664px] h-[600px] md:h-[965px] border rounded-xl relative">
            <img
              src={noiceBg}
              className="h-full w-full opacity-55"
              alt="Background"
            />
            <div className="absolute inset-0 flex flex-col items-start gap-2 p-10">
              <h3 className="text-background text-[25px] md:text-[56px] font-bold md:leading-[67.2px]">
                {secondBoxTitle}
              </h3>

              <p className="font-heading text-[16px] md:text-[24px] text-background">
                {secondBoxContent}
              </p>

              <Button
                title={secondBoxButtonTitle}
                className="bg-transparent border border-background py-4 mt-5 text-[16px] md:text-[24px] text-background"
              />

              <img src={secondBoxImage} className="absolute bottom-0 right-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformDetails;
