import React from "react";
import Button from "../utils/Button";
import { ReactTyped } from "react-typed";
import data from "../data/landing-page.json";
import AboutUs from "../components/AboutUs";
import RapidHub from "../components/RapidHub";
import Features from "../components/Features";
import PlatformDetails from "../components/PlatformDetails";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/Faq";
import Subscribe from "../components/Subscribe";
import { Link } from "react-router-dom";

const Home = ({ home }) => {
  const {
    boxImage,
    boxTitle,
    heading,
    subHeading,
    categories,
    buttonTitle,
    Image,
  } = home;
  return (
    <>
      <div className="bg-background w-full py-10 px-5 md:px-10 rounded-br-[50px] md:rounded-br-[100px] rounded-bl-[50px] md:rounded-bl-[100px]">
        <div className="flex flex-col md:flex-row items-start justify-center gap-10">
          {/* left side */}
          <div className="flex flex-col items-start gap-2">
            <div className="bg-primary p-2 max-w-[308px] rounded-full text-background flex items-center gap-2">
              <img src={boxImage} />
              <p className="font-heading font-semibold">{boxTitle}</p>
            </div>

            <div className="max-w-[644px] text-primary">
              <h1 className="text-[40px] md:text-[80px] font-bold leading-[3rem] md:leading-[96px]">
                {heading} <br /> Lets{" "}
                <span className="bg-gradient-to-r from-[#DA57AA] to-[#EF7447] bg-clip-text text-transparent">
                  <ReactTyped
                    strings={["monetize it!", "build it!"]}
                    typeSpeed={60}
                    backSpeed={50}
                    loop
                  />
                </span>
              </h1>
            </div>

            <div className="flex flex-col items-start gap-2">
              <h3 className="text-[20px] md:text-[40px] font-medium text-primary">
                {subHeading}
              </h3>
              <div className="flex flex-wrap gap-5 items-center text-primary">
                {categories.map((category, index) => {
                  return (
                    <div
                      key={index}
                      className="p-4 border border-primary flex items-center gap-2 rounded-xl"
                    >
                      <img src={category.icon} />
                      <p>{category.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <Link to="/login">
              <Button
                title={buttonTitle}
                className="px-6 py-3 bg-[#502274] text-background text-xl font-heading mt-5"
              />
            </Link>
          </div>

          {/* image side */}
          <div>
            <img src={Image} width={600} height={600} />
          </div>
        </div>
      </div>

      <AboutUs aboutUs={data.aboutUs} />
      <RapidHub />
      <Features features={data.features} />
      <PlatformDetails platformDetails={data.platformDetails} />
      <Testimonials testimonials={data.testimonials} />
      <FAQ />
      <Subscribe />
    </>
  );
};

export default Home;
