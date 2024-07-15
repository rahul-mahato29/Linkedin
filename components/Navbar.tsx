import Image from "next/image";
import React from "react";
import SearchInput from "./SearchInput";
import NavItems from "./NavItems";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <div className="border-2 border-black fixed w-full bg-white z-50">
      <div className="flex items-center max-w-6xl justify-between h-14 mx-auto px-3">
        <div className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={45}
            height={45}
            className="cursor-pointer"
          />
          <div className="md:block hidden">
            <SearchInput />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="md:block hidden">
            <NavItems />
          </div>
          <div>
            <SignedOut>
              <Button
                variant="outline"
                className="rounded-full text-gray-600 hover:text-black"
              >
                <SignInButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <div className="flex flex-col items-center">
                <UserButton />
                <div className="text-xs text-gray-600 flex items-center cursor-pointer">
                  <span>Me</span>
                  <Image
                    src={"/downArrow.png"}
                    alt="explore"
                    width={12}
                    height={12}
                  />
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
