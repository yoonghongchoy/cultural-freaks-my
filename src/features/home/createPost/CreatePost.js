import React from "react";
import { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

const CreatePost = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div className="relative w-screen h-screen inset-0 m-auto flex items-center justify-center">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-lg w-create-post-container">
          <div className="flex justify-between items-center p-4 border-b-2 text-left">
            <span>Create Post</span>
            <FontAwesomeIcon icon={faTimes} className="cursor-pointer" />
          </div>
          <form className="p-4 flex flex-col">
            <textarea
              placeholder="Write your content here..."
              {...register("content", {
                required: true,
              })}
              className="w-full mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md
                focus:ring-1 ring-cyan-500"
            />
            <div className="flex space-x-4">
              <textarea
                placeholder="Write your hashtag here..."
                {...register("hashtag", {
                  required: true,
                })}
                className="w-full mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md
                focus:ring-1 ring-cyan-500"
              />
              <div className="flex flex-col justify-between">
                <div className="flex justify-between items-center space-x-4">
                  <div className="w-full bg-gray-300 p-1">Photo</div>
                  <div className="w-full bg-gray-300 p-1">Video</div>
                </div>
                <button type="submit" className="w-full bg-gray-300 p-1">
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
