import React from "react";
import { useHistory } from "react-router-dom";

const FriendPanel = ({ friends, userId }) => {
  const history = useHistory();

  React.useEffect(() => {}, [friends]);

  return (
    <div>
      {friends.length > 0 && (
        <div className="grid grid-cols-2 gap-x-32 gap-y-6">
          {friends.map((friend, index) => {
            let user = "";

            if (friend.user1._id !== userId) {
              user = friend.user1;
            } else {
              user = friend.user2;
            }

            return (
              <div
                key={index}
                className="flex items-center space-x-6 cursor-pointer"
                onClick={() => history.push(`/profile/${user._id}`)}
              >
                <div className="w-16 h-16 rounded-full bg-black overflow-hidden">
                  <img
                    alt="Jack"
                    src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span>{user.firstName + " " + user.surname}</span>
                  <span className="text-sm">1 mutual friends</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {friends.length === 0 && <span>No friend found!</span>}
    </div>
  );
};

export default FriendPanel;
