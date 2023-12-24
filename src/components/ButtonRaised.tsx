import React from "react";
import { currentTheme } from "~/colors";

const ButtonRaised = () => {
  // hover:from-[#e60000] hover:to-[#ca0000]
  return (
    <button
      className={`shadow-right-bottom-md rounded-3xl bg-[#fc0] bg-gradient-to-l from-[#e60000] px-9 py-3 text-sm font-bold text-white transition-shadow duration-300 hover:to-[#ca0000] hover:shadow-none active:shadow-none`}
    >
      REQUEST APPOINTMENT
    </button>
  );
};

export default ButtonRaised;
