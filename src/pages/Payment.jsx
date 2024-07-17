import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState({});

  const { orderDetails } = location.state;
  const amount = orderDetails.amount;

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createRazorPayOrder = (amount) => {
    let data = JSON.stringify({
      amount: amount * 100,
      currency: "INR",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/orders`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        handleRazorpayScreen(response.data.amount);
      })
      .catch((error) => {
        console.error("Error creating RazorPay order:", error);
      });
  };

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      console.log("some error in screen loading");
      return;
    }

    const options = {
      key: "rzp_test_yAUUw7s6ZKBKD4",
      amount: amount,
      currency: "INR",
      name: "RapidBy",
      handler: function (response) {
        setResponseId(response.razorpay_payment_id);
        placeOrder();
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const placeOrder = async () => {
    setResponseState({ ...responseState, isLoading: true });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/create-order`,
        orderDetails
      );
      console.log(response.data);
      localStorage.removeItem("cart");
      toast.success("Order has been placed");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(
        "An error occurred while creating the order. Please try again later."
      );
    } finally {
      setResponseState({ ...responseState, isLoading: false });
    }
  };

  return (
    <div className="w-full h-[80vh]">
      <ToastContainer />
      <div className="w-full h-full flex items-center justify-center">
        <button
          onClick={() => createRazorPayOrder(amount)}
          className="bg-primary px-5 py-3 rounded-full text-background text-2xl"
        >
          Pay {amount} Rs.
        </button>
      </div>
    </div>
  );
};

export default Payment;
