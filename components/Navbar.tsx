import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import logo from "../utils/nest-logo.png";
import { fetchUser } from "../utils";
import useAuthStore from "../store/authStore";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  const { userProfile, addUser } = useAuthStore();
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-light py-4 px-4">
      <Link href="/">
        <div className="w-[110px] md:w-[150px]">
          <Image
            className="cursor-pointer"
            src={logo}
            alt="Nest"
            layout="responsive"
          />
        </div>
      </Link>

      <div className="flex items-center">
        <div
          className={
            openSearch
              ? "flex border-2 border-gray-primary rounded-lg ease-in-out duration-300 py-1 pr-2 items-center justify-between transition-all mr-3"
              : "mr-3 cursor-pointer transition-all ease-in-out duration-300"
          }
        >
          <input
            placeholder="Search"
            className={
              openSearch
                ? userProfile
                  ? "text-sm md:text-lg pl-3 w-28 smd:w-40 sm:w-56 focus:outline-none"
                  : "text-sm md:text-lg pl-3 w-20 smd:w-28 sm:w-56 focus:outline-none"
                : "hidden"
            }
          />
          <button
            className={
              openSearch ? "focus:outline-none" : "focus:outline-none pt-2"
            }
            onClick={() => {
              setOpenSearch(!openSearch);
            }}
          >
            <BsSearch />
          </button>
        </div>

        {userProfile ? (
          <>
            {userProfile.image && (
              <Link href="/UserProfile">
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full aspect-square cursor-pointer"
                    loader={() => userProfile.image}
                    src={userProfile.image}
                    alt="profile picture"
                  />
                </>
              </Link>
            )}
          </>
        ) : (
          <GoogleLogin
            size="medium"
            shape="pill"
            text="signin"
            onSuccess={(response) => fetchUser(response, addUser)}
            onError={() => {
              console.log("error");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;

// change logout to have settings screen? not on navbar
// upload button change to side bar or right above posts
