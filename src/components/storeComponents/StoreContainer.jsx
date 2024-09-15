import React, { useContext, useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const StoreContainer = () => {
  const { authData } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [storeData, setStoreData] = useState(null);
  const { storeName } = useParams();

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

  return (
    <div className="w-full text-primary py-10">
      <div className="flex items-center justify-center w-full h-full">
        {storeData ? (
          <div className="flex flex-col items-center">
            <img
              src={storeData.imageUrl}
              width={161}
              height={161}
              className="rounded-full"
              alt="Store"
            />

            <h3 className="text-[29px] font-bold font-heading">
              {storeData.storeName}
            </h3>

            <div className="flex items-center gap-4 p-2">
              <a
                href={storeData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin
                  className="rounded-full bg-background shadow-lg"
                  size={30}
                />
              </a>
              <a
                href={storeData.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF
                  className="rounded-full bg-background shadow-lg"
                  size={30}
                />
              </a>
              <a
                href={storeData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  className="rounded-full bg-background shadow-lg"
                  size={30}
                />
              </a>
            </div>

            <div className="mt-5 w-full">
              <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-transparent rounded-box">
                {products.map((product, index) => (
                  <Link
                    to={`/store/${storeData.storeName}/product/${product.catalogItem._id}`}
                    className="carousel-item"
                    key={index}
                  >
                    <div className="bg-secondary p-5 rounded-xl flex flex-col items-center justify-center w-full h-full">
                      <img
                        src={product.catalogItem.imageUrl}
                        width={200}
                        height={300}
                        className="rounded-box md:min-h-[300px]"
                        alt={product.catalogItem.name}
                      />
                      <p className="text-background text-[24px] font-bold">
                        {product.catalogItem.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading store details...</p>
        )}
      </div>
    </div>
  );
};

export default StoreContainer;
