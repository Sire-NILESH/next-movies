import { BellIcon, SearchIcon } from "@heroicons/react/solid";

import { menueItems } from "@/constants/stite";
import Link from "next/link";
import BasicMenu from "./basic-menu";
import HeaderWrapper from "./header-wrapper";
import AvatarMenu from "./avatar-menu";
import Logo from "./logo";

function Header() {
  return (
    <HeaderWrapper>
      <div>
        <div className="flex items-center space-x-2 md:space-x-10">
          <Logo />

          <BasicMenu />

          <ul className="hidden space-x-4 md:flex">
            {menueItems.map((menuItem, i) => (
              <Link href={menuItem.path} key={i}>
                <li className="text-shadow-md">{menuItem.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light text-shadow-md">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />

        <AvatarMenu />
      </div>
    </HeaderWrapper>
  );
}

export default Header;
