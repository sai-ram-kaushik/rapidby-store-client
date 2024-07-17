import React, { useEffect } from "react";
import community from "/community.png";
import world from '/world.png'
import value from "/value.png";
import Aos from "aos";
import "aos/dist/aos.css";

const AboutUs = ({ aboutUs }) => {
  const {
    title,
    titleContent,
    noiceBg,
    boxTitle,
    boxContent,
    boxImage,
    recognitionImage,
  } = aboutUs;

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="w-full bg-primary px-5 md:px-10 py-10">
      <div
        className="flex flex-col items-center justify-center gap-5 w-full "
        data-aos="fade-right"
      >
        <div className="flex flex-col md:flex-row items-start justify-center gap-10 w-full">
          <div className="flex flex-col items-start gap-5 max-w-[644px] w-full">
            <h3 className="text-background text-[25px] md:text-[51px] font-semibold leading-[30px] md:leading-[61.2px]">
              {title}
            </h3>
            <p className="text-[12px] md:text-[24px] text-[#f9f9f9] font-heading">
              {titleContent}
            </p>
          </div>

          <div className="md:w-[644px] md:h-[403px] rounded-xl relative border">
            <img
              src={noiceBg}
              className="h-[403px] w-full rounded-xl"
              alt="Background"
            />
            <div className="absolute inset-0 flex flex-col items-start text-overlay px-[20px] md:px-[40px] py-10">
              <h3 className="text-white text-[24px] md:text-[48px] font-bold">
                {boxTitle}
              </h3>
              <p className="text-[10px] md:text-[20px] font-heading font-semibold max-w-[584px] text-background">
                {boxContent}
              </p>

              <div className="bg-primary p-2 max-w-[308px] rounded-full text-background hidden md:flex items-center gap-2 absolute bottom-10 z-10">
                <img src={boxImage} />
                <p className="font-heading font-semibold">{boxTitle}</p>
              </div>
            </div>
            <div className=" flex z-20">
              <img
                src={community}
                className="absolute bottom-0 right-[60px] "
                alt="Community 1"
                width={300}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-[644px] md:h-[403px] rounded-xl relative border">
            <img
              src={noiceBg}
              className="h-[403px] w-full rounded-xl"
              alt="Background"
            />

            <div className="absolute inset-0 flex flex-col items-start text-overlay px-[20px] md:px-[40px] py-10">
              <h3 className="text-white text-[35px] md:text-[48px] font-bold">
                Our Mission
              </h3>
              <p className="text-[20px] font-heading font-semibold max-w-[584px] text-background">
                Empowering Your Brand's Unique Vision. Pioneering Custom Product
                Solutions Globally.
              </p>

              <div>
                <img src={world} />
              </div>
            </div>
          </div>

          <div className="md:w-[644px] md:h-[403px] rounded-xl relative border">
            <img
              src={noiceBg}
              className="h-[403px] w-full rounded-xl"
              alt="Background"
            />

            <div className="absolute inset-0 flex flex-col items-start text-overlay px-[20px] md:px-[40px] py-10">
              <h3 className="text-white text-[35px] md:text-[48px] font-bold">
                Our Values
              </h3>
              <p className="text-[20px] font-heading font-semibold max-w-[584px] text-background">
                Guided by integrity, driven by innovation, making a positive
                impact.
              </p>

              <div>
                <img src={value} />
              </div>
            </div>
          </div>
        </div>

        <div className="py-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          <div className="max-w-[400px]">
            <div className="max-w-[400px]">
              <div className="w-[170px] h-[170px] md:w-[225px] md:h-[225px] ">
                <img
                  src={recognitionImage}
                  class="w-full rounded-full h-full"
                  alt="Background"
                />
              </div>
            </div>
          </div>
          <div className="max-w-[900px] flex flex-col items-start">
            <h3 className="text-[24px] md:text-[40px] font-bold text-center md:text-start text-background">
              Join the league of successful{" "}
              <span className="p-0 bg-gradient-to-r from-[#EF7447] to-[#DA57AA] bg-clip-text text-transparent">
                creatoprenuers
              </span>{" "}
              and make your name a{" "}
              <span className="text-secondary">BRAND!</span>
            </h3>

            <div className="flex items-center justify-center flex-wrap gap-4 py-5">
              <div className="md:w-[273px] md:h-[211px] rounded-xl relative border">
                <img
                  src={noiceBg}
                  className="h-[211px] w-full rounded-xl"
                  alt="Background"
                />

                <div className="absolute inset-0 flex flex-col items-start text-overlay px-[20px] md:px-[40px] py-10 text-background">
                  <h3 className="text-[48px] font-bold font-heading">1K+</h3>
                  <p className="text-[24px] font-bold">Active Clients</p>
                </div>
              </div>

              <div className="md:w-[273px] md:h-[211px] rounded-xl relative border">
                <img
                  src={noiceBg}
                  className="h-[211px] w-full rounded-xl"
                  alt="Background"
                />

                <div className="absolute inset-0 flex flex-col items-start text-overlay px-[20px] md:px-[40px] py-10 text-background">
                  <h3 className="text-[48px] font-bold font-heading">4.5</h3>
                  <p className="text-[24px] font-bold">Average rating</p>
                </div>
              </div>

              <div className="md:w-[273px] md:h-[211px] rounded-xl relative border">
                <img
                  src={noiceBg}
                  className="h-[211px] w-full rounded-xl"
                  alt="Background"
                />

                <div className="absolute inset-0 flex flex-col items-start text-overlay px-[20px] md:px-[40px] py-10 text-background">
                  <h3 className="text-[42px] md:text-[48px] font-bold font-heading">
                    10 mins
                  </h3>
                  <p className="text-[24px] font-bold">Setup Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
