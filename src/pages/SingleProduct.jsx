import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "../utils/Button";
import data from "../data/single-product-page.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = () => {
  const { authData } = useContext(AuthContext);
  const { id, storeName } = useParams();
  const [product, setProduct] = useState(null);
  const { about } = data;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/${storeName}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        console.log("getting error while fetching the product", error);
      });
  }, [id]);

  const handleAddToCart = (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    const cartItem = {
      productId: product.catalogItem._id,
      name: product.catalogItem.name,
      imageUrl: product.catalogItem.imageUrl,
      amount: product.catalogItem.amount,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex((item) => item.productId === id);

    if (itemIndex > -1) {
      // cart[itemIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Item added to cart!");

    setTimeout(() => {
      navigate(`/store/${storeName}/product/${id}/cart`)
    }, 2000)
  };

  if (!product || !product.catalogItem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full py-10 px-5 md:px-10 min-h-screen">
      <ToastContainer />
      <div className="flex items-start">
        <Link to={`/store/${storeName}`}>
          <div className="flex items-center gap-3">
            {authData.storeData?.imageUrl && (
              <img
                src={authData.storeData.imageUrl}
                className="rounded-full"
                width={50}
                height={50}
                alt="Store"
              />
            )}
            <div className="flex flex-col items-start">
              <h3 className="text-[29.06px] font-heading font-bold">
                {authData.storeData?.username}
              </h3>
              <p>Product Description</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center gap-36 w-full mt-10">
        <div className="flex flex-col items-center gap-2">
          {product.catalogItem?.imageUrl && (
            <img
              src={product.catalogItem.imageUrl}
              className="rounded-xl max-w-[400px] min-h-[200px]"
              alt={product.catalogItem.name}
            />
          )}

          <Button
            title={`Buy Now $${product.catalogItem.amount}`}
            className="bg-primary rounded-full w-full text-background font-bold text-[18px]"
            onClick={handleAddToCart}
          />
        </div>

        <div className="flex flex-col items-start gap-2 max-w-[512px]">
          <h2 className="text-[55.78px] font-heading font-bold">
            {product.catalogItem.name}
          </h2>

          <p>{product.desc}</p>
          <hr className="w-full border-t border-gray-300/60 mt-4" />

          <div className="flex flex-col md:flex-row items-start mt-5 gap-10">
            {about.map((ab, index) => (
              <div key={index} className="flex flex-col items-center">
                <img src={ab.icon} alt={ab.label} />
                <p className="text-center">{ab.label}</p>
              </div>
            ))}
          </div>

          <hr className="w-full border-t border-gray-300/60 mt-4" />

          <div className="mt-5 flex flex-col items-start">
            <h3 className="text-[24.14px] font-bold">About the Product</h3>
            <p>{product.catalogItem.aboutProduct}</p>
          </div>
        </div>
      </div>
      <hr className="w-full border-t border-gray-300/60 mt-10" />

      <div className="flex items-center justify-center w-full text-primary py-5">
        <p>Powered by RapidBy</p>
      </div>
    </div>
  );
};

export default SingleProduct;
