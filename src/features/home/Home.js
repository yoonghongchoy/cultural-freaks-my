import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCog,
  faEdit,
  faPlus,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { ReactComponent as ShareIcon } from "../../assets/icons/share.svg";

const Home = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center bg-yellow-500 h-16 p-6 space-x-10">
          <h1 className="text-2xl font-bold cursor-pointer">
            CulturalFreaksMY
          </h1>
          <input placeholder="Search bar" className="h-10 p-4 w-3/5" />
          <div className="flex items-center space-x-4 text-2xl">
            <FontAwesomeIcon icon={faPlus} className="cursor-pointer" />
            <FontAwesomeIcon icon={faUserFriends} className="cursor-pointer" />
            <FontAwesomeIcon icon={faBell} className="cursor-pointer" />
            <div className="w-10 h-10 rounded-full bg-black overflow-hidden cursor-pointer">
              <img
                alt="Jack"
                src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                className="object-cover object-center"
              />
            </div>
          </div>
        </header>
        <div className="flex h-full bg-yellow-50">
          <div className="flex flex-col w-64 border-r-2 border-gray-400 p-6">
            <button className="mb-5 px-3 py-1.5 text-left bg-gray-400">
              Group
            </button>
            <button className="mb-5 px-3 py-1.5 text-left bg-gray-400">
              Liked Posts
            </button>
            <button className="mb-5 px-3 py-1.5 text-left bg-gray-400">
              Popular Posts
            </button>
            <button className="mb-5 px-3 py-1.5 text-left bg-gray-400">
              States
            </button>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center h-16 border-b-2 border-gray-400 p-4">
              <button className="px-3 py-1.5 text-left bg-gray-400">
                Recent
              </button>
            </div>
            <div className="overflow-x-hidden overflow-y-auto p-4">
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
            </div>
          </div>
          <div className="flex flex-col w-64 border-l-2 border-gray-400">
            <div className="flex justify-between bg-white p-3">
              <span>Chat</span>
              <div className="space-x-2">
                <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
                <FontAwesomeIcon icon={faCog} className="cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-col h-full overflow-x-hidden overflow-y-auto">
              <div className="flex items-center space-x-2 p-3 cursor-pointer hover:bg-gray-200">
                <div className="w-10 h-10 rounded-full bg-black overflow-hidden">
                  <img
                    alt="Jack"
                    src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span>Username</span>
                  <span className="text-sm">Status</span>
                </div>
              </div>
            </div>
            <input placeholder="Search..." className="p-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
