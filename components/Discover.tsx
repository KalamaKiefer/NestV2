import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsCode, BsEmojiSunglasses } from "react-icons/bs";
import { GiCakeSlice, GiGalaxy } from "react-icons/gi";
import { FaPaw, FaMedal, FaGamepad, FaMicroscope } from "react-icons/fa";

type IconProps = {
  item: { name: string; icon: ReactNode };
  active: boolean;
};

const SidebarIcon = ({ item, active }: IconProps) => {
  const activeTopic =
    "lg:border-2 hover:bg-primary px-3 py-2 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer lg:border-green-prime text-green-prime";
  const normalTopic =
    "lg:border-2 hover:bg-primary lg:border-gray-dark px-3 py-2 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";

  return (
    <Link href={`/?topic=${item.name}`} key={item.name}>
      <div className={active ? activeTopic : normalTopic}>
        <span className="font-bold text-2xl lg:text-md">{item.icon}</span>
        <span className="font-medium text-md hidden lg:block capitalize">
          {item.name}
        </span>
      </div>
    </Link>
  );
};

const Discover = () => {
  const topics = [
    { name: "Gaming", icon: <FaGamepad /> },
    { name: "Food", icon: <GiCakeSlice /> },
    { name: "Sports", icon: <FaMedal /> },
    { name: "Technology", icon: <FaMicroscope /> },
  ];

  const router = useRouter();
  const { topic } = router.query;

  return (
    <div className="lg:border-b-2 lg:border-gray-light pb-6">
      <p className="text-gray-dark m-3 mt-4 hidden lg:block">Trending Topics</p>
      <div className="flex gap-3 flex-wrap">
        {topics.map((item) => (
          <SidebarIcon
            key={item.name}
            item={item}
            active={topic === item.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
