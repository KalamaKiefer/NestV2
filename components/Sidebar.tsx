import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import useAuthStore from "../store/authStore";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { userProfile, removeUser } = useAuthStore();

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-green-prime rounded";

  return (
    <div>
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl ease-in-out duration-500"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? (
          <ImCancelCircle className="cursor-pointer" />
        ) : (
          <BsFillArrowRightCircleFill className="mt-4 cursor-pointer" />
        )}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start  mb-10 border-r-2 border-gray-light xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-light xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">For You</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-dark">
                Log in to like and comment on videos
              </p>
              <div className="pr-4">
                <button className="bg-white text-lg text-green-prime border-[1px] border-green-prime font-semibold px-6 py-2 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-green-prime duration-200 ease-in-out">
                  Log In
                </button>
              </div>
            </div>
          )}

          <Discover />
          {userProfile && (
            <button
              className="self-center font-bold text-2xl xl:text-md mb-4 cursor-pointer rounded"
              type="button"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <ImExit />
            </button>
          )}

          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
