import { Inter } from "@next/font/google";
import axios from "axios";
import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import NoResults from "../components/NoResults";
import Upload from "../components/Upload";
import VideoCard from "../components/VideoCard";
import useAuthStore from "../store/authStore";
import { NEXT_PUBLIC_BASE_URL } from "../utils";
import { PostProps } from "../utils/types";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";

type HomeProps = {
  videos: PostProps[];
};

export default function Home({ videos }: HomeProps) {
  const { uploadPage, setUploadPage } = useAuthStore();

  return (
    <div className="flex flex-col gap-10 videos h-full">
      <XyzTransition xyz="fade down">
        {uploadPage && (
          <div>
            <Upload />
            <button
              className="absolute top-24 right-4 md:right-[2%]"
              onClick={() => setUploadPage(!uploadPage)}
            >
              <ImCancelCircle className="cursor-pointer w-[20px] h-[20px]" />
            </button>
          </div>
        )}
      </XyzTransition>

      {!uploadPage && (
        <>
          {videos.length ? (
            videos.map((video: PostProps) => (
              <VideoCard post={video} key={video._id} />
            ))
          ) : (
            <NoResults />
          )}
          <button
            className="absolute bottom-4 right-2"
            onClick={() => setUploadPage(!uploadPage)}
          >
            <BsPlusCircle className="w-[30px] h-[30px]" />
          </button>
        </>
      )}
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/post`);

  return {
    props: {
      videos: data,
    },
  };
};
