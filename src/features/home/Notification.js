import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getNotification, notificationSelector } from "./notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const { notifications } = useSelector(notificationSelector);

  React.useEffect(() => {
    if (showDropdown) {
      dispatch(getNotification());
    }
  }, [showDropdown]);

  React.useEffect(() => {}, [notifications]);

  return (
    <div>
      <FontAwesomeIcon
        icon={faBell}
        className="cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {showDropdown && (
        <div className="absolute top-16 right-1.5 w-80 origin-top-right text-base">
          <div className="flex justify-center items-center p-2 bg-white rounded-md shadow-lg">
            {notifications.length === 0 && <span>No notification</span>}
            {notifications.length > 0 &&
              notifications.map((notification, index) => {
                return (
                  <div
                    key={index}
                    className="w-full flex items-center space-x-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-black overflow-hidden">
                      <img
                        alt="Jack"
                        src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                        className="object-cover object-center"
                      />
                    </div>
                    <span className="w-56 break-words">
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
