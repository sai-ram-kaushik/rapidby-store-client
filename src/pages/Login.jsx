import axios from "axios";
import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      if (showResetPassword) {
        if (!email || !newPassword) {
          toast.error("Email and new password are required");
          setIsLoading(false);
          return;
        }
  
        const response = await axios.put(
          `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/reset-password`,
          { email, newPassword }
        );
  
        toast.success("Password successfully reset. You can now log in.");
        setShowResetPassword(false);
        setEmail("");
        setNewPassword("");
      } else {
        if (!username || !password) {
          toast.error("Username and password are required");
          setIsLoading(false);
          return;
        }
  
        const response = await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/login-store-admin`,
          { username, password }
        );
  
        const { accessToken, refreshToken, storeAdmin } = response.data.data;
  
        Cookies.set("accessToken", accessToken, { expires: 7 });
        Cookies.set("refreshToken", refreshToken, { expires: 7 });
  
        login({ accessToken, refreshToken, storeData: storeAdmin });
        toast.success("User successfully logged in");
        setTimeout(() => {
          navigate("/store-admin/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.message || "Error while processing your request";
      
      // Check if the error is related to wrong credentials
      if (error.response?.status === 401) {
        toast.error("Incorrect username or password");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex md:h-[70vh]">
      <ToastContainer />
      <div className="w-full h-full flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h2 className="text-3xl font-semibold mb-6 text-primary text-center">
            {showResetPassword ? "Reset Password" : "Login"}
          </h2>

          <form action="#" className="space-y-4" onSubmit={handleSubmit}>
            {showResetPassword ? (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-background"
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

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
              </>
            ) : (
              <>
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
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
                  <p
                    className="text-sm flex justify-end mt-4 cursor-pointer text-blue-600"
                    onClick={() => setShowResetPassword(true)}
                  >
                    Forgot Password?
                  </p>
                </div>
              </>
            )}

            <div className="flex flex-col items-start gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                {isLoading
                  ? showResetPassword
                    ? "Resetting Password..."
                    : "Signing in..."
                  : showResetPassword
                    ? "Reset Password"
                    : "Sign In"}
              </button>

              {!showResetPassword && (
                <p>
                  Don't have an account?{" "}
                  <Link to="/register" className="text-secondary">
                    Create Your Store Now!!
                  </Link>
                </p>
              )}

              {showResetPassword && (
                <p
                  className="text-sm flex justify-end mt-4 cursor-pointer text-blue-600"
                  onClick={() => setShowResetPassword(false)}
                >
                  Back to Login
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
