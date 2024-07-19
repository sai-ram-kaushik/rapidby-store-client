import React from "react";
import OrderDetails from "../../components/dashboard/orderComponents/OrderDetails";
import OrderTracking from "../../components/dashboard/orderComponents/OrderTracking";

const DashboardOrdersPage = () => {
  return (
    <div className="py-5 px-5 md:px-10 w-full bg-container flex flex-col items-start gap-4">
      <OrderDetails />
      <OrderTracking />
    </div>
  );
};

export default DashboardOrdersPage;
