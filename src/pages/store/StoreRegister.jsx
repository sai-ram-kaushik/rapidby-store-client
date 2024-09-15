import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StoreRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { storeName } = useParams(); // Extract storeName from the params
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT_URI}/api/public/create-user`,
        {
          name,
          email,
          password,
          store: storeName,
        }
      );

      toast.success("User Registered Successfully!! ");
      setTimeout(() => {
        navigate(`/store/${storeName}`);
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("User is already registered");
      } else {
        toast.error("All fields are required");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex md:h-[80vh]">
      <ToastContainer />
      <div className="w-full flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h2 className="text-3xl font-semibold mb-6 text-black text-center">
            Register
          </h2>

          <form action="#" className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center gap-5 w-full">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>

              <p>
                Have an account?{" "}
                <Link to={`/store/${storeName}/`} className="text-secondary">
                  Login!!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoreRegister;
