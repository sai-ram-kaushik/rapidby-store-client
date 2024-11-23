// import React, { useState } from "react";

// const Footer = ({ footer }) => {
//   const { links, socials } = footer;
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const togglePopup = () => {
//     setIsPopupOpen(!isPopupOpen);
//   };

//   return (
//     <>
//       {/* Main Body Content */}
//       <div
//         className={`w-full bg-[#C685D6] px-5 md:px-10 ${isPopupOpen ? "blur-sm" : ""}`}
//       >
//         <div className="flex flex-col items-center justify-center w-full py-5 gap-2">
//           <div className="flex items-center gap-5">
//             {links.map((link, index) => (
//               <ul key={index} className="text-[16px]">
//                 <li>
//                   {link.label === "Privacy Policy" ? (
//                     <button onClick={togglePopup} className="underline">
//                       {link.label}
//                     </button>
//                   ) : (
//                     link.label
//                   )}
//                 </li>
//               </ul>
//             ))}
//           </div>

//           <div className="flex items-center gap-5">
//             {socials.map((social, index) => (
//               <a
//                 href={social.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 key={index}
//               >
//                 <div className="bg-background rounded-full p-3">
//                   <img src={social.icon} alt={`social-icon-${index}`} />
//                 </div>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Popup Component */}
//       {isPopupOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg mx-auto">
//             <button
//               className="absolute top-2 right-2 text-xl font-bold text-gray-700"
//               onClick={togglePopup}
//             >
//               &times;
//             </button>
//             <h2 className="text-lg font-semibold mb-4 font-heading ">
//               Privacy Policy
//             </h2>
//             <ul role="list" className="marker:text-secondary list-disc">
//               <li>
//                 Rapidby collects necessary user information such as name, email,
//                 and payment details to facilitate account creation and order
//                 processing.
//               </li>
//               <li>
//                 User data is securely stored and used only for providing Rapidby
//                 services. It is not shared with third parties without consent.
//               </li>
//               <li>
//                 Rapidby's privacy practices comply with applicable data
//                 protection laws.
//               </li>
//               <li>
//                 Users have the right to access, update, or delete their personal
//                 information from Rapidby's systems.
//               </li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Footer;

import React, { useState } from "react";

const Footer = ({ footer }) => {
  const { links, socials } = footer;

  // State to manage popup visibility and content
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  // Toggle popup and set content
  const togglePopup = (content = "") => {
    setPopupContent(content);
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      {/* Main Body Content */}
      <div
        className={`w-full bg-[#C685D6] px-5 md:px-10 ${isPopupOpen ? "blur-sm" : ""}`}
      >
        <div className="flex flex-col items-center justify-center w-full py-5 gap-2">
          <div className="flex items-center gap-5">
            {links.map((link, index) => (
              <ul key={index} className="text-[16px]">
                <li>
                  {["Privacy Policy", "Terms of Use", "Refund Policy"].includes(
                    link.label
                  ) ? (
                    <button
                      onClick={() => togglePopup(link.label)}
                      className="underline hover:text-gray-700"
                    >
                      {link.label}
                    </button>
                  ) : (
                    link.label
                  )}
                </li>
              </ul>
            ))}
          </div>

          <div className="flex items-center gap-5">
            {socials.map((social, index) => (
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <div className="bg-background rounded-full p-3">
                  <img src={social.icon} alt={`social-icon-${index}`} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Component */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg mx-auto">
            <button
              className="absolute top-2 right-2 text-xl font-bold text-gray-700"
              onClick={() => togglePopup()}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">{popupContent}</h2>
            <p>
              {popupContent === "Privacy Policy" && (
                <>
                  <ul role="list" className="marker:text-secondary list-disc">
                    <li>
                      Rapidby collects necessary user information such as name,
                      email, and payment details to facilitate account creation
                      and order processing.
                    </li>
                    <li>
                      User data is securely stored and used only for providing
                      Rapidby services. It is not shared with third parties
                      without consent.
                    </li>
                    <li>
                      Rapidby's privacy practices comply with applicable data
                      protection laws.
                    </li>
                    <li>
                      Users have the right to access, update, or delete their
                      personal information from Rapidby's systems.
                    </li>
                  </ul>
                </>
              )}
              {popupContent === "Terms of Use" && (
                <>
                  <ul role="list" className="marker:text-secondary list-disc">
                    <li>
                      By using Rapidby's platform, users agree to these Terms of
                      Use and Rapidby's Privacy Policy.
                    </li>
                    <li>
                      Rapidby grants users a non-exclusive, non-transferable
                      license to use the platform for creating and selling their
                      own branded products.
                    </li>
                    <li>
                      Users are responsible for ensuring their designs and
                      products do not infringe on any copyrights, trademarks, or
                      other intellectual property rights.
                    </li>
                    <li>
                      Rapidby reserves the right to suspend or terminate user
                      accounts for violations of these terms
                    </li>
                    <li>
                      These terms are governed by the laws of the jurisdiction
                      where Rapidby is headquartered.
                    </li>
                  </ul>
                </>
              )}
              {popupContent === "Refund Policy" && (
                <>
                  <ul role="list" className="marker:text-secondary list-disc">
                    <li>
                      Rapidby offers a 14-day money-back guarantee on all
                      purchases.
                    </li>
                    <li>
                      Customers can request a full refund within 14 days of
                      their purchase by contacting Rapidby support.
                    </li>
                    <li>
                      Users are responsible for ensuring their designs and
                      products do not infringe on any copyrights, trademarks, or
                      other intellectual property rights.
                    </li>
                    <li>
                      Refunds will be processed within 5-7 business days of
                      receiving the request.
                    </li>
                    <li>
                      Custom or personalized products may be ineligible for
                      refunds after production has begun.
                    </li>
                  </ul>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
