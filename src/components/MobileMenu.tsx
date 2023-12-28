"use client";
import React from "react";
import CloseIcon from "~/commons/icons/CloseIcon";
import { toggleNav } from "~/states/utility";
import Button from "./Button";
import { useHookstate } from "@hookstate/core";
import Link from "next/link";

const MobileMenu = () => {
  const navOpen = useHookstate(toggleNav);
  return (
    <>
      {navOpen.get() && (
        <div
          className={`absolute right-0 top-0 hidden h-screen w-4/5 flex-col gap-12 bg-white px-7 py-8 text-lg transition-all duration-300 ease-in-out max-lg:flex`}
        >
          <button
            onClick={() => toggleNav.set(false)}
            className="border-none bg-transparent outline-none"
          >
            <CloseIcon />
          </button>

          <Link href="/" className="cursor-pointer">
            Home
          </Link>
          <Link href="/services" className="cursor-pointer">
            Services
          </Link>

          <Button
            hasGradient={false}
            hasShadow={false}
            bgColor="bg-dark"
            text="GET AN ESTIMATE"
          />
        </div>
      )}
    </>
  );
};

export default MobileMenu;
