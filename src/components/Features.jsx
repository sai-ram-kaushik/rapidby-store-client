import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Features = ({ features }) => {
  const { title, content, storeCreateImage, accordionItems } = features;

  const [selectedFeature, setSelectedFeature] = useState({
    image: storeCreateImage,
    title,
    content,
  });

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="bg-[#E2C2E6] py-10 px-5 md:px-10 w-full">
      <div
        className="flex flex-col-reverse md:flex-row items-center md:items-start justify-center w-full gap-10 md:gap-20"
        data-aos="fade-right"
      >
        <div className="max-w-[668px]">
          <img src={selectedFeature.image} alt="Selected feature" />
        </div>

        <div className="flex flex-col items-start gap-4 max-w-[666px]">
          <div className="flex flex-col items-start gap-2">
            <h3 className="text-[27px] md:text-[56px] text-[#48246C] font-bold">
              {title}
            </h3>
            <p className="text-[#48246C99] text-[16px] md:text-[24px]">
              {content}
            </p>
          </div>
          <div className="w-full">
            {accordionItems.map((item, index) => (
              <div key={index} className="mb-4 md:min-w-[668px]">
                <button
                  onClick={() => setSelectedFeature(item)}
                  className="w-full text-left p-4 bg-transparent text-[#48246C] rounded-lg border border-secondary focus:outline-none"
                >
                  <h4 className="text-[20px] font-semibold">{item.title}</h4>
                  {selectedFeature.title === item.title && (
                    <p className="text-[16px] mt-2">{item.content}</p>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
