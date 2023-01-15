import React, { useRef, useState } from "react";

import { NextPage } from "next";

import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import { Video } from "../utils/types";

type VideoProps = {
  post: Video;
};

const VideoCard: NextPage<VideoProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPressed = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col border-b-2 border-gray-light pb-3 max-w-[270px] md:max-w-none">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="/UserProfile">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full aspect-square"
                  loader={() => post.postedBy.image}
                  src={post.postedBy.image}
                  alt="profile picture"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                {post.postedBy.userName}
                <GoVerified className="text-blue-400 text-md" />
              </p>
              <p className="capitalize font-medium text-xs text-gray-light hidden md:block">
                {post.postedBy.userName}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative mr-4">
        <div
          className="flex flex-col items-center rounded-2xl bg-gray-100 pt-3 break-all overflow-hidden pb-4"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <h2 className="self-start ml-4 pb-4 text-title pr-5 leading-5 font-main">
            {post.caption}
          </h2>
          <Link href={`/video/${post._id}`}>
            <video
              ref={videoRef}
              src={post.video.asset.url}
              loop
              autoPlay
              className="aspect-video cursor-pointer lg:w-[700px] h-[300px] md:h-[400px] lg:h-[530px] w-[270px]"
            ></video>
          </Link>

          {isHover && (
            <div className="z-10 mt-[-35px] cursor-pointer flex justify-between w-[100px] md:w-[50px] p-2">
              {isPlaying ? (
                <button onClick={onVideoPressed}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPressed}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
              {isMuted ? (
                <button onClick={() => setIsMuted(false)}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsMuted(true)}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
