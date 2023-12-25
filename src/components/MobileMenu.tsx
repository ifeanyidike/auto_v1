import { useHookstate } from "@hookstate/core";
import React from "react";
import CloseIcon from "~/commons/icons/CloseIcon";
import { toggleNav } from "~/states/utility";
import Button from "./Button";
import { colors } from "~/colors";

const MobileMenu = () => {
  return (
    <div
      className={`absolute right-0 top-0 hidden h-screen w-4/5 flex-col gap-12 bg-white px-7 py-8 text-lg transition-all duration-300 ease-in-out max-lg:flex`}
    >
      <button
        onClick={() => toggleNav.set(false)}
        className="border-none bg-transparent outline-none"
      >
        <CloseIcon />
      </button>

      <span className="cursor-pointer">Home</span>
      <span className="cursor-pointer">Services</span>

      <Button
        hasGradient={false}
        hasShadow={false}
        bgColor={colors.dark}
        text="GET AN ESTIMATE"
      />
    </div>
  );
};

export default MobileMenu;
