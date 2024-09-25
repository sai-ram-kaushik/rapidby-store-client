import TotalCustomersContainer from "@/components/dashboard/totalCustomers/TotalCustomersContainer";
import React from "react";

const DashboardTotalCustomers = () => {
  return (
    <div className="py-5 px-5 md:px-10 w-full bg-container flex flex-col items-start gap-4 rounded-xl min-h-screen">
      <TotalCustomersContainer />
    </div>
  );
};

export default DashboardTotalCustomers;
