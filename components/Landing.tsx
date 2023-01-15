import React from "react";
import Image from "next/image";
import logo from "../utils/nest-logo.png";
import { GoogleLogin } from "@react-oauth/google";
import { fetchUser } from "../utils";
import useAuthStore from "../store/authStore";

const Landing = () => {
  const { addUser } = useAuthStore();

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className="w-[150px] md:w-[150px]">
        <Image
          className="cursor-pointer mb-4"
          src={logo}
          alt="Nest"
          layout="responsive"
        />
      </div>
      <GoogleLogin
        size="medium"
        shape="pill"
        text="signin"
        onSuccess={(response) => fetchUser(response, addUser)}
        onError={() => {
          console.log("error");
        }}
      />
    </div>
  );
};

export default Landing;
