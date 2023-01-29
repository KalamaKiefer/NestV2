import * as Popover from "@radix-ui/react-popover";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { NEXT_PUBLIC_BASE_URL } from "../utils";
import { userProps, PostProps } from "../utils/types";

interface VideoCaptionProps {
  userProfile: userProps | null;
  post: PostProps;
}

const VideoCaption = ({ userProfile, post }: VideoCaptionProps) => {
  const [liked, setLiked] = useState(false);
  const [ogPost, setOgPost] = useState(post);
  const filterLikes = ogPost.likes?.filter(
    (item) => item._ref === userProfile?._id
  );

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [liked, filterLikes]);

  const handleLiked = async () => {
    if (userProfile) {
      const { data } = await axios.put(`${NEXT_PUBLIC_BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like: liked,
      });

      setOgPost({ ...post, likes: data.likes });
    }
  };

  return (
    <Popover.Root>
      <div className="mt-4 flex flex-col border-b border-b-black bg-gradient-to-b from-blue-200 to-white text-center smd:text-left px-14 ">
        <div className="flex">
          {userProfile && (
            <div className="mr-2 w-10 h-10 my-2">
              <Link href="/user/UserProfile" className="self-start">
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
          <div className="flex items-center gap-2">
            <p className="flex gap-2 items-center md:text-md font-bold text-primary">
              {post.postedBy.userName}
            </p>
          </div>
        </div>

        <p className="text-[14px]">{post.caption}</p>
        <div className="flex items-center mt-6 pb-4 space-x-4">
          <div className="flex flex-col items-center">
            <button
              className=""
              onClick={() => {
                setLiked(!liked), handleLiked();
              }}
            >
              {liked ? (
                <FcLike className="w-5 h-5 duration-300 ease-in-out transition-all animate-pulse" />
              ) : (
                <FcLikePlaceholder className="w-5 h-5 duration-300 ease-in-out transition-all " />
              )}
            </button>

            <p className="text-sm text-black">
              {ogPost.likes ? ogPost.likes?.length : 0}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Popover.Trigger
              asChild
              className="data-[state=open]:text-blue-300 ease-in-out duration-300"
            >
              <button className="pt-[3.5px]">
                <FaComment className="w-5 h-5 border-black" />
              </button>
            </Popover.Trigger>
            <p className="text-sm text-black">
              {ogPost.comments ? ogPost.comments?.length : 0}
            </p>
          </div>
        </div>

        <Popover.Portal>
          <Popover.Content className="w-screen bg-black" style={{}}>
            <div></div>
            <Popover.Close className="PopoverClose" aria-label="Close">
              close
            </Popover.Close>
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
};

export default VideoCaption;

{
  /* <div className="mt-4 flex flex-col border-b border-b-black bg-gradient-to-b from-blue-200 to-white text-center smd:text-left px-14 ">
  <div className="flex">
    {userProfile && (
      <div className="mr-2 w-10 h-10 my-2">
        <Link href="/user/UserProfile" className="self-start">
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
    <div className="flex items-center gap-2">
      <p className="flex gap-2 items-center md:text-md font-bold text-primary">
        {post.postedBy.userName}
      </p>
    </div>
  </div>

  <p className="text-[14px]">{post.caption}</p>
  <CommentBar />
</div>; */
}
