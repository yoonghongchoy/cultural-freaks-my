import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faPlus,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import Post from "./post/Post";
import CreatePost from "./createPost/CreatePost";
import { getPosts, postSelector, setShowCreateDialog } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getMyProfile, profileSelector } from "../profile/profileSlice";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { showCreateDialog, posts } = useSelector(postSelector);
  const { myProfile } = useSelector(profileSelector);
  const [userId, setUserId] = React.useState(null);

  React.useEffect(() => {
    dispatch(getPosts());
    dispatch(getMyProfile());
  }, []);

  React.useEffect(() => {
    if (myProfile) {
      setUserId(myProfile._id);
    }
  }, [posts, myProfile]);

  React.useEffect(() => {
    if (!showCreateDialog) {
      dispatch(getPosts());
    }
  }, [showCreateDialog]);

  return (
    <div>
      <div className="fixed flex h-screen w-screen">
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex justify-between items-center bg-yellow-500 h-16 p-6 space-x-10">
            <h1 className="text-2xl font-bold cursor-pointer">
              CulturalFreaksMY
            </h1>
            <input placeholder="Search bar" className="h-10 p-4 w-3/5" />
            <div className="flex items-center space-x-4 text-2xl">
              <FontAwesomeIcon
                icon={faPlus}
                className="cursor-pointer"
                onClick={() => dispatch(setShowCreateDialog(!showCreateDialog))}
              />
              <FontAwesomeIcon
                icon={faUserFriends}
                className="cursor-pointer"
              />
              <FontAwesomeIcon icon={faBell} className="cursor-pointer" />
              <div
                className="w-10 h-10 rounded-full bg-black overflow-hidden cursor-pointer"
                onClick={() => {
                  history.push(`profile/${userId}`);
                }}
              >
                <img
                  alt="Jack"
                  src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </header>
          <div
            className="flex bg-yellow-50"
            style={{ height: "calc(100% - 4rem)" }}
          >
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
              <div className="flex flex-col h-full overflow-x-hidden overflow-y-auto py-6 px-20 space-y-3">
                {posts.length > 0 &&
                  posts.map((post, index) => <Post key={index} post={post} />)}
                {posts.length === 0 && (
                  <span className="m-auto">No post found!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>{showCreateDialog && <CreatePost />}</div>
    </div>
  );
};

export default Home;
