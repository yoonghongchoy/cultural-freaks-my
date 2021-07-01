import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPostState,
  createPosts,
  postSelector,
  setShowCreateDialog,
} from "../postSlice";
import { stateName } from "../../../constants/state";
import { subCategoryList } from "../../../constants/subCategoryList";

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
  const [subCategory, setSubCategory] = React.useState([]);
  const [openCategoryModal, setOpenCategoryModal] = React.useState(false);

  const onSubmit = (data) => {
    const { content, state } = data;

    const hashtag = [];

    if (state) {
      hashtag.push(`#${state.replace(/\s+/g, "")}`);
    }

    if (subCategory.length > 0) {
      for (const category of subCategory) {
        hashtag.push(`#${category.replace(/\s+/g, "")}`);
      }
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
    <div className="relative w-screen h-screen">
      <div className="absolute z-10 w-screen h-screen inset-0 m-auto flex items-center justify-center bg-gray-300 bg-opacity-75">
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
            <form
              className="p-4 flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <textarea
                placeholder="Write your content here..."
                {...register("content", {
                  required: "Content is empty",
                })}
                className="w-full h-44 mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md
                focus:ring-1 ring-cyan-500 resize-none"
              />
              <div className="w-full flex justify-between space-x-4">
                <div className="w-2/4 flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    <span>State: </span>
                    <select
                      {...register("state", {
                        required: "Please select a state",
                      })}
                      className="w-full border border-black rounded-md p-2"
                    >
                      <option value="">Please select</option>
                      {stateName.map((state, index) => {
                        return (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sub-Category: </span>
                    <div
                      className="p-1 bg-gray-300 select-none cursor-pointer"
                      onClick={() => setOpenCategoryModal(true)}
                    >
                      <span>Add</span>
                    </div>
                  </div>
                  <div className="h-32 my-2 border border-gray-400 p-2 overflow-y-auto text-left flex flex-col">
                    {subCategory.length === 0 && (
                      <span className="text-xs justify-self-center self-center select-none">
                        No sub-category chosen
                      </span>
                    )}
                    {subCategory.length > 0 && (
                      <div className="flex flex-col">
                        {subCategory.map((category, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-sm font-light">
                              {category}
                            </span>
                            <FontAwesomeIcon
                              icon={faTimes}
                              className="fill-current text-red-600 cursor-pointer"
                              onClick={() =>
                                setSubCategory(
                                  subCategory.filter(
                                    (item) => item !== category
                                  )
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
                          <span className="text-xs break-words">
                            {item.name}
                          </span>
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
      {openCategoryModal && (
        <div className="absolute z-20 w-screen h-screen inset-0 m-auto flex items-center justify-center bg-gray-300 bg-opacity-75">
          <div className="container mx-auto flex flex-col items-center">
            <div className="w-56 p-3 bg-white shadow-lg">
              <div className="flex justify-between items-center border-b-2 text-left">
                <span>Sub-Category</span>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="cursor-pointer"
                  onClick={() => setOpenCategoryModal(false)}
                />
              </div>
              <div className="flex flex-col text-left p-1">
                {subCategoryList.map((category, index) => {
                  const disable = subCategory.includes(category);

                  return (
                    <div
                      key={index}
                      className={`text-left ${
                        disable ? "text-gray-200" : "hover:bg-gray-400"
                      }`}
                      disabled={disable}
                      onClick={() => setSubCategory([...subCategory, category])}
                    >
                      {category}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
