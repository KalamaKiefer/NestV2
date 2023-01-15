import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import {
  FaCloudUploadAlt,
  FaGamepad,
  FaMedal,
  FaMicroscope,
} from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import axios from "axios";

import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { GiCakeSlice } from "react-icons/gi";
import { userProps } from "../utils/types";
import { BASE_URL } from "../utils";

const Upload = () => {
  const topics = [
    { name: "Gaming", icon: <FaGamepad /> },
    { name: "Food", icon: <GiCakeSlice /> },
    { name: "Sports", icon: <FaMedal /> },
    { name: "Technology", icon: <FaMicroscope /> },
  ];

  const [isLoading, setisLoading] = useState(false);
  const [videos, setVideo] = useState<SanityAssetDocument | undefined>(
    undefined
  );
  const [uploadError, setuploadError] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const router = useRouter();

  const { userProfile, setUploadPage } = useAuthStore();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideo(data);
          setisLoading(false);
        });
    } else {
      setisLoading(false);
      setuploadError(true);
    }
  };

  const handlePost = async () => {
    if (caption && videos?._id && category) {
      setSavingPost(true);

      const newVideo = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videos?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post(`${BASE_URL}/api/post`, newVideo);

      router.push("/");
    }
  };

  return (
    <div className="flex w-full h-full ease-in-out transition-all duration-500 relative">
      <div className="bg-white rounded-lg">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload</p>
            <p className="text-lg text-green-prime mt-1">
              Post a Video to your account
            </p>
          </div>
          {uploadError && (
            <div
              className="flex items-center text-center h-[420px] w-[260px] absolute opacity-90 top-32 bg-black"
              onClick={() => setuploadError(false)}
            >
              <h2 className="text-2xl text-red-700 font-body font-bold">
                Error: Please select a mp4/webm/ogg file format
              </h2>
            </div>
          )}
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-4 w-[260px] h-[420px] p-10 cursor-pointer hover:border-green-prime ease-in-out duration-300">
            {isLoading ? (
              <p>Uploading</p>
            ) : (
              <div>
                {videos ? (
                  <div>
                    <div>
                      <video
                        src={videos.url}
                        loop
                        controls
                        className="rounded-xl h-full mt-16 bg-black mb-10 w-[260px]"
                      ></video>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-400 text-6xl" />
                        </p>
                        <p className="font-body font-medium text-xl text-gray-400">
                          Upload Video
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                      onChange={(e) => uploadVideo(e)}
                    />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col pb-10">
          <label className="text-base mt-6 pb-1">Caption</label>
          <input
            type="text"
            value={caption}
            placeholder="What's the caption?"
            onChange={(e) => setCaption(e.target.value)}
            className="rounded outline-none focus:border-2 focus:border-green-prime ease-in-out duration-150 text-green-prime text-sm p-2"
          />
          <label className="text-base mt-4 pb-1">Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none p-2 border border-green-prime rounded"
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                className="outline-none text-base"
                value={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>
          <button
            className="absolute right-2 bottom-0 bg-green-prime rounded-full p-2 border-2 border-black md:hidden"
            onClick={() => {
              handlePost();
              setUploadPage(false);
            }}
          >
            <IoIosSend className="cursor-pointer w-[30px] h-[30px]" />
          </button>

          <div className="mt-6 md:flex items-center justify-center hidden">
            <button
              className="bg-green-prime text-white p-2 flex w-60 rounded items-center justify-center"
              onClick={() => {
                handlePost();
                setUploadPage(false);
              }}
            >
              <p className="mr-1">Post</p>
              <IoIosSend className="cursor-pointer w-[30px] h-[30px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
