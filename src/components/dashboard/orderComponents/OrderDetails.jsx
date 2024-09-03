import axios from "axios";
import React, { useEffect, useState } from "react";

const OrderDetails = () => {
  const [monthlyMetrix, setMonthlyMatrix] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/order-metrix`)
      .then((response) => {
        setMonthlyMatrix(response.data.data);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <div className="bg-[#FBE0FF] md:min-w-[374.67px] md:min-h-[126px] rounded-lg w-full">
          <div className="flex flex-col items-start gap-3 py-[28px] px-[32px]">
            <p>Order this month</p>
            <div className="flex items-center gap-4">
              <p className="text-[36px]">{monthlyMetrix.totalOrdersCount}</p>
              {/* <p className="text-[#C04151]">-35% from the last month</p> */}
            </div>
          </div>
        </div>

        <div className="bg-[#FFEDD3] md:min-w-[374.67px] md:min-h-[126px] rounded-lg w-full">
          <div className="flex flex-col items-start gap-3 py-[28px] px-[32px]">
            <p>Product of the month</p>
            <div className="flex items-center gap-4">
              <p className="text-[36px] font-bold">Nike SportsWare</p>
              {/* <p className="text-[#C04151]">-35% from the last month</p> */}
            </div>
          </div>
        </div>

        <div className="bg-[#EFFFFA] md:min-w-[374.67px] md:min-h-[126px] rounded-lg w-full">
          <div className="flex flex-col items-start gap-3 py-[28px] px-[32px]">
            <p>Order Delivered this month</p>
            <div className="flex items-center gap-4">
              <p className="text-[36px]">
                {monthlyMetrix.deliveredOrdersCount}
              </p>
              <p className="text-[#C04151]">-35% from the last month</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 w-full mt-3">
        <div className="bg-background md:min-w-[374.67px] md:min-h-[126px] rounded-lg w-full">
          <div className="flex flex-col items-start gap-3 py-[28px] px-[32px]">
            <p>Order Ready to Deliver</p>
            <div className="flex items-center gap-4">
              <p className="text-[36px] font-bold">
                {monthlyMetrix.readyToDeliverCount}
              </p>
              {/* <p className="text-[#C04151]">-35% from the last month</p> */}
            </div>
          </div>
        </div>

        <div className="bg-background md:min-w-[374.67px] md:min-h-[126px] rounded-lg w-full">
          <div className="flex flex-col items-start gap-3 py-[28px] px-[32px]">
            <p>Order in queue</p>
            <div className="flex items-center gap-4">
              <p className="text-[36px] font-bold">
                {monthlyMetrix.inQueueCount}
              </p>
              {/* <p className="text-[#C04151]">-35% from the last month</p> */}
            </div>
          </div>
        </div>

        <div className="bg-background md:min-w-[374.67px] md:min-h-[126px] rounded-lg w-full">
          <div className="flex flex-col items-start gap-3 py-[28px] px-[32px]">
            <p>Order Pending</p>
            <div className="flex items-center gap-4">
              <p className="text-[36px] font-bold">
                {monthlyMetrix.pendingCount}
              </p>
              {/* <p className="text-[#C04151]">-35% from the last month</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
