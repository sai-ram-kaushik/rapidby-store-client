import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import data from "../../../data/Home.json";
const HomeStats = () => {
  const { products } = data.sellingProducts.topSellingProduct;
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
    const revenueData = [
      10000, 15000, 20000, 25000, 28000, 29000, 30000, 31000,
    ];

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
      <div className="flex flex-col md:flex-row items-start gap-2 w-full">
        <div className="md:min-w-[586px] md:min-h-[328px] bg-background rounded-lg p-[24px] w-full overflow-x-scroll">
          <div className="flex items-start">
            <h3 className="text-[24px] font-semibold">Revenue so far</h3>
          </div>
          <canvas ref={chartContainer}></canvas>
        </div>

        <div className="min-w-[562px] min-h-[328px] bg-background rounded-lg p-[24px] w-full">
          <div className="flex flex-col items-start w-full">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-[24px] font-semibold">Top selling product</h3>
              <p className="text-secondary">See All &rarr; </p>
            </div>

            <div className="flex flex-col items-start gap-4 mt-4 w-full">
              {products.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between border w-full p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <img src={product.image} />
                      <p className="max-w-[200px] text-[16px] leading-[21.82px] text-secondary">
                        {product.label}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-start">
                        <p className="text-[10px] text-paraHelper">
                          UNITS SOLD
                        </p>
                        <p>{product.unitsSold} units</p>
                      </div>

                      <div className="flex flex-col items-start">
                        <p className="text-[10px] text-paraHelper">
                          TOTAL SALES
                        </p>
                        <p>{product.totalSales}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeStats;
