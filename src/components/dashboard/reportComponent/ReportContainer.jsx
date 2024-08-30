import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import RecentOrders from "../homeComponents/RecentOrders";
import axios from "axios";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const [metrix, setMetrix] = useState("");
  const [clicksCount, setClicksCount] = useState("");
  const { storeName } = useParams();
  useEffect(() => {
    const ctx = document.getElementById("revenueChart").getContext("2d");
    // Chart code can be added here
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/order-metrix`)
      .then((response) => {
        setMetrix(response.data.data);
      });
  }, []);

  return (
    <div className="p-8 w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left Section */}
        <div className="grid grid-cols-1 md:grid-rows-3 gap-6">
          <div className="bg-[#FBE0FF] p-6 rounded-lg shadow-md h-full">
            <h2 className="text-gray-600">Sales this month</h2>
            <p className="text-3xl font-semibold">${metrix.totalSales}</p>
            {/* <p className="text-green-500">+50% from last month</p> */}
          </div>
          <div className="bg-[#FFEDD3] p-6 rounded-lg shadow-md h-full">
            <h2 className="text-gray-600">Profit this month</h2>
            <p className="text-3xl font-semibold">${metrix.totalProfit}</p>
            {/* <p className="text-green-500">+8% from last month</p> */}
          </div>
          <div className="bg-[#EFFFFA] p-6 rounded-lg shadow-md h-full">
            <h2 className="text-gray-600">Products sold this month</h2>
            <p className="text-3xl font-semibold">{metrix.productsSold}</p>
            {/* <p className="text-green-500">+120% from last month</p> */}
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-rows-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-gray-600">Total clicks this month</h2>
            <p className="text-3xl font-semibold">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-gray-600">Total impressions this month</h2>
            <p className="text-3xl font-semibold">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-gray-600">Conversion rate</h2>
            <p className="text-3xl font-semibold">0%</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-6 rounded-lg shadow-md h-full bg-white">
          <h2 className="text-gray-600">Active Buyers</h2>
          <p className="text-4xl font-semibold">44,000</p>
          <p className="text-green-500">+60% than average</p>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">USA</span>
              <span className="text-gray-600">30,800 (70%)</span>
            </div>
            <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: "70%" }}
              ></div>
            </div>
            <div className="flex justify-between items-center mb-2 mt-4">
              <span className="text-gray-600">Canada</span>
              <span className="text-gray-600">5,720 (13%)</span>
            </div>
            <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: "13%" }}
              ></div>
            </div>
            <div className="flex justify-between items-center mb-2 mt-4">
              <span className="text-gray-600">Mexico</span>
              <span className="text-gray-600">4,400 (10%)</span>
            </div>
            <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: "10%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-5">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-600">Recent Transactions</h2>
          <table className="min-w-full mt-4">
            <thead>
              <tr>
                <th className="text-left text-gray-600">No.</th>
                <th className="text-left text-gray-600">Items</th>
                <th className="text-left text-gray-600">Date</th>
                <th className="text-left text-gray-600">Sales</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">1</td>
                <td className="py-2">Shoes</td>
                <td className="py-2">12/04/24</td>
                <td className="py-2">3</td>
              </tr>
              <tr>
                <td className="py-2">2</td>
                <td className="py-2">Headphones</td>
                <td className="py-2">10/04/24</td>
                <td className="py-2">3</td>
              </tr>
              <tr>
                <td className="py-2">3</td>
                <td className="py-2">Laptop</td>
                <td className="py-2">08/04/24</td>
                <td className="py-2">3</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-600">Revenue so far</h2>
          <canvas id="revenueChart"></canvas>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h2 className="text-gray-600">Your Earnings</h2>
          <p className="text-3xl font-semibold">$135,481</p>
          <p className="text-gray-600">
            Lifetime Earning from Jan 2023 - May 2024
          </p>
          <div className="flex gap-4 mt-4">
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">
              Withdraw
            </button>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
              Link your Account
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h2 className="text-gray-600">Last Withdrawal</h2>
          <p className="text-3xl font-semibold">$85,481</p>
          <p className="text-gray-600">From May 24 - June 24</p>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg mt-4">
            Export Receipt
          </button>
        </div>
      </div> */}

      <RecentOrders />
    </div>
  );
};

export default Dashboard;
