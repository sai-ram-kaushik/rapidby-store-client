import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import Button from "@/utils/Button";

const OrderTrackingDetails = ({ onClose, order }) => {
  if (!order) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
      <div className="w-1/4 bg-white p-6 shadow-xl h-full overflow-y-auto transform transition-transform duration-300 rounded-tl-2xl rounded-bl-2xl">
        {/* <ToastContainer /> */}
        <button onClick={onClose} className="text-red-500 float-right">
          Close
        </button>
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        <hr />

        <div className="flex items-start justify-between mt-5">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {order.items.map((item) => (
                <>
                  <img
                    src={item.imageUrl}
                    width={100}
                    height={100}
                    className="rounded-xl"
                  />
                  <div className="flex flex-col items-start">
                    <p className="text-[18px] font-semibold">{item.name}</p>
                    <p>{order.email}</p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        <hr className="mt-5" />
        <div className="flex flex-col items-start mt-5 gap-5">
          <div className="flex flex-col items-start gap-2">
            <p className="text-[14px]">Phone Number</p>
            <h3 className="text-[18px] text-secondary">{order.mobileNumber}</h3>
          </div>

          <div className="flex flex-col items-start gap-2">
            <p className="text-[14px]">Location</p>
            <h3 className="text-[18px] text-secondary">{order.places}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingDetails;
