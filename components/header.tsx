import { BellIcon, SearchIcon } from "@heroicons/react/solid";

import Image from "next/image";
import BasicMenu from "./basic-menu";
import { menueItems } from "@/constants/stite";
import Link from "next/link";
import HeaderWrapper from "./header-wrapper";
import UserProfile from "./user-profile";

function Header() {
  return (
    <HeaderWrapper>
      <div>
        <div className="flex items-center space-x-2 md:space-x-10">
          <Link href="/">
            <Image
              src="https://rb.gy/ulxxee"
              width={100}
              height={32}
              alt={"logo"}
              className="cursor-pointer object-contain"
            />
          </Link>

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

        <UserProfile />
      </div>
    </HeaderWrapper>
  );
}

export default Header;
