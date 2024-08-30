import React, { useEffect, useState } from "react";
import data from "../../../data/Home.json";
import axios from "axios";
import { Link } from "react-router-dom";
const HomeDetails = () => {
  const [count, setCount] = useState("");
  const [orderPendingCount, setOrderPendingCount] = useState("");
  const [storeAdminCount, setStoreAdminCount] = useState("");
  const { totalProduct, orderPending, totalCustomer } = data.productDetails;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    axios
      .get(
        `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/count-products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setCount(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching the product count", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/order-pending-count`
      )
      .then((response) => {
        setOrderPendingCount(response.data.data);
      });
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/get-count`)
      .then((response) => {
        setStoreAdminCount(response.data.data);
        console.log(response.data.data);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <Link to="/store-admin/dashboard/products" className="w-full">
          <div className="bg-[#DEE9FF] md:min-w-[374.67px] md:min-h-[175px] rounded-lg w-full">
            <div className="flex flex-col items-start gap-3 py-[28px] px-[32px]">
              <div className="flex items-center gap-4">
                <img src={totalProduct.icon} width={32} height={32} />
                <h3 className="text-[24px] font-heading font-semibold">
                  {totalProduct.title}
                </h3>
                <img src={totalProduct.arrowIcon} />
              </div>

              <div className="flex items-center gap-2">
                <h3 className="text-[56px] font-bold">{count.count}</h3>
                <div className="flex flex-col items-start">
                  <p>10 New products</p>
                  <p>added last month</p>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/store-admin/dashboard/orders" className="w-full">
          <div className="bg-[#FBE0FF] md:min-w-[374.67px] md:min-h-[175px] rounded-lg w-full">
            <div className="flex flex-col items-start gap-3 py-[28px] px-[32px]">
              <div className="flex items-center gap-4">
                <img src={orderPending.icon} width={32} height={32} />
                <h3 className="text-[24px] font-heading font-semibold">
                  {orderPending.title}
                </h3>
                <img src={orderPending.arrowIcon} />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-[56px] font-bold">{orderPendingCount}</h3>
                <div className="flex flex-col items-start">
                  <p>10 New products</p>
                  <p>added last month</p>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/store-admin/dashboard/customer-support" className="w-full">
          <div className="bg-[#FFEDD3] md:min-w-[374.67px] md:min-h-[175px] rounded-lg w-full">
            <div className="flex flex-col items-start gap-3 py-[28px] px-[32px]">
              <div className="flex items-center gap-4">
                <img src={totalCustomer.icon} width={32} height={32} />
                <h3 className="text-[24px] font-heading font-semibold">
                  {totalCustomer.title}
                </h3>
                <img src={totalCustomer.arrowIcon} />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-[56px] font-bold">{storeAdminCount}</h3>
                <div className="flex flex-col items-start">
                  <p>10 New products</p>
                  <p>added last month</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeDetails;
