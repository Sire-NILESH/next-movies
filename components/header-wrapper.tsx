"use client";

import { PropsWithChildren, useEffect, useState } from "react";

const HeaderWrapper = ({ children }: PropsWithChildren) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // upon scroll change the color of the header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    //   cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>{children}</header>
  );
};

export default HeaderWrapper;
