import React, { useEffect, useState } from "react";
import Button from "@/utils/Button";
import axios from "axios";

const CustomDesignContainer = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/get-all-catalogs`
      )
      .then((repsonse) => {
        setProductData(repsonse.data.data);
      });
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="w-full">
      <div className="bg-background rounded-xl p-5 w-full">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-[20px] font-heading font-normal">
            Custom Designs
          </h2>

          <div className="flex items-center gap-5">
            <button>Sort By</button>
            <Button
              title="Get New Design"
              className="bg-[#502274] text-background"
            />
          </div>
        </div>

        <div className="w-full mt-5">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Request ID</th>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Estimated Time</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleProductClick(item)}
                >
                  <td className="py-4 px-4 text-center">
                    #{item._id.slice(0, 7)}
                  </td>
                  <td className="flex items-center py-4 px-4 justify-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded mr-4"
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className="py-4 px-4 text-center">{item.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center p-4">
            <span>Page 1 of 3 (Showing 1-1)</span>
            <div>
              <button className="py-1 px-4 border rounded mr-2">
                Previous
              </button>
              <button className="py-1 px-4 border rounded">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      {isChatOpen && (
        <div className="fixed bottom-0 right-0 w-80 h-[400px] bg-white shadow-lg rounded-t-lg flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-10 h-10 object-cover rounded mr-3"
              />
              <div>
                <h3 className="text-lg">{selectedProduct.name}</h3>
                <p className="text-sm text-gray-500">
                  Ticket ID: {selectedProduct._id.slice(0, 7)}
                </p>
              </div>
            </div>
            <button onClick={closeChat} className="text-gray-500">
              &times;
            </button>
          </div>
          <div className="flex-1 p-4">
            <div className="flex flex-col space-y-4">
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <p>
                  I want a design for this shoe, in my branding with the best
                  look.
                </p>
                <p>A background with plain background with white texture.</p>
                <span className="text-xs text-gray-200">Jan 12 - 2:23 pm</span>
              </div>
              {/* More messages can be added here */}
            </div>
          </div>
          <div className="border-t p-4 flex items-center">
            <input
              type="text"
              placeholder="Type here..."
              className="flex-1 p-2 border rounded-l-lg"
            />
            <button className="bg-purple-700 text-white p-2 rounded-r-lg">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDesignContainer;
