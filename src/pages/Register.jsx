import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [storeName, setStoreName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Function to validate password
  const validatePassword = (password) => {
    const minLength = /^(?=.{8,})/;
    const hasUppercase = /^(?=.*[A-Z])/;
    const hasLowercase = /^(?=.*[a-z])/;
    const hasNumber = /^(?=.*[0-9])/;
    const hasSpecialChar = /^(?=.*[!@#$%^&*])/;

    if (!minLength.test(password)) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUppercase.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowercase.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumber.test(password)) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar.test(password)) {
      return "Password must contain at least one special character";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mobileNumber.length !== 10) {
      toast.error("Mobile number must be exactly 10 digits");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("linkedinUrl", linkedinUrl);
    formData.append("facebookUrl", facebookUrl);
    formData.append("instagramUrl", instagramUrl);
    formData.append("mobileNumber", mobileNumber);
    formData.append("storeName", storeName);
    if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/create-store-admin`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("User Registered Successfully!! ");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Store-admin is already registered");
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700"
              >
                StoreImage <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="imageUrl"
                name="imageUrl"
                onChange={(e) => setImageUrl(e.target.files[0])}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>

            <div className="flex items-center gap-3">
              <div>
                <label
                  htmlFor="linkedinUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Linkedin Url
                </label>
                <input
                  type="text"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="facebookUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Facebook Url
                </label>
                <input
                  type="text"
                  id="facebookUrl"
                  name="facebookUrl"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <label
                  htmlFor="instagramUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Instagram Url
                </label>
                <input
                  type="text"
                  id="instagramUrl"
                  name="instagramUrl"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  MobileNumber <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="storeName"
                className="block text-sm font-medium text-gray-700"
              >
                Store Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
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
                <Link to="/login" className="text-secondary">
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

export default Register;
