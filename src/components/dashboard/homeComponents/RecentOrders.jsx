import React from "react";
import Button from "../../../utils/Button";
import data from "../../../data/Home.json";
const RecentOrders = () => {
  const { orders } = data.orderDetails.ordersList;
  return (
    <div className="w-full">
      <div className="flex flex-col items-start bg-background rounded-lg w-full p-5">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-[20px] font-bold">Recent Orders</h3>
          <div className="flex items-center gap-[16px]">
            <p className="text-[14px]">Filter</p>
            <Button title="Export" />
          </div>
        </div>

        {/* <table className="flex flex-col w-full mt-5">
          <thead>
            <tr className="flex items-center gap-20 w-full text-paraHelper text-[14px]">
              <th>Order ID</th>
              <th>Order By</th>
              <th>Product</th>
              <th>Email ID</th>
              <th>Order Date/Time</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return(
                <tr key={index} className="flex items-center gap-20 w-full text-paraHelper text-[14px]">
                  <th>{order.orderId}</th>
                  <th>{order.orderedBy}</th>
                  <th>{order.product}</th>
                  <th>{order.email}</th>
                  <th>{order.orderDate}</th>
                  <th>{order.amount}</th>
                  <th>{order.status}</th>
                  <th>:</th>
                </tr>
              )
            })}
          </tbody>
        </table> */}

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
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{order.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.orderedBy}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.orderDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
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
  );
};

export default RecentOrders;
