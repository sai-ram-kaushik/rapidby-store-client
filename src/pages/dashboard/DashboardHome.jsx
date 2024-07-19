import React from "react";
import HomeHeader from "../../components/dashboard/homeComponents/HomeHeader";
import HomeDetails from "../../components/dashboard/homeComponents/HomeDetails";
import HomeStats from "../../components/dashboard/homeComponents/HomeStats";
import RecentOrders from "../../components/dashboard/homeComponents/RecentOrders";

const DashboardHome = () => {
  return (
    <div className="py-5 px-5 md:px-10 w-full bg-container flex flex-col items-start gap-4 rounded-xl">
      <HomeHeader />
      <HomeDetails />
      <HomeStats />
      <RecentOrders />
    </div>
  );
};

export default DashboardHome;
