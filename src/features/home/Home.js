import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import Post from "./post/Post";
import CreatePost from "./createPost/CreatePost";
import {
  clearPostShared,
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
import { stateName } from "../../constants/state";
import DeletePost from "./deletePost/DeletePost";
import { subCategoryList } from "../../constants/subCategoryList";
import DeleteComment from "./deleteComment/DeleteComment";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    showCreateDialog,
    posts,
    openDeleteModal,
    postShared,
    openDeleteCommentModal,
  } = useSelector(postSelector);
  const { myProfile } = useSelector(profileSelector);
  const [userId, setUserId] = React.useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
  const [panelName, setPanelName] = React.useState("Recent");
  const [toggleStateList, setToggleStateList] = React.useState(false);
  const [keywordList, setKeywordList] = React.useState(subCategoryList);
  const [keywords, setKeywords] = React.useState(["", "", ""]);

  React.useEffect(() => {
    dispatch(getPosts({}));
    dispatch(clearPostState());
    dispatch(getMyProfile());
  }, []);

  React.useEffect(() => {
    if (postShared) {
      dispatch(getPosts({}));
      dispatch(clearPostShared());
    }
  }, [postShared]);

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

  React.useEffect(() => {}, [openDeleteModal]);

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
                {myProfile && !myProfile.profilePicture && (
                  <img
                    alt="Jack"
                    src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                    className="object-cover object-center"
                  />
                )}
                {myProfile && myProfile.profilePicture && (
                  <img
                    alt={myProfile.firstName}
                    src={`data:image/png;base64, ${myProfile.profilePicture}`}
                    className="object-cover object-center"
                  />
                )}
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
              <div className="flex flex-col h-auto border-b-2 border-gray-400 p-4 space-y-3">
                <button className="w-max px-3 py-1.5 text-left bg-gray-400">
                  {panelName}
                </button>
                {stateName.includes(panelName) && (
                  <div className="flex items-center">
                    {[1, 2, 3].map((item, index) => (
                      <div
                        key={index}
                        className="w-40 mr-4 flex flex-col justify-center"
                      >
                        <span>Keyword {item}: </span>
                        <select
                          className="h-6 border border-black"
                          value={keywords[index]}
                          onChange={(event) => {
                            keywords[index] = event.target.value;
                            setKeywords([...keywords]);
                          }}
                        >
                          <option value="" />
                          {keywordList.map((keyword, index) => (
                            <option
                              key={index}
                              value={keyword}
                              disabled={keywords.includes(keyword)}
                            >
                              {keyword}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                    <button
                      className="w-max h-10 px-3 py-1.5 ml-8 text-left bg-gray-400"
                      onClick={() => {
                        dispatch(
                          getPosts({
                            state: panelName,
                            keyword1: keywords[0],
                            keyword2: keywords[1],
                            keyword3: keywords[2],
                          })
                        );
                      }}
                    >
                      Search
                    </button>
                  </div>
                )}
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
      {openDeleteModal && <DeletePost />}
      {openDeleteCommentModal && <DeleteComment />}
    </div>
  );
};

export default Home;
