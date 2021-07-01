import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriendRequest,
  profileSelector,
  removeFriend,
  updateFriendRequest,
} from "../profile/profileSlice";

const Friend = ({ userId }) => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const { friendRequests } = useSelector(profileSelector);
  const wrapperRef = React.useRef(null);

  const handleClickOutside = (event) => {
    if (
      wrapperRef &&
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };

  React.useEffect(() => {
    if (showDropdown) {
      dispatch(getFriendRequest(userId));
    }
  }, [showDropdown]);

  React.useEffect(() => {}, [friendRequests]);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef}>
      <FontAwesomeIcon
        icon={faUserFriends}
        className="cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {showDropdown && (
        <div className="absolute top-16 right-1.5 w-80 origin-top-right text-base z-50">
          <div className="flex justify-center items-center p-2 bg-white rounded-md shadow-lg">
            {friendRequests.length === 0 && <span>No friend request</span>}
            {friendRequests.length > 0 &&
              friendRequests.map((friend, index) => {
                let user = "";

                if (friend.user1._id !== userId) {
                  user = friend.user1;
                } else {
                  user = friend.user2;
                }

                return (
                  <div
                    key={index}
                    className="w-full flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-black overflow-hidden">
                        <img
                          alt="Jack"
                          src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                          className="object-cover object-center"
                        />
                      </div>
                      <span className="w-32 m-2 font-light break-words text-left">
                        {user.firstName + " " + user.surname}
                      </span>
                    </div>
                    <div className="space-x-1">
                      <button
                        className="w-14 h-8 bg-green-500 rounded-md"
                        onClick={() => {
                          dispatch(
                            updateFriendRequest({
                              id: friend._id,
                              status: "accepted",
                            })
                          );
                          dispatch(getFriendRequest(userId));
                        }}
                      >
                        <span className="text-sm font-light">Accept</span>
                      </button>
                      <button
                        className="w-14 h-8 bg-red-500 rounded-md"
                        onClick={() => {
                          dispatch(removeFriend(friend._id));
                          dispatch(getFriendRequest(userId));
                        }}
                      >
                        <span className="text-sm font-light">Reject</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Friend;
