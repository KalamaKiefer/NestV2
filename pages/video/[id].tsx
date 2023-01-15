import axios from "axios";
import React, { useRef, useState } from "react";
import { BASE_URL } from "../../utils";
import { Video } from "../../utils/types";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillArrowLeftCircleFill, BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Image from "next/image";
import useAuthStore from "../../store/authStore";
import Link from "next/link";

interface VideoProps {
  post: Video;
}

const VideoPage = ({ post }: VideoProps) => {
  const [posts, setPost] = useState(post);
  const [isPlaying, setIsPlaying] = useState(false);
  const { userProfile } = useAuthStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  if (!post) return null;

  return (
    <div className="flex lg:flex-col w-full fixed inset-0 bg-white">
      <div className="relative flex justity-center items-start overflow-y-auto">
        <div className="py-14 bg-green-prime">
          <video
            ref={videoRef}
            loop
            onClick={() => {}}
            src={post.video.asset.url}
            className="h-[400px] w-screen cursor-pointer"
          />
          <div className="">
            <button
              className="absolute top-4 left-2"
              onClick={() => router.back()}
            >
              <BsFillArrowLeftCircleFill className="w-[25px] h-[25px]" />
            </button>
            {userProfile && userProfile.image && (
              <div className="absolute right-2 top-3">
                <Link href="/user/UserProfile">
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
              </div>
            )}
            {!isPlaying && (
              <div className="absolute top-[25%] left-[42%] smd:left-[43%]">
                <button
                  onClick={() => {
                    onVideoClick();
                  }}
                >
                  <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
                </button>
              </div>
            )}
            <div>Likes, Comments</div>
          </div>
        </div>
      </div>
      <div className="flex"></div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { post: data },
  };
};

export default VideoPage;
