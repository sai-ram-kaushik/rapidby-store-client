import React, { useEffect, useState, useTransition, useContext } from "react";
import TabButton from "../../../utils/TabButton";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";

const StoreSettingContainer = () => {
  const [tab, setTab] = useState("Your Details");
  const { authData } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [storeData, setStoreData] = useState(null);
  const [copySuccess, setCopySuccess] = useState("");
  const { storeName } = useParams();
  const [isPending, startTransition] = useTransition();
  const [themes, setThemes] = useState([]);

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const [storeAdminDetails, setStoreAdminDetails] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(
        `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/get-store-admin-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setStoreAdminDetails(response.data.data);
      });

    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT_URI}/api/admin/get-all-themes`)
      .then((response) => {
        setThemes(response.data.data);
      });
  }, []);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        if (authData && authData.storeData) {
          setStoreData(authData.storeData);
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(
            `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/get-products`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProducts(response.data.data);
        } else {
          const storeResponse = await axios.get(
            `${import.meta.env.VITE_API_ENDPOINT_URI}/api/public/store/name/${storeName}`
          );
          setStoreData(storeResponse.data.data);
          const productResponse = await axios.get(
            `${import.meta.env.VITE_API_ENDPOINT_URI}/api/public/store/name/${storeName}/products`
          );

          setProducts(productResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStoreData();
  }, [authData, storeName]);

  const handleCopy = () => {
    const profileUrl = `${window.location.origin}/store/${storeData.storeName}`;
    navigator.clipboard.writeText(profileUrl).then(
      () => {
        setCopySuccess("Profile URL copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 3000);
      },
      () => {
        setCopySuccess("Failed to copy URL.");
      }
    );
  };

  const handleSetStoreTheme = () => {
    axios
      .put(`${import.meta.env.VITE_API_ENDPOINT_URI}/api/admin/set-store-theme`)
      .then((response) => {
        console.log("theme has been added");
      });
  };

  const Product_Tab_Data = [
    {
      title: "Your Details",
      id: "Your Details",
      content: (
        <form className="mt-5">
          <div className="flex flex-col items-start gap-2">
            <p className="text-secondary">Basic Details</p>
            <div className="w-full">
              <label for="Store name" className="block text-sm font-medium">
                Store Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                readOnly
                value={storeAdminDetails.storeName}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>

            <div className="flex items-center gap-5 w-full">
              <div className="w-full">
                <label for="Store name" className="block text-sm font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  readOnly
                  value={storeAdminDetails.username}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              <div className="w-full">
                <label for="Store name" className="block text-sm font-medium">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  readOnly
                  value={storeAdminDetails.mobileNumber}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              <div className="w-full">
                <label for="Store name" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  readOnly
                  value={storeAdminDetails.email}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
            </div>

            <p className="text-secondary">Social Links</p>
            <div className="flex items-center gap-5 w-full">
              <div className="w-full">
                <label for="Store name" className="block text-sm font-medium">
                  Instagram
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  readOnly
                  value={storeAdminDetails.instagramUrl}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              <div className="w-full">
                <label for="Store name" className="block text-sm font-medium">
                  Facebook
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  readOnly
                  value={storeAdminDetails.facebookUrl}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              <div className="w-full">
                <label for="Store name" className="block text-sm font-medium">
                  Add Social Links
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
            </div>
          </div>
        </form>
      ),
    },

    {
      title: "Payment Details",
      id: "Payment Details",
      content: (
        <form className="mt-5">
          <div className="flex flex-col items-start gap-2">
            <div className="w-full">
              <label for="Store name" className="block text-sm font-medium">
                Paypal Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>

            <div className="flex items-center gap-5 w-full">
              <div className="w-full">
                <label for="Store name" className="block text-sm font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              <div className="w-full">
                <label for="Store name" className="block text-sm font-medium">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              <div className="w-full">
                <label for="Store name" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
            </div>
          </div>
        </form>
      ),
    },

    {
      title: "Themes",
      id: "Themes",
      content: (
        <div className="flex flex-wrap items-start justify-start mt-10 text-center">
          {themes.map((theme, idx) => {
            return (
              <img
                src={theme.imageUrl}
                width={200}
                className="rounded-xl"
                key={idx}
                onClick={handleSetStoreTheme}
              />
            );
          })}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-background p-5 rounded-xl">
      <div className="flex flex-col items-start">
        <h2 className="text-[14px] md:text-[24px] font-bold ">
          Store Settings
        </h2>
        <p>Customize your store</p>
      </div>

      <hr className="text-background mt-3" />

      <div className="flex items-start gap-5 mt-5">
        <TabButton
          selectTab={() => handleTabChange("Your Details")}
          active={tab === "Your Details"}
        >
          Your Details
        </TabButton>
        <TabButton
          selectTab={() => handleTabChange("Payment Details")}
          active={tab === "Payment Details"}
        >
          Payment Details
        </TabButton>
        <TabButton
          selectTab={() => handleTabChange("Themes")}
          active={tab === "Themes"}
        >
          Themes
        </TabButton>
      </div>

      <div>{Product_Tab_Data.find((t) => t.id === tab).content}</div>

      <button
        onClick={handleCopy}
        className="mt-4 px-4 py-2 bg-secondary text-background rounded-lg"
      >
        Share Profile
      </button>
      {copySuccess && <div className="mt-2 text-green-600">{copySuccess}</div>}
    </div>
  );
};

export default StoreSettingContainer;
