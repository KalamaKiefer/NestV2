import React, { useState } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaComment } from "react-icons/fa";

const CommentBar = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex bg-green-prime mt-6 pb-4 space-x-4">
      <button className="ml-20" onClick={() => setLiked(!liked)}>
        {liked ? (
          <FcLike className="w-[20px] h-[20px] duration-300 ease-in-out transition-all animate-pulse" />
        ) : (
          <FcLikePlaceholder className="w-[20px] h-[20px] duration-300 ease-in-out transition-all" />
        )}
      </button>
      <button className="pt-[3.5px]">
        <FaComment className="w-[20px] h-[20px]" />
      </button>
    </div>
  );
};

export default CommentBar;
