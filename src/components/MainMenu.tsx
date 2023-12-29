import React from "react";
import Logo from "~/commons/icons/Logo";
import MenuToggle from "~/commons/icons/MenuToggle";
import { useHookstate } from "@hookstate/core";
import { toggleNav } from "~/states/utility";
import Link from "next/link";
import Button from "./Button";

const MainMenu = () => {
  const navOpen = useHookstate(toggleNav);
  return (
    <div className="relative flex h-20 items-center gap-10 pl-14 max-lg:justify-between max-lg:pr-14">
      <Link href={"/#"}>
        <Logo />
      </Link>

      <div
        className={`flex flex-initial gap-14 text-sm font-normal text-content-light max-lg:hidden`}
      >
        <span
          className={`cursor-pointer hover:border-b hover:border-content-normal hover:font-semibold hover:text-accent-1`}
        >
          <Link href={"/#"}>Home</Link>
        </span>
        <span
          className={`cursor-pointer hover:border-b hover:border-content-normal hover:font-semibold hover:text-accent-1`}
        >
          <Link href={"/services"}> Services</Link>
        </span>
      </div>
      <div className="ml-auto mr-10 flex gap-3 max-lg:hidden">
        <div className="flex flex-col gap-0">
          <span className="text-[0.7rem]">Call us for a free estimate</span>
          <span className="text-lg font-bold text-content-light">
            <a href="tel:+23412838478">(234)12838478</a>
          </span>
        </div>
        <Button
          hasGradient={false}
          hasShadow={false}
          bgColor="bg-dark"
          text="GET AN ESTIMATE"
        />
      </div>
      <div
        className="hidden cursor-pointer max-lg:flex"
        onClick={() => toggleNav.set(!navOpen.get())}
      >
        <MenuToggle />
      </div>
    </div>
  );
};

export default MainMenu;
