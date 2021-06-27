import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faPlus,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import PostPanel from "./panel/PostPanel";
import FriendPanel from "./panel/FriendPanel";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriends,
  getMyProfile,
  getUserProfile,
  profileSelector,
} from "./profileSlice";
import { getPosts, postSelector } from "../home/postSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  // 1: Posts panel, 2: Friends panel
  const [panel, setPanel] = React.useState(1);
  const { posts } = useSelector(postSelector);
  const { friends, myProfile, userProfile } = useSelector(profileSelector);
  const [isSameUser, setIsSameUser] = React.useState(false);

  React.useEffect(() => {
    dispatch(getMyProfile());
    dispatch(getUserProfile(userId));
    dispatch(getFriends({ userId, status: "accepted" }));
    dispatch(getPosts(userId));
  }, []);

  React.useEffect(() => {
    if (myProfile !== null && userProfile !== null) {
      if (myProfile._id === userProfile._id) {
        setIsSameUser(true);
      }
    }
  }, [posts, friends, userProfile, myProfile]);

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
            <input placeholder="Search bar" className="h-10 p-4 w-3/5" />
            <div className="flex items-center space-x-4 text-2xl">
              <FontAwesomeIcon icon={faPlus} className="cursor-pointer" />
              <FontAwesomeIcon
                icon={faUserFriends}
                className="cursor-pointer"
              />
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
          <div className="w-full overflow-y-auto">
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
                  {!isSameUser && (
                    <button className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold text-lg">
                      Add friend
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
                {panel === 1 && <PostPanel posts={posts} />}
                {panel === 2 && <FriendPanel friends={friends} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
