import React from "react";

const Footer = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <div className="flex flex-wrap gap-2">
        <p className="text-gray-dark cursor-pointer text-sm hover:underline mr-3">
          About
        </p>
        <p className="text-gray-dark cursor-pointer text-sm hover:underline mr-3">
          Contact Us
        </p>
        <p className="text-gray-dark cursor-pointer text-sm hover:underline mr-3">
          Support
        </p>
        <p className="text-gray-dark cursor-pointer text-sm hover:underline mr-3">
          About
        </p>
        <p className="text-gray-dark text-sm mt-3">2022 Llama Technologies</p>
      </div>
    </div>
  );
};

export default Footer;
