import { Inter } from "@next/font/google";
import axios from "axios";
import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import NoResults from "../components/NoResults";
import Upload from "../components/Upload";
import VideoCard from "../components/VideoCard";
import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils";
import { Video } from "../utils/types";

const inter = Inter({ subsets: ["latin"] });

type HomeProps = {
  videos: Video[];
};

export default function Home({ videos }: HomeProps) {
  const { uploadPage, setUploadPage } = useAuthStore();

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {uploadPage ? (
        <>
          <Upload />
          <button
            className="absolute top-24 right-4 md:right-[2%]"
            onClick={() => setUploadPage(!uploadPage)}
          >
            <ImCancelCircle className="cursor-pointer w-[20px] h-[20px]" />
          </button>
        </>
      ) : (
        <>
          {videos.length ? (
            videos.map((video: Video) => (
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
  const { data } = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: {
      videos: data,
    },
  };
};
