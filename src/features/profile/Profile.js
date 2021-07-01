import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCaretDown,
  faPlus,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import PostPanel from "./panel/PostPanel";
import FriendPanel from "./panel/FriendPanel";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIsFriend,
  getFriends,
  getMyProfile,
  getUserProfile,
  profileSelector,
  removeFriend,
  sendFriendRequest,
  setRequestSent,
} from "./profileSlice";
import {
  clearPostState,
  getPosts,
  postSelector,
  setShowCreateDialog,
} from "../home/postSlice";
import ProfileDropdown from "./ProfileDropdown";
import Search from "../search/Search";
import Friend from "../home/Friend";
import Notification from "../home/Notification";
import CreatePost from "../home/createPost/CreatePost";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { userId } = useParams();
  // 1: Posts panel, 2: Friends panel
  const [panel, setPanel] = React.useState(1);
  const { showCreateDialog, posts, isGetPostsSuccess } =
    useSelector(postSelector);
  const { friends, myProfile, userProfile, requestSent, isFriend } =
    useSelector(profileSelector);
  const [isSameUser, setIsSameUser] = React.useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);

  React.useEffect(() => {
    setIsSameUser(false);
    dispatch(setRequestSent(false));
    dispatch(checkIsFriend(userId));
    dispatch(getMyProfile());
    dispatch(getUserProfile(userId));
    dispatch(getFriends({ userId, status: "accepted" }));
    dispatch(getPosts({ userId }));
    dispatch(clearPostState());
  }, [userId]);

  React.useEffect(() => {}, [
    isSameUser,
    isGetPostsSuccess,
    posts,
    friends,
    requestSent,
  ]);

  React.useEffect(() => {
    if (!isFriend) {
      dispatch(getFriends({ userId, status: "accepted" }));
    }
  }, [isFriend]);

  React.useEffect(() => {
    if (myProfile !== null) {
      if (myProfile._id === userId) {
        setIsSameUser(true);
      }
    }
  }, [userId, myProfile]);

  const getFullName = () => {
    if (userProfile === null) return;
    return `${userProfile.firstName} ${userProfile.surname}`;
  };

  return (
    <div>
      <div className="fixed flex h-screen w-screen">
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex justify-between items-center bg-yellow-500 h-16 p-6 space-x-10">
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={() => history.push("/")}
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
                  if (location.pathname.includes("profile/")) {
                    history.push(`${myProfile._id}`);
                  } else {
                    history.push(`profile/${myProfile._id}`);
                  }
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
          <div className="w-full h-full overflow-y-auto bg-yellow-50">
            <div className="flex flex-col">
              <div className="flex items-center mx-auto p-4 space-x-32 border-b border-gray-400">
                <div className="w-40 h-40 rounded-full bg-black overflow-hidden cursor-pointer">
                  <img
                    alt="Jack"
                    src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                    title="Change profile picture"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col text-left space-y-5">
                  <div className="flex items-center space-x-16">
                    <h1 className="font-bold text-lg">{getFullName()}</h1>
                  </div>
                  <div className="flex space-x-5">
                    <span>
                      {posts.length > 0
                        ? `${posts.length} posts`
                        : `${posts.length} post`}
                    </span>
                    <span>
                      {friends.length > 0
                        ? `${friends.length} friends`
                        : `${friends.length} friend`}
                    </span>
                  </div>
                </div>
                <div className="w-32">
                  {!isSameUser && !isFriend && !requestSent && (
                    <button
                      className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold text-lg"
                      onClick={() => {
                        dispatch(sendFriendRequest(userId));
                      }}
                    >
                      Add friend
                    </button>
                  )}
                  {isFriend.status === "accepted" && (
                    <button
                      className="w-full bg-red-500 text-white p-3 rounded-lg font-semibold text-lg"
                      onClick={() => {
                        dispatch(removeFriend(isFriend._id));
                      }}
                    >
                      Unfriend
                    </button>
                  )}
                  {(requestSent || isFriend.status === "pending") && (
                    <button
                      className="w-full bg-gray-400 text-white p-3 rounded-lg font-semibold text-lg"
                      disabled
                    >
                      Request sent
                    </button>
                  )}
                </div>
              </div>
              <div className="space-x-24 mb-5">
                <span
                  className={`${
                    panel === 1 ? "border-b-2 border-gray-700" : ""
                  } cursor-pointer`}
                  onClick={() => setPanel(1)}
                >
                  Posts
                </span>
                <span
                  className={`${
                    panel === 2 ? "border-b-2 border-gray-700" : ""
                  } cursor-pointer`}
                  onClick={() => setPanel(2)}
                >
                  Friends
                </span>
              </div>
              <div className="mx-auto">
                {panel === 1 && (
                  <PostPanel
                    posts={posts}
                    isGetPostsSuccess={isGetPostsSuccess}
                  />
                )}
                {panel === 2 && (
                  <FriendPanel friends={friends} userId={userId} />
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

export default Profile;
