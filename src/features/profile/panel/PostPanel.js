import React from "react";
import Post from "../../home/post/Post";

const PostPanel = ({ posts }) => {
  return (
    <div className="flex flex-col max-w-2xl space-y-3 pb-3">
      {posts.length > 0 &&
        posts.map((post, index) => <Post key={index} post={post} />)}
      {posts.length === 0 && <span className="m-auto">No post found!</span>}
    </div>
  );
};

export default PostPanel;
