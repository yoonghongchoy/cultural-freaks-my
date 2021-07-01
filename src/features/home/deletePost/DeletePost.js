import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, postSelector, setOpenDeleteModal } from "../postSlice";

const DeletePost = () => {
  const dispatch = useDispatch();
  const { deletePostId } = useSelector(postSelector);

  return (
    <div className="relative w-screen h-screen inset-0 m-auto flex items-center justify-center bg-gray-300 bg-opacity-75">
      <div className="w-64 mx-auto flex flex-col items-center bg-white rounded-md p-4 space-y-3">
        <span className="font-bold text-xl">Delete post?</span>
        <div className="flex space-x-4">
          <button
            className="p-2 bg-green-600 rounded-md"
            onClick={() => {
              dispatch(deletePost(deletePostId));
              dispatch(setOpenDeleteModal({ openDeleteModal: false, id: "" }));
            }}
          >
            Confirm
          </button>
          <button
            className="p-2 bg-red-500 rounded-md"
            onClick={() =>
              dispatch(setOpenDeleteModal({ openDeleteModal: false, id: "" }))
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;
