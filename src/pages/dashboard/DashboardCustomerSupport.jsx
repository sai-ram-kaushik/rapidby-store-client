import CustomerSupport from "@/components/dashboard/customerSupport/CustomerSupport";
import React from "react";

const DashboardCustomerSupport = () => {
  return (
    <div className="py-5 px-5 md:px-10 w-full bg-container flex flex-col items-start gap-4 rounded-xl">
      <CustomerSupport />
    </div>
  );
};

export default DashboardCustomerSupport;
