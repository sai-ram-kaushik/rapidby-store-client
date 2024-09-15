import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

const AddCatalogPopup = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [aboutProduct, setAboutProduct] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT_URI}/api/admin/get-all-categories`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log("Fetching categories failed", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      console.error("Category is not selected");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("amount", amount);
    formData.append("quantity", quantity);
    formData.append("aboutProduct", aboutProduct);
    for (const file of fileInputRef.current.files) {
      formData.append("imageUrl", file);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT_URI}/api/admin/create-catalog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onClose(); // Close the popup after successful submission
    } catch (error) {
      console.error(
        "Product adding failed: ",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="popup md:min-w-[1080px]">
      <div className="flex w-full justify-between">
        <h2 className="text-[24px] text-secondary font-bold">Add Product</h2>
        <button onClick={onClose}>Close</button>
      </div>

      <div className="mt-10 flex items-start w-full">
        <form
          className="flex flex-col items-start gap-5 w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-10 w-full">
            <div className="flex flex-col items-start w-full">
              <label className="text-secondary font-semibold">Name</label>
              <input
                type="text"
                className="w-full border-2 px-2 py-3 rounded-xl outline-none"
                placeholder="Name of the product"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-10 w-full">
            <div className="flex flex-col items-start w-full">
              <label className="text-secondary font-semibold">Category</label>
              <select
                className="w-full border-2 bg-transparent px-2 py-3 rounded-xl outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((categoryItem, index) => (
                  <option key={index} value={categoryItem.name}>
                    {categoryItem.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-start w-full">
              <label className="text-secondary font-semibold">Quantity</label>
              <input
                type="number"
                className="w-full border-2 px-2 py-3 rounded-xl outline-none"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-10 w-full">
            <div className="flex flex-col items-start w-full">
              <label className="text-secondary font-semibold">
                Image of the Product (Only 3 images)
              </label>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                className="w-full border-2 px-2 py-3 rounded-xl outline-none"
              />
            </div>

            <div className="flex items-start flex-col w-full">
              <label className="text-secondary font-semibold">Amount</label>
              <input
                type="number"
                className="w-full border-2 px-2 py-3 rounded-xl outline-none"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex items-start flex-col w-full">
            <label className="text-secondary font-semibold">
              About the Product
            </label>
            <input
              type="text"
              className="w-full border-2 px-2 py-3 rounded-xl outline-none"
              placeholder="About the Product"
              value={aboutProduct}
              onChange={(e) => setAboutProduct(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-secondary text-background rounded-lg py-[8px] px-[24px]"
            disabled={isLoading}
          >
            {isLoading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCatalogPopup;
