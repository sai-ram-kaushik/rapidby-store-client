import React from "react";

const Footer = ({ footer }) => {
  const { links, socials } = footer;
  return (
    <div className="w-full bg-[#C685D6] px-5 md:px-10">
      <div className="flex flex-col items-center justify-center w-full py-5 gap-2">
        <div className="flex items-center gap-5">
          {links.map((link, index) => {
            return (
              <ul key={index} className="text-[16px]">
                <li>{link.label}</li>
              </ul>
            );
          })}
        </div>

        <div className="flex items-center gap-5">
          {socials.map((social, index) => {
            return (
              <a href={social.link} target="blank">
                <div className="bg-background rounded-full p-3" key={index}>
                  <img src={social.icon} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
