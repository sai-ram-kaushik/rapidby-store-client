import React from "react";
import faq from "/faq.svg";

const FAQ = () => {
  return (
    <div className="w-full  bg-[#E2C2E6] relative">
      <img src={faq} className="absolute w-full top-[-100px] hidden md:block"/>
      <div className="flex flex-col items-center justify-center w-full px-5 md:px-10 py-10  md:py-20">
        <h3 className="text-[58px] text-[#48246C] font-bold">
          Frequently Asked Questions
        </h3>

        <div className="flex flex-col md:flex-row items-center gap-5 py-10">
          <div className="collapse collapse-plus bg-[#48246C] text-background">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What is Rapidby and how does it work?
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-[#48246C] text-background">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              What is Creatopreneur and how does it work?
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-5 mt-5">
          <div className="collapse collapse-plus bg-[#48246C] text-background">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What is Rapidby and how does it work?
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-[#48246C] text-background">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              What is Rapidby and how does it work?
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-5 mt-5">
          <div className="collapse collapse-plus bg-[#48246C] text-background">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What is Rapidby and how does it work?
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-[#48246C] text-background">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              What is Rapidby and how does it work?
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
