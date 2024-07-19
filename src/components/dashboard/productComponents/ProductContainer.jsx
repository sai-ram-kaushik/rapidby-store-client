import React, { useEffect, useState } from "react";
import Button from "../../../utils/Button";
import searchIcon from "/dashboardIcons/search.svg";
import AddCatalogPopUp from "./AddCatalogPopUp";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

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
        console.log(response.data.data);
      });
  }, []);

  return (
    <div className="flex flex-col items-start justify-start w-full bg-background p-5 rounded-lg gap-4">
      <div className="flex items-center justify-between mb-4 w-full">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-4">Products</h1>
        </div>
        
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-5">
          <Link to="/store/dashboard/products">
            <p>My Products</p>
          </Link>
          <Link to="/store-admin/dashboard/products/catalogs">
            <p>Catalog</p>
          </Link>
        </div>

        <div className="flex max-w-[290px] gap-2 bg-gray-100 p-2 rounded-xl">
          <img src={searchIcon} />
          <input
            type="search"
            className="bg-transparent outline-none"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold">Sort By:</p>
        <select className="mr-4 p-2 border rounded bg-transparent">
          <option>Status</option>
        </select>
        <select className="mr-4 p-2 border rounded bg-transparent">
          <option>Category</option>
        </select>
        <select className="mr-4 p-2 border rounded bg-transparent">
          <option>Stock</option>
        </select>
      </div>
      <table className="min-w-full bg-white">
        <thead>
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
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product, index) => (
              <tr className="bg-white border-b" key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-3 text-center"
                >
                  <img
                    src={product.catalogItem.imageUrl}
                    width={50}
                    height={50}
                  />
                  <p>{product.catalogItem.name}</p>
                </th>
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
              <td colSpan="7" className="text-center py-4">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <span>Page 1 of 3 (Showing 1-10)</span>
        <div>
          <button className="mr-2 p-2 border rounded">Previous</button>
          <button className="p-2 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
