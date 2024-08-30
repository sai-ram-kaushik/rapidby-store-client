import CustomDesignContainer from "@/components/dashboard/customDesignComponents/CustomDesignContainer";
import React from "react";

const DashboardCustomDesign = () => {
  return (
    <div className="py-5 px-5 md:px-10 w-full bg-container flex flex-col items-start gap-4 rounded-xl">
      <CustomDesignContainer />
    </div>
  );
};

export default DashboardCustomDesign;
