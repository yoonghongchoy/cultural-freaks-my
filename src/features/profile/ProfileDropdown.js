import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const ProfileDropdown = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("accessToken");
    history.push("/");
  };

  return (
    <div className="absolute top-16 right-1.5 w-32 origin-top-right">
      <div className="flex justify-center items-center py-2 bg-white rounded-md shadow-lg">
        <button
          className="flex justify-center items-center w-full"
          onClick={() => logout()}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
