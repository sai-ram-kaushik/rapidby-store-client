import React from "react";
import Sidebar from "./Sidebar";
import data from '../../data/sidebar.json'
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar sidebar={data.sidebar} />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default DashboardLayout;
