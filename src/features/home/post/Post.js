import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { ReactComponent as ShareIcon } from "../../../assets/icons/share.svg";

const Post = () => {
  return (
    <div className="flex flex-col bg-gray-200 p-4">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-black overflow-hidden">
          <img
            alt="Jack"
            src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col text-left">
          <span>Username</span>
          <span className="text-sm">Time...</span>
        </div>
      </div>
      <div className="p-3 justify-self-center">
        <img
          alt="sample"
          src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon
            icon={faHeart}
            size="2x"
            className="cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faComment}
            size="2x"
            className="cursor-pointer"
          />
          <ShareIcon className="h-8 w-8 cursor-pointer" />
        </div>
        <span>XXX Likes</span>
      </div>
      <div className="flex flex-col my-2 text-left">
        <div className="text-sm">
          <span>Username: </span>
          <span>Caption... @... #Melaka...</span>
        </div>
        <div className="text-sm">
          <span>Username: </span>
          <span>Comment...</span>
        </div>
        <div className="text-sm">
          <span>Username: </span>
          <span>Comment...</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
