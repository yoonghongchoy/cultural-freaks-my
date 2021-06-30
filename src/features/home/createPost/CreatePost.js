import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPostState,
  createPosts,
  postSelector,
  setShowCreateDialog,
} from "../postSlice";
import { stateName } from "../../../constants/state";
import { transportationList } from "../../../constants/transportation";
import { foodList } from "../../../constants/food";
import { hotelList } from "../../../constants/hotel";

const CreatePost = () => {
  const dispatch = useDispatch();
  const {
    showCreateDialog,
    isLoading,
    isCreatePostsSuccess,
    isCreatePostsError,
    errorMessage,
  } = useSelector(postSelector);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const hiddenImageUploadInput = React.useRef(null);
  const hiddenVideoUploadInput = React.useRef(null);
  const [medias, setMedias] = React.useState([]);
  const [toastId, setToastId] = React.useState("");

  const onSubmit = (data) => {
    const { content, state, transportation, food, hotel } = data;

    const hashtag = [];

    if (state) {
      hashtag.push(`#${state.replace(/\s+/g, "")}`);
    }

    if (transportation) {
      hashtag.push(`#${transportation.replace(/\s+/g, "")}`);
    }

    if (food) {
      hashtag.push(`#${food.replace(/\s+/g, "")}`);
    }

    if (hotel) {
      hashtag.push(`#${hotel.replace(/\s+/g, "")}`);
    }

    const newPost = {
      content: content,
      hashtags: hashtag,
      medias,
    };
    dispatch(createPosts(newPost));
  };

  const convertFileToBase64 = (file, type) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (fileEvent) => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");

        const mediaObject = {
          name: file.name,
          value: base64String,
          type,
        };
        resolve(mediaObject);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUploadChange = async (event, type) => {
    const mediaUploaded = event.target.files;
    const mediaFile = [...medias];
    for (const mediaUploadedElement of mediaUploaded) {
      const mediaObject = await convertFileToBase64(mediaUploadedElement, type);
      mediaFile.push(mediaObject);
    }
    setMedias([...mediaFile]);
  };

  const deleteMedia = (index) => {
    const mediaFile = [...medias];
    mediaFile.splice(index, 1);
    setMedias([...mediaFile]);
  };

  React.useEffect(() => {
    return () => {
      dispatch(clearPostState());
    };
  }, []);

  React.useEffect(() => {
    if (isLoading) {
      const toastId = toast.loading("Loading");
      setToastId(toastId);
    } else {
      toast.dismiss(toastId);
    }

    if (isCreatePostsError) {
      toast.error(errorMessage);
      dispatch(clearPostState());
    }

    if (isCreatePostsSuccess) {
      dispatch(clearPostState());
      dispatch(setShowCreateDialog(!showCreateDialog));
    }
  }, [errorMessage, isCreatePostsError, isLoading, isCreatePostsSuccess]);

  React.useEffect(() => {
    if (errors.content && errors.content.type === "required") {
      toast.error(errors.content.message);
      delete errors.content;
    }
    if (errors.state && errors.state.type === "required") {
      toast.error(errors.state.message);
      delete errors.state;
    }
  }, [errors.content, errors.state]);

  return (
    <div className="relative w-screen h-screen inset-0 m-auto flex items-center justify-center bg-gray-300 bg-opacity-75">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-lg w-create-post-container">
          <div className="flex justify-between items-center p-4 border-b-2 text-left">
            <span>Create Post</span>
            <FontAwesomeIcon
              icon={faTimes}
              className="cursor-pointer"
              onClick={() => dispatch(setShowCreateDialog(!showCreateDialog))}
            />
          </div>
          <form className="p-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <textarea
              placeholder="Write your content here..."
              {...register("content", {
                required: "Content is empty",
              })}
              className="w-full h-44 mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md
                focus:ring-1 ring-cyan-500 resize-none"
            />
            <div className="w-full flex justify-between space-x-4">
              <div className="w-44 flex flex-col space-y-3">
                <select
                  {...register("state", { required: "Please select a state" })}
                  className="w-full border border-black rounded-md p-2"
                >
                  <option value="">State</option>
                  {stateName.map((state, index) => {
                    return (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    );
                  })}
                </select>
                <select
                  {...register("transportation")}
                  className="w-full border border-black rounded-md p-2"
                >
                  <option value="">Transportation</option>
                  {transportationList.map((transportation, index) => {
                    return (
                      <option key={index} value={transportation}>
                        {transportation}
                      </option>
                    );
                  })}
                </select>
                <select
                  {...register("food")}
                  className="w-full border border-black rounded-md p-2"
                >
                  <option value="">Food</option>
                  {foodList.map((food, index) => {
                    return (
                      <option key={index} value={food}>
                        {food}
                      </option>
                    );
                  })}
                </select>
                <select
                  {...register("hotel")}
                  className="w-full border border-black rounded-md p-2"
                >
                  <option value="">Hotel</option>
                  {hotelList.map((hotel, index) => {
                    return (
                      <option key={index} value={hotel}>
                        {hotel}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col justify-between w-2/4">
                <div className="flex items-center space-x-4">
                  <div className="w-24 bg-gray-300 p-1 cursor-pointer">
                    <div
                      className="select-none"
                      onClick={() => hiddenImageUploadInput.current.click()}
                    >
                      Image
                    </div>
                    <input
                      ref={hiddenImageUploadInput}
                      type="file"
                      name="image"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => handleUploadChange(event, "image")}
                      multiple
                    />
                  </div>
                  <div className="w-24 bg-gray-300 p-1 cursor-pointer">
                    <div
                      className="select-none"
                      onClick={() => hiddenVideoUploadInput.current.click()}
                    >
                      Video
                    </div>
                    <input
                      ref={hiddenVideoUploadInput}
                      type="file"
                      name="video"
                      accept="video/*"
                      className="hidden"
                      onChange={(event) => handleUploadChange(event, "video")}
                      multiple
                    />
                  </div>
                </div>
                <div className="h-32 my-2 border border-gray-400 p-2 overflow-x-auto overflow-y-auto text-left flex flex-col">
                  {medias.length === 0 && (
                    <span className="text-xs justify-self-center self-center select-none">
                      No file
                    </span>
                  )}
                  {medias.length > 0 &&
                    medias.map((item, index) => (
                      <div
                        key={index}
                        className="my-1 flex justify-between items-center"
                      >
                        <span className="text-xs break-words">{item.name}</span>
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="fill-current text-red-600 cursor-pointer"
                          onClick={() => deleteMedia(index)}
                        />
                      </div>
                    ))}
                </div>
                <button
                  type="submit"
                  className="w-full self-center bg-gray-300 p-1 select-none"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
