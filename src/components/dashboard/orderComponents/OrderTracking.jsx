import React, { useEffect, useState } from "react";
import Button from "../../../utils/Button";
import searchIcon from "/dashboardIcons/search.svg";
import axios from "axios";
import moment from "moment-timezone";
import { useDebounce } from "../../hooks/useDebounce";

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

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

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-red-600";
      case "processing":
        return "text-blue-600";
      case "delivered":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    axios
      .put(`${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/update-order-details/${orderId}`, {
        status: newStatus,
      })
      .then((response) => {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        setActiveDropdown(null);
      })
      .catch((error) => {
        console.log("Error updating order status:", error);
      });
  };

  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      order.firstName.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex flex-col items-start bg-background rounded-lg w-full p-5">
        <div className="flex items-center justify-center gap-4 w-full">
          <Button title="Export" />
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <p>All</p>
            <p>Pending</p>
            <p>In queue</p>
            <p>Ready to deliver</p>
            <p>Delivered</p>
          </div>

          <div className="flex max-w-[290px] gap-2 bg-gray-100 p-2 rounded-xl">
            <img src={searchIcon} alt="Search" />
            <input
              type="search"
              className="bg-transparent outline-none"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-200 mt-5">
          <thead className="">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order By
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order Date/Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  #{order._id.slice(16, 23)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatToIST(order.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.amount}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap ${getStatusClass(
                    order.status
                  )}`}
                >
                  {order.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap relative">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() =>
                      setActiveDropdown(activeDropdown === index ? null : index)
                    }
                  >
                    ...
                  </button>
                  {activeDropdown === index && (
                    <div className="absolute bg-white shadow-lg rounded-md p-2 mt-1 z-10">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() =>
                          handleStatusUpdate(order._id, "Processing")
                        }
                      >
                        Processing
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleStatusUpdate(order._id, "Shipped")}
                      >
                        Shipped
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTracking;
