import React, { useState } from "react";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { googleLogout } from "@react-oauth/google";
import useAuthStore from "../store/authStore";
import "@animxyz/core";
import { XyzTransition, XyzTransitionGroup } from "@animxyz/react";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { userProfile, removeUser } = useAuthStore();

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center lg:justify-start cursor-pointer font-semibold text-green-prime rounded";

  return (
    <div>
      <XyzTransition appear xyz="flip-up">
        <div
          className="block lg:hidden m-2 ml-4 mt-3 text-xl"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          {showSidebar ? (
            <ImCancelCircle className="cursor-pointer" />
          ) : (
            <BsFillArrowRightCircleFill className="mt-4 cursor-pointer" />
          )}
        </div>
      </XyzTransition>
      <XyzTransitionGroup appear xyz="fade left">
        {showSidebar && (
          <div className="lg:w-400 w-20 flex flex-col justify-start  mb-10 border-r-2 border-gray-light lg:border-0 p-3 animate-in slide-in-from-left-5 animate-out slide-out-to-left-0">
            <div className="lg:border-b-2 border-gray-light lg:pb-4">
              <Link href="/">
                <div className={normalLink}>
                  <p className="text-2xl">
                    <AiFillHome />
                  </p>
                  <span className="text-xl hidden lg:block">For You</span>
                </div>
              </Link>
            </div>

            <Discover />
            {userProfile && (
              <button
                className="self-center font-bold text-2xl lg:text-md mb-4 cursor-pointer rounded lg:hidden"
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
            {userProfile && (
              <button
                className="text-2xl cursor-pointer border-2 border-black bg-green-prime justify-center items-center rounded-2xl hidden lg:flex p-2 my-6 hover:bg-white hover:text-green-prime hover:border-green-prime"
                type="button"
                onClick={() => {
                  googleLogout();
                  removeUser();
                }}
              >
                Logout
              </button>
            )}
            <Footer />
          </div>
        )}
      </XyzTransitionGroup>
    </div>
  );
};

export default Sidebar;
