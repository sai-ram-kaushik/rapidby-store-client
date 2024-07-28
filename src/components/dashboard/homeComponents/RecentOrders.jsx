import React, { useEffect, useState } from "react";
import Button from "../../../utils/Button";
import data from "../../../data/Home.json";
import axios from "axios";
import moment from "moment-timezone";


const RecentOrders = () => {
  // const { orders } = data.orderDetails.ordersList;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/get-all-orders`)
      .then((response) => {
        const sortedOrders = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
      })
      .catch((error) => {
        console.log("getting error while fetching the order", error);
      });
  }, []);

  const formatToIST = (dateString) => {
    return moment(dateString).tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss");
  };

  return (
    <div className="w-[350px] sm:w-full">
      <div className="flex flex-col items-start bg-background rounded-lg w-full p-5 md:p-8 lg:p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-5">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
            Recent Orders
          </h3>
          <div className="flex items-center gap-2 md:gap-4 mt-4 md:mt-0">
            <p className="text-sm md:text-base">Filter</p>
            <Button title="Export" />
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order By
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email ID
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order Date/Time
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.slice(0,4).map((order, index) => (
                <tr key={index}>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700">
                    #{order._id.slice(16, 23)}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700">
                    {order.firstName}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700">
                    {order.email}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700">
                    {formatToIST(order.createdAt)}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700">
                    {order.status}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      ...
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
