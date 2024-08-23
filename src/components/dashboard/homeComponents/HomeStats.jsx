import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import data from "../../../data/Home.json";
import axios from "axios";

const HomeStats = () => {
  const { products } = data.sellingProducts.topSellingProduct;
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/get-products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTopProducts(response.data.data);
        console.log(response.data.data);
      });
  }, []);

  useEffect(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
    const revenueData = [0, 0, 0, 0, 0, 0, 0, 0];

    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: months,
          datasets: [
            {
              label: "Revenue",
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              data: revenueData,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 10000,
              max: 30000,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row items-start gap-4 w-full">
        <div className="lg:min-w-[586px] lg:min-h-[328px] bg-background rounded-lg p-6 w-full overflow-x-scroll">
          <div className="flex items-start">
            <h3 className="text-xl font-semibold">Revenue so far</h3>
          </div>
          <canvas ref={chartContainer}></canvas>
        </div>

        <div className="lg:min-w-[562px] lg:min-h-[328px] bg-background rounded-lg p-6 w-full">
          <div className="flex flex-col items-start w-full">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-xl font-semibold">Top selling product</h3>
              <p className="text-secondary cursor-pointer">See All &rarr; </p>
            </div>

            <div className="flex flex-col items-start gap-4 mt-4 w-full">
              {topProducts.slice(0, 4).map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center justify-between border w-full p-3 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={product.image}
                      alt={product.label}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <p className="max-w-[200px] text-base leading-6 text-secondary">
                      {product.label}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-2 md:mt-0">
                    <div className="flex flex-col items-start">
                      <p className="text-xs text-paraHelper">UNITS SOLD</p>
                      <p>{product.unitsSold} units</p>
                    </div>

                    <div className="flex flex-col items-start">
                      <p className="text-xs text-paraHelper">TOTAL SALES</p>
                      <p>{product.totalSales}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeStats;
