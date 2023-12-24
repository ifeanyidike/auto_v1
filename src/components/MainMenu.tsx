import React, { useState } from "react";
import { currentTheme } from "~/colors";
import Logo from "~/commons/icons/Logo";
import MenuToggle from "~/commons/icons/MenuToggle";

const MainMenu = () => {
  const [openMenu, toggleMenu] = useState(false);
  return (
    <div className="relative flex h-20  items-center gap-10 pl-14 max-lg:justify-between max-lg:pr-14">
      <Logo />
      <div
        className={`text-${
          currentTheme.lightText
        }  flex flex-[0.8] justify-center gap-14 text-sm font-normal max-lg:${
          openMenu ? "flex" : "hidden"
        } max-lg:absolute max-lg:left-1/2 max-lg:top-20 max-lg:flex-col max-lg:items-center max-lg:gap-5`}
      >
        <span
          className={`cursor-pointer hover:font-semibold hover:text-[${currentTheme.active}] hover:border-b hover:border-[${currentTheme.deepText}]`}
        >
          Home
        </span>
        <span
          className={`cursor-pointer hover:font-semibold hover:text-[${currentTheme.active}] hover:border-b hover:border-[${currentTheme.deepText}]`}
        >
          Services
        </span>
      </div>
      <div
        className="hidden cursor-pointer max-lg:flex"
        onClick={() => toggleMenu(!openMenu)}
      >
        <MenuToggle />
      </div>
    </div>
  );
};

export default MainMenu;
