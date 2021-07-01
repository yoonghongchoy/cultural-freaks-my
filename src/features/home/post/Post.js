import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as ShareIcon } from "../../../assets/icons/share.svg";
import moment from "moment";
import Slider from "react-slick";
import {
  getPosts,
  likePost,
  setOpenDeleteModal,
  sharePost,
  unlikePost,
} from "../postSlice";
import { useDispatch, useSelector } from "react-redux";
import { profileSelector } from "../../profile/profileSlice";
import { useHistory, useLocation } from "react-router-dom";
import { createNotification } from "../notificationSlice";
import { toast, Toaster } from "react-hot-toast";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { myProfile } = useSelector(profileSelector);
  const [isLike, setIsLike] = React.useState(false);
  const [likes, setLikes] = React.useState(post.likes.length);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const getFullName = (firstName, surname) => {
    return `${firstName} ${surname}`;
  };

  const getDuration = (createdAt) => {
    const now = moment(new Date());
    const postDateTime = moment(createdAt);

    const duration = moment.duration(now.diff(postDateTime));
    const years = duration.years();
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    if (days > 0) {
      if (days === 1) {
        return `Yesterday at ${postDateTime.format("h:mm a")}`;
      } else {
        if (years > 0) {
          return `${postDateTime.format("D MMMM YYYY [at] h:mm a")}`;
        } else {
          return `${postDateTime.format("D MMMM [at] h:mm a")}`;
        }
      }
    } else {
      if (hours > 0) {
        return postDateTime.fromNow();
      } else {
        if (minutes > 0) {
          return postDateTime.fromNow();
        } else {
          return postDateTime.fromNow();
        }
      }
    }
  };

  const getCaption = (content, postHashtags) => {
    let hashtags = "";
    for (const hashtag of postHashtags) {
      hashtags += ` ${hashtag}`;
    }
    return `${content}${hashtags}`;
  };

  const redirectToProfile = (id) => {
    if (location.pathname.includes("profile/")) {
      history.push(`${id}`);
    } else {
      history.push(`profile/${id}`);
    }
  };

  React.useEffect(() => {
    if (post.likes.length > 0 && post.likes.includes(myProfile._id)) {
      setIsLike(true);
    }
  }, [post]);

  return (
    <div className="max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-5xl flex flex-col bg-gray-200 p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div
            className="w-10 h-10 rounded-full bg-black overflow-hidden cursor-pointer"
            onClick={() => redirectToProfile(post.user._id)}
          >
            {post.user && !post.user.profilePicture && (
              <img
                alt="Jack"
                src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                className="object-cover object-center"
              />
            )}
            {post.user && post.user.profilePicture && (
              <img
                alt={post.user.firstName}
                src={`data:image/png;base64, ${post.user.profilePicture}`}
                className="object-cover object-center"
              />
            )}
          </div>
          <div className="flex flex-col text-left">
            <span
              className="hover:underline cursor-pointer"
              onClick={() => redirectToProfile(post.user._id)}
            >
              {getFullName(post.user.firstName, post.user.surname)}
            </span>
            <span className="text-sm">{getDuration(post.createdAt)}</span>
          </div>
        </div>
        {myProfile._id === post.user._id && (
          <button
            className="border border-black p-1 rounded-md bg-red-500"
            onClick={() =>
              dispatch(
                setOpenDeleteModal({ openDeleteModal: true, id: post._id })
              )
            }
          >
            Delete
          </button>
        )}
      </div>
      <div className="p-3 justify-self-center max-w-5xl">
        {!post.originalPost && (
          <Slider {...sliderSettings}>
            {post.medias.length > 0 &&
              post.medias.map((media, index) => {
                if (media.type === "image") {
                  return (
                    <img
                      key={index}
                      alt={media.name}
                      src={`data:image/png;base64, ${media.value}`}
                      className="max-w-max"
                    />
                  );
                } else if (media.type === "video") {
                  return (
                    <video controls key={index}>
                      <source
                        type="video/mp4"
                        src={`data:video/mp4;base64, ${media.value}`}
                      />
                    </video>
                  );
                }
              })}
          </Slider>
        )}
        {post.originalPost && (
          <div className="border border-gray-500 flex flex-col shadow-lg">
            <div className="flex items-center p-3 space-x-3">
              <div
                className="w-10 h-10 rounded-full bg-black overflow-hidden cursor-pointer"
                onClick={() => redirectToProfile(post.originalPost.user._id)}
              >
                {post.originalPost.user &&
                  !post.originalPost.user.profilePicture && (
                    <img
                      alt="Jack"
                      src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                      className="object-cover object-center"
                    />
                  )}
                {post.originalPost.user &&
                  post.originalPost.user.profilePicture && (
                    <img
                      alt={post.originalPost.user.firstName}
                      src={`data:image/png;base64, ${post.originalPost.user.profilePicture}`}
                      className="object-cover object-center"
                    />
                  )}
              </div>
              <div className="flex flex-col text-left">
                <span
                  className="hover:underline cursor-pointer"
                  onClick={() => redirectToProfile(post.originalPost.user._id)}
                >
                  {getFullName(
                    post.originalPost.user.firstName,
                    post.originalPost.user.surname
                  )}
                </span>
                <span className="text-sm">
                  {getDuration(post.originalPost.createdAt)}
                </span>
              </div>
            </div>
            <div className="p-2">
              <Slider {...sliderSettings}>
                {post.originalPost.medias.length > 0 &&
                  post.originalPost.medias.map((media, index) => {
                    if (media.type === "image") {
                      return (
                        <img
                          key={index}
                          alt={media.name}
                          src={`data:image/png;base64, ${media.value}`}
                          className="max-w-max"
                        />
                      );
                    } else if (media.type === "video") {
                      return (
                        <video controls key={index}>
                          <source
                            type="video/mp4"
                            src={`data:video/mp4;base64, ${media.value}`}
                          />
                        </video>
                      );
                    }
                  })}
              </Slider>
            </div>
            <div className="text-sm text-left p-2">
              <span
                className="hover:underline cursor-pointer"
                onClick={() => redirectToProfile(post.originalPost.user._id)}
              >
                {getFullName(
                  post.originalPost.user.firstName,
                  post.originalPost.user.surname
                )}
              </span>
              <span>: </span>
              <span>
                {getCaption(
                  post.originalPost.content,
                  post.originalPost.hashtags
                )}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {!isLike && (
            <FontAwesomeIcon
              icon={faHeart}
              size="2x"
              className="cursor-pointer"
              onClick={() => {
                setIsLike(!isLike);
                dispatch(likePost(post._id));
                setLikes(likes + 1);
                if (myProfile._id !== post.user._id) {
                  dispatch(
                    createNotification({
                      notifier: post.user._id,
                      content: `${myProfile.firstName} ${myProfile.surname} likes your post`,
                      post: post._id,
                    })
                  );
                }
              }}
            />
          )}
          {isLike && (
            <FontAwesomeIcon
              icon={faHeartSolid}
              size="2x"
              className="cursor-pointer text-red-600"
              onClick={() => {
                setIsLike(!isLike);
                dispatch(unlikePost(post._id));
                setLikes(likes - 1);
              }}
            />
          )}
          <FontAwesomeIcon
            icon={faComment}
            size="2x"
            className="cursor-pointer"
          />
          <div
            onClick={() => {
              dispatch(sharePost(post._id));
              dispatch(
                createNotification({
                  notifier: post.user._id,
                  content: `${myProfile.firstName} ${myProfile.surname} shares your post`,
                  post: post._id,
                })
              );
              toast.success("Post shared");
            }}
          >
            <ShareIcon className="h-8 w-8 cursor-pointer" />
          </div>
        </div>
        <span>{likes > 1 ? `${likes} likes` : `${likes} like`}</span>
      </div>
      <div className="flex flex-col my-2 text-left">
        {!post.originalPost && (
          <div className="text-sm">
            <span
              className="hover:underline cursor-pointer"
              onClick={() => redirectToProfile(post.user._id)}
            >
              {getFullName(post.user.firstName, post.user.surname)}
            </span>
            <span>: </span>
            <span>{getCaption(post.content, post.hashtags)}</span>
          </div>
        )}
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
