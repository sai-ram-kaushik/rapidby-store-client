import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../utils/Button";
import axios from "axios";

const Order = () => {
  const location = useLocation();
  const { product } = location.state || { product: {} };
  const [houseNo, setHouseNo] = useState("");
  const [buildingLane, setBuildingLane] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPinCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/create-order`,
        {
          houseNo,
          buildingLane,
          city,
          pincode,
        }
      );

      console.log(response.data.data);
    } catch (error) {
      console.log("getting error", error);
    }
  };

  return (
    <div className="w-full py-10">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center gap-5 min-w-[393.46px]">
          <img
            src={product.catalogItem.imageUrl}
            width={100}
            height={100}
            className="rounded-xl"
          />
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-bold">{product.catalogItem.name}</h3>
            <p className="text-xl">${product.catalogItem.amount}</p>
          </div>

          <div className="ml-20 flex items-center gap-3">
            <p className="text-3xl">-</p>
            <p className="text-3xl">1</p>
            <p className="text-3xl">+</p>
          </div>
        </div>

        <hr className="w-full border-t border-gray-300/60 mt-4 max-w-[393.46px]" />

        <div className="flex flex-col items-start gap-5">
          <h2 className="text-3xl font-bold">Payment Details</h2>
          <div className="flex flex-col gap-2">
            <h3>Payment details</h3>
            <p>Sub Total Product: ${product.amount}</p>
            <p>Shipping: $10.00</p>
            <p>Platform Fees: $2.00</p>
            <h4>Total: ${product.amount + 10 + 2}</h4>
          </div>
        </div>

        <hr className="w-full border-t border-gray-300/60 mt-4 max-w-[393.46px]" />

        <div className="flex flex-col gap-2 mt-4">
          <h3>Shipping Address</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
            <input
              type="text"
              placeholder="House No"
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)}
              className="rounded-lg border w-full p-2"
            />
            <input
              type="text"
              placeholder="Building / Lane"
              value={buildingLane}
              onChange={(e) => setBuildingLane(e.target.value)}
              className="rounded-lg border w-full p-2"
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-lg border w-full p-2"
            />
            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPinCode(e.target.value)}
              className="rounded-lg border w-full p-2"
            />

            <Button
              title="Place Order"
              className="bg-primary rounded-full w-full text-background font-bold text-[18px]"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
