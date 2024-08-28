import React from "react";
import faq from "/faq.svg";

const FAQ = ({ faqQuestion }) => {
  const { questions } = faqQuestion;
  return (
    <div className="w-full  bg-[#E2C2E6] relative">
      <img src={faq} className="absolute w-full top-[-100px] hidden md:block" />
      <div className="flex flex-col items-center justify-center w-full px-5 md:px-10 py-10  md:py-20">
        <h3 className="text-[58px] text-[#48246C] font-bold">
          Frequently Asked Questions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-3 mt-4">
          {questions.map((list, index) => {
            return (
              <div
                className="collapse collapse-plus bg-[#48246C] text-background"
                key={index}
              >
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                  {list.question}
                </div>
                <div className="collapse-content">
                  <p>{list.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
