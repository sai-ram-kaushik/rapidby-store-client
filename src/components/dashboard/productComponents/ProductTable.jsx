import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import searchIcon from "/dashboardIcons/search.svg";
import Button from "@/utils/Button";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/get-products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data); // initialize filteredProducts
      });
  }, []);

  const isActiveTab = (path) => location.pathname === path;

  // Debounce function
  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  // Filter products based on search term
  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.catalogItem.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Apply debounce to search
  const debouncedSearch = useCallback(debounce(handleSearch, 500), [products]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedSearch(query); // Use debounced search
  };

  return (
    <div className="w-[350px] sm:w-full bg-background p-5 rounded-xl">
      <div className="flex items-start justify-between w-full">
        <h3 className="text-[14px] md:text-[20px] font-bold">Products</h3>

        <Link to="/store-admin/dashboard/products/catalogs">
          <button className="rounded-xl text-background bg-[#48246C] px-5 py-2">
            Add Product +
          </button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row items-start justify-between gap-5 mt-5">
        <div className="flex items-center gap-3">
          <Link
            to="/store-admin/dashboard/products"
            className={`${
              isActiveTab("/store-admin/dashboard/products")
                ? "bg-container p-2 rounded-xl"
                : ""
            }`}
          >
            My Products
          </Link>
          <Link
            to="/store-admin/dashboard/products/catalogs"
            className={`${
              isActiveTab("/store-admin/dashboard/products/catalogs")
                ? "font-bold text-blue-600"
                : "text-gray-600"
            }`}
          >
            Catalog
          </Link>
        </div>

        <div className="flex max-w-[290px] gap-2 bg-gray-100 p-2 rounded-xl">
          <img src={searchIcon} alt="Search" className="w-5 h-5" />
          <input
            type="search"
            className="bg-transparent outline-none w-full"
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange} // Handle input change with debounce
          />
        </div>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="min-w-full text-sm text-left bg-white">
          <thead className="text-xs uppercase bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-center">Product</th>
              <th className="py-2 px-4 text-center">Category</th>
              <th className="py-2 px-4 text-center">Stock</th>
              <th className="py-2 px-4 text-center">Amount</th>
              <th className="py-2 px-4 text-center">Quantity</th>
              <th className="py-2 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr className="bg-white border-b" key={index}>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.catalogItem.imageUrl}
                        alt={product.catalogItem.name}
                        className="w-12 h-12 object-cover"
                      />
                      <p>{product.catalogItem.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {product.catalogItem.category}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {product.catalogItem.status}
                  </td>
                  <td className="px-6 py-4 text-center">
                    ${product.catalogItem.amount}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {product.catalogItem.quantity}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
        <span>Page 1 of 3 (Showing 1-10)</span>
        <div className="flex gap-2 mt-2 md:mt-0">
          <button className="p-2 border rounded">Previous</button>
          <button className="p-2 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
