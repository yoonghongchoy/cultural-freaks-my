import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import Post from "./post/Post";
import CreatePost from "./createPost/CreatePost";
import {
  clearPostState,
  getPosts,
  postSelector,
  setShowCreateDialog,
} from "./postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getMyProfile, profileSelector } from "../profile/profileSlice";
import ProfileDropdown from "../profile/ProfileDropdown";
import Search from "../search/Search";
import Friend from "./Friend";
import Notification from "./Notification";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { showCreateDialog, posts } = useSelector(postSelector);
  const { myProfile } = useSelector(profileSelector);
  const [userId, setUserId] = React.useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
  const [panelName, setPanelName] = React.useState("Recent");
  const [toggleStateList, setToggleStateList] = React.useState(false);

  const stateName = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Perak",
    "Perlis",
    "Pulau Pinang",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
    "Kuala Lumpur",
    "Labuan",
    "Putrajaya",
  ];

  React.useEffect(() => {
    dispatch(getPosts({}));
    dispatch(clearPostState());
    dispatch(getMyProfile());
  }, []);

  React.useEffect(() => {
    if (myProfile) {
      setUserId(myProfile._id);
    }
  }, [posts, myProfile]);

  React.useEffect(() => {
    if (!showCreateDialog) {
      dispatch(getPosts({}));
    }
  }, [showCreateDialog]);

  return (
    <div>
      <div className="fixed flex h-screen w-screen">
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex justify-between items-center bg-yellow-500 h-16 p-6 space-x-10">
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={() => {
                setPanelName("Recent");
                dispatch(getPosts({}));
              }}
            >
              CulturalFreaksMY
            </h1>
            <Search />
            <div className="flex items-center space-x-4 text-2xl">
              <FontAwesomeIcon
                icon={faPlus}
                className="cursor-pointer"
                onClick={() => dispatch(setShowCreateDialog(!showCreateDialog))}
              />
              <Friend userId={userId} />
              <Notification />
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
              <FontAwesomeIcon
                icon={faCaretDown}
                className="cursor-pointer"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              />
            </div>
          </header>
          <div
            className="flex bg-yellow-50"
            style={{ height: "calc(100% - 4rem)" }}
          >
            <div className="flex flex-col w-64 border-r-2 border-gray-400 p-6">
              <button
                className="mb-5 px-3 py-1.5 text-left bg-gray-400"
                onClick={() => {
                  setPanelName("Liked Posts");
                  dispatch(getPosts({ sortBy: "isLiked" }));
                }}
              >
                Liked Posts
              </button>
              <button
                className="mb-5 px-3 py-1.5 text-left bg-gray-400"
                onClick={() => {
                  setPanelName("Popular Posts");
                  dispatch(getPosts({ sortBy: "popular" }));
                }}
              >
                Popular Posts
              </button>
              <button
                className="px-3 py-1.5 text-left bg-gray-400 cursor-pointer"
                onClick={() => setToggleStateList(!toggleStateList)}
              >
                State
              </button>
              {toggleStateList && (
                <div className="flex flex-col space-y-1 bg-white">
                  {stateName.map((state, index) => {
                    return (
                      <button
                        key={index}
                        className="w-full text-left px-3 hover:bg-gray-300"
                        onClick={() => {
                          setPanelName(state);
                          dispatch(getPosts({ state }));
                        }}
                      >
                        {state}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-center h-16 border-b-2 border-gray-400 p-4">
                <button className="px-3 py-1.5 text-left bg-gray-400">
                  {panelName}
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
      {showProfileDropdown && <ProfileDropdown />}
    </div>
  );
};

export default Home;
