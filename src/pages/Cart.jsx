import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [places, setPlaces] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { storeName, id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartData);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    toast.success("Item removed from cart!");
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.amount, 0);
  };

  const handleCreateOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty. Please add items to your cart.");
      return;
    }

    const orderDetails = {
      cartItems,
      firstName,
      lastName,
      mobileNumber,
      places,
      email,
      amount: calculateTotalAmount(),
    };

    navigate(`/store/${storeName}/product/${id}/payment`, {
      state: { orderDetails },
    });
  };

  return (
    <div className="container mx-auto mt-10">
      <ToastContainer />
      <div className="sm:flex shadow-md my-10">
        <div className="w-full sm:w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
          </div>
          {cartItems.map((cartItem, index) => (
            <div
              className="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50"
              key={index}
            >
              <div className="md:w-4/12 2xl:w-1/4 w-full">
                <img
                  src={cartItem.imageUrl}
                  alt={cartItem.name}
                  width={100}
                  height={100}
                  className="h-full object-center object-cover md:block hidden"
                />
              </div>
              <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                <div className="flex items-center justify-between w-full">
                  <p className="text-base font-black leading-none text-gray-800">
                    {cartItem.name}
                  </p>
                  <div className="flex flex-col items-start">
                    <p className="font-bold">Amount</p>
                    <p>{cartItem.amount}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5">
                  <div className="flex items-center">
                    <p
                      className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between">
            <Link
              to={`/store/${storeName}/store-products`}
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
        <div className="w-full sm:w-1/4 bg-white px-10 py-10">
          <h2 className="font-semibold text-2xl mb-5">Order Details</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateOrder();
            }}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="mobileNumber"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="places"
              >
                Location
              </label>
              <input
                type="text"
                id="places"
                name="places"
                value={places}
                onChange={(e) => setPlaces(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-secondary text-background rounded-lg py-[8px] px-[24px]"
            >
              {isLoading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
