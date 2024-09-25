import axios from "axios";
import React, { useEffect, useState } from "react";

const TotalCustomersContainer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`http://localhost:8000/api/public/get-total-customer-details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCustomers(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  }, []); // Ensure useEffect runs only once by passing an empty array

  return (
    <div className="w-full">
      <div className="flex flex-col items-start">
        <h3 className="font-heading text-[12px] md:text-[24px] text-[#48246C] font-semibold">
          Total Customers
        </h3>
        <p>This is what we&apos;ve got for you today!</p>
      </div>

      <div className="overflow-x-auto mt-5 rounded-xl">
        <table className="min-w-full text-sm text-left bg-background">
          <thead className="text-xs uppercase bg-background">
            <tr>
              <th className="py-2 px-4 text-center">Customer ID</th>
              <th className="py-2 px-4 text-center">Full Name</th>
              <th className="py-2 px-4 text-center">Email</th>
              <th className="py-2 px-4 text-center">Contact</th>
              <th className="py-2 px-4 text-center">Total Orders</th>
              <th className="py-2 px-4 text-center">Total Amount Spent</th>
              <th className="py-2 px-4 text-center">Province</th>
              <th className="py-2 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(customers) && customers.length > 0 ? (
              customers.map((customer, idx) => (
                <tr className="bg-white border-b" key={idx}>
                  <td className="px-6 py-4 text-center">
                    #{customer._id.slice(16, 24)}
                  </td>
                  <td className="px-6 py-4 text-center">{customer.name}</td>
                  <td className="px-6 py-4 text-center">{customer.email}</td>
                  <td className="px-6 py-4 text-center">{customer.contact}</td>
                  <td className="px-6 py-4 text-center">
                    {customer.totalOrders}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {customer.totalAmountSpent}
                  </td>
                  <td className="px-6 py-4 text-center">{customer.province}</td>
                  <td className="px-6 py-4 text-center">...</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalCustomersContainer;
