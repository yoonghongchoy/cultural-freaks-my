import React from "react";
import Post from "../../home/post/Post";

const PostPanel = ({ posts, isGetPostsSuccess }) => {
  return (
    <div className="w-full max-w-2xl pb-3">
      <div className="flex flex-col space-y-3">
        {posts.length > 0 &&
          isGetPostsSuccess &&
          posts.map((post, index) => <Post key={index} post={post} />)}
      </div>
      {posts.length === 0 && <span className="m-auto">No post found!</span>}
    </div>
  );
};

export default PostPanel;
