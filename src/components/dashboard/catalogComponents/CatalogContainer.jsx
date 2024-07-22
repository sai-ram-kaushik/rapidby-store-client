import React, { useEffect, useState } from "react";
import searchIcon from "/dashboardIcons/search.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDebounce } from "../../hooks/useDebounce";

const CatalogContainer = ({ loggedInUserID }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT_URI}/api/admin/get-all-catalogs`)
      .then((response) => {
        const allProducts = response.data.data;
        const userAddedProducts =
          JSON.parse(localStorage.getItem(`addedProducts_${loggedInUserID}`)) ||
          [];
        const updatedProducts = allProducts.map((product) => ({
          ...product,
          added: userAddedProducts.includes(product._id),
        }));
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
      })
      .catch((error) => {
        console.log("Error while fetching", error);
      });
  }, [loggedInUserID]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [debouncedSearchQuery, products]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleAddProduct = (product) => {
    axios
      .post(
        `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/add-product`,
        {
          catalogId: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        const userAddedProducts =
          JSON.parse(localStorage.getItem(`addedProducts_${loggedInUserID}`)) ||
          [];
        if (!userAddedProducts.includes(product._id)) {
          userAddedProducts.push(product._id);
          localStorage.setItem(
            `addedProducts_${loggedInUserID}`,
            JSON.stringify(userAddedProducts)
          );
        }

        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p._id === product._id ? { ...p, added: true } : p
          )
        );

        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("Error adding product", error);
      });
  };

  const handleRemoveProduct = (product) => {
    axios
      .post(
        `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/remove-product-from-myproduct`,
        {
          id: product._id,
          storeAdminId: loggedInUserID,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        const userAddedProducts =
          JSON.parse(localStorage.getItem(`addedProducts_${loggedInUserID}`)) ||
          [];
        const updatedAddedProducts = userAddedProducts.filter(
          (id) => id !== product._id
        );
        localStorage.setItem(
          `addedProducts_${loggedInUserID}`,
          JSON.stringify(updatedAddedProducts)
        );

        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p._id === product._id ? { ...p, added: false } : p
          )
        );

        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("Error removing product", error);
      });
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <div className="flex flex-col items-start justify-start w-full bg-background p-5 rounded-lg gap-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-4">Product Catalog</h1>
        </div>

        <div className="flex items-center justify-between w-full flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Link to="/store-admin/dashboard/products">
              <p>My Products</p>
            </Link>
            <p>Catalog</p>
          </div>

          <div className="flex w-full md:w-auto bg-gray-100 p-2 rounded-xl">
            <img src={searchIcon} alt="Search Icon" className="w-5 h-5"/>
            <input
              type="search"
              className="bg-transparent outline-none w-full md:w-auto ml-2"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-5">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="card w-full sm:w-60 md:w-72 lg:w-80 shadow-xl bg-transparent relative cursor-pointer"
              onMouseEnter={() => handleProductClick(product)}
              onMouseLeave={() => setSelectedProduct(null)}
            >
              <figure>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image w-full h-40 object-cover"
                />
              </figure>
              <div className="card-body flex flex-col items-start p-4">
                <h2 className="card-title text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">#{product._id.slice(14, 20)}</p>
                <p className="text-sm text-gray-500">Amount: ${product.amount}</p>
                {selectedProduct &&
                  selectedProduct._id === product._id &&
                  (!product.added ? (
                    <button
                      className="absolute bottom-4 right-4 btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event propagation
                        handleAddProduct(product);
                      }}
                    >
                      Add to My Product
                    </button>
                  ) : (
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <span className="text-green-500 font-bold">Added</span>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event propagation
                          handleRemoveProduct(product);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogContainer;
