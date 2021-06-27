import React from "react";

const FriendPanel = ({ friends }) => {
  React.useEffect(() => {
    console.log(friends);
  }, [friends]);

  return (
    <div>
      {friends.length > 0 && (
        <div className="grid grid-cols-2 gap-x-32 gap-y-6">
          {friends.map((friend) => {
            return (
              <div className="flex items-center space-x-6 cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-black overflow-hidden">
                  <img
                    alt="Jack"
                    src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span>Lucius Choy</span>
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
