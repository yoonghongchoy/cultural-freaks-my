import React from "react";
import {
  getPostById,
  getPosts,
  postSelector,
  setShowCreateDialog,
} from "../postSlice";
import Search from "../../search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import Friend from "../Friend";
import Notification from "../Notification";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { getMyProfile, profileSelector } from "../../profile/profileSlice";
import Post from "../post/Post";
import CreatePost from "../createPost/CreatePost";
import ProfileDropdown from "../../profile/ProfileDropdown";
import DeletePost from "../deletePost/DeletePost";
import DeleteComment from "../deleteComment/DeleteComment";

const SinglePost = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  const {
    showCreateDialog,
    post,
    openDeleteModal,
    postShared,
    openDeleteCommentModal,
  } = useSelector(postSelector);
  const { myProfile } = useSelector(profileSelector);
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);

  React.useEffect(() => {
    dispatch(getMyProfile());
    dispatch(getPostById(postId));
  }, []);

  React.useEffect(() => {
    dispatch(getPostById(postId));
  }, [postId]);

  return (
    <div>
      <div className="fixed flex h-screen w-screen">
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex justify-between items-center bg-yellow-500 h-16 p-6 space-x-10">
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={() => {
                history.push("/");
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
              <Friend userId={myProfile ? myProfile._id : null} />
              <Notification />
              <div
                className="w-10 h-10 rounded-full bg-black overflow-hidden cursor-pointer"
                onClick={() => {
                  history.push(`/profile/${myProfile ? myProfile._id : null}`);
                }}
              >
                {myProfile && !myProfile.profilePicture && (
                  <img
                    alt="Jack"
                    src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                    className="w-full h-full object-cover object-center"
                  />
                )}
                {myProfile && myProfile.profilePicture && (
                  <img
                    alt={myProfile.firstName}
                    src={`data:image/png;base64, ${myProfile.profilePicture}`}
                    className=" w-full h-full object-cover object-center"
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
            <div className="w-full h-full py-6 px-20 mx-auto overflow-y-auto space-y-3">
              {post && <Post post={post} />}
              {!post && <span className="m-auto">No post found!</span>}
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

export default SinglePost;
