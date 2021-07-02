import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getSearch, searchSelector, setSearchQuery } from "./searchSlice";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { searchResult, searchQuery } = useSelector(searchSelector);

  React.useEffect(() => {
    if (searchQuery) {
      dispatch(getSearch(searchQuery));
    }
  }, [searchQuery]);

  React.useEffect(() => {}, [searchResult]);

  return (
    <div className="w-search-bar">
      <div className="flex items-center justify-between bg-white">
        <input
          placeholder="Search bar"
          className="h-10 w-full p-4"
          value={searchQuery}
          onChange={(event) => dispatch(setSearchQuery(event.target.value))}
        />
        {searchQuery && (
          <FontAwesomeIcon
            icon={faTimes}
            className="w-full mx-2 cursor-pointer"
            onClick={() => dispatch(setSearchQuery(""))}
          />
        )}
      </div>
      {searchQuery && (
        <div className="absolute w-search-bar max-w-2xl mt-1 left-auto z-50">
          <div className="w-full flex flex-col bg-white shadow-lg text-left">
            {searchResult.users.length === 0 &&
              searchResult.posts.length === 0 && <span>No result found!</span>}
            {searchResult.users.length > 0 &&
              searchResult.users.map((user, index) => (
                <div
                  key={index}
                  className="flex justify-between space-x-6 p-3 items-center hover:bg-gray-300"
                  onClick={() => {
                    dispatch(setSearchQuery(""));
                    history.push(`/profile/${user._id}`);
                  }}
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-7 h-7 rounded-full bg-black overflow-hidden">
                      <img
                        alt="Jack"
                        src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                        className="object-cover object-center"
                      />
                    </div>
                    <span className="text-lg">
                      {user.firstName + " " + user.surname}
                    </span>
                  </div>
                  <span className="text-gray-500">user</span>
                </div>
              ))}
            {searchResult.posts.length > 0 &&
              searchResult.posts.map((post, index) => (
                <div
                  key={index}
                  className="flex justify-between space-x-6 p-3 items-center hover:bg-gray-300"
                  onClick={() => {
                    dispatch(setSearchQuery(""));
                    history.push(`/post/${post._id}`);
                  }}
                >
                  <span className="text-lg">
                    {post.content.length > 60
                      ? post.content.substring(0, 60) + "..."
                      : post.content}
                  </span>
                  <span className="text-gray-500">post</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
