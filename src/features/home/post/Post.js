import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { ReactComponent as ShareIcon } from "../../../assets/icons/share.svg";
import moment from "moment";
import Slider from "react-slick";

const Post = ({ post }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const getFullName = () => {
    return `${post.user.firstName} ${post.user.surname}`;
  };

  const getDuration = () => {
    const now = moment(new Date());
    const postDateTime = moment(post.createdAt);

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

  const getCaption = () => {
    let hashtags = "";
    for (const hashtag of post.hashtags) {
      hashtags += ` ${hashtag}`;
    }
    return `${post.content}${hashtags}`;
  };

  return (
    <div className="max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-5xl flex flex-col bg-gray-200 p-4">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-black overflow-hidden">
          <img
            alt="Jack"
            src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col text-left">
          <span>{getFullName()}</span>
          <span className="text-sm">{getDuration()}</span>
        </div>
      </div>
      <div className="p-3 justify-self-center max-w-5xl">
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
          <span>{getFullName() + ": "}</span>
          <span>{getCaption()}</span>
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
