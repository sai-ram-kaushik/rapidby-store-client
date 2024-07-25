import React from "react";

const SpinningText = () => {
  return (
    <div className="flex items-center justify-center bg-black mt-12 md:mt-0">
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
        <svg
          className="absolute w-64 h-64 animate-spin-slow"
          viewBox="0 0 200 200"
        >
          <defs>
            <path
              id="circlePath"
              d="
              M 100, 100
              m -75, 0
              a 75,75 0 1,1 150,0
              a 75,75 0 1,1 -150,0"
            />
          </defs>
          <text fontSize="35" fill="white">
            <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
              Recognition and Awards
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default SpinningText;
