import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getNotification, notificationSelector } from "./notificationSlice";
import { useHistory, useLocation } from "react-router-dom";
import { setPostId } from "./postSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const { notifications } = useSelector(notificationSelector);
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
      dispatch(getNotification());
    }
  }, [showDropdown]);

  React.useEffect(() => {}, [notifications]);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef}>
      <FontAwesomeIcon
        icon={faBell}
        className="cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {showDropdown && (
        <div className="absolute h-96 w-80 overflow-y-auto top-16 right-1.5 origin-top-right text-base z-50">
          <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-lg">
            {notifications.length === 0 && <span>No notification</span>}
            {notifications.length > 0 &&
              notifications.map((notification, index) => {
                return (
                  <div
                    key={index}
                    className="w-full p-2 flex items-center space-x-4 cursor-pointer hover:bg-gray-400"
                    onClick={() => {
                      history.push(
                        `/post/${
                          notification.post ? notification.post : "undefined"
                        }`
                      );
                    }}
                  >
                    <div className="w-10 h-10 rounded-full bg-black overflow-hidden">
                      {!notification.sender.profilePicture && (
                        <img
                          alt="Jack"
                          src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                          className="w-full h-full object-cover object-center"
                        />
                      )}
                      {notification.sender.profilePicture && (
                        <img
                          alt={notification.sender.firstName}
                          src={`data:image/png;base64, ${notification.sender.profilePicture}`}
                          className=" w-full h-full object-cover object-center"
                        />
                      )}
                    </div>
                    <span className="w-60 break-words text-left">
                      {notification.content}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
