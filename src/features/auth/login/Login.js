import React from "react";
import backgroundImage from "../../../assets/images/background-image.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authSelector, clearState, login, setShowSignup } from "../authSlice";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Signup from "../signup/Signup";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const { isFetching, isSuccess, isError, errorMessage, showSignup } =
    useSelector(authSelector);
  const [toastId, setToastId] = React.useState("");
  const [passwordShow, setPasswordShow] = React.useState(false);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  React.useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  React.useEffect(() => {
    if (isFetching) {
      const toastId = toast.loading("Loading");
      setToastId(toastId);
    } else {
      toast.dismiss(toastId);
    }

    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      history.push("/");
    }
  }, [isFetching, isError, isSuccess]);

  return (
    <div>
      <div
        className="fixed p-20 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <Toaster position="top-right" reverseOrder={false} />
        <div className="container mx-auto flex flex-col items-center">
          <div className="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                })}
                className="w-full mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md
                focus:ring-1 ring-cyan-500"
              />
              <div
                className="flex items-center justify-between w-full mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md
                focus:ring-1 ring-cyan-500"
              >
                <input
                  type={passwordShow ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className="flex-1"
                />
                <FontAwesomeIcon
                  icon={passwordShow ? faEye : faEyeSlash}
                  onClick={() => setPasswordShow(!passwordShow)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold text-lg"
              >
                Login
              </button>
            </form>
            <a className="text-center my-2">Forgot Password?</a>
            <hr />
            <button
              onClick={() => dispatch(setShowSignup(!showSignup))}
              className="w-full bg-green-500 mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg"
            >
              Register New Account
            </button>
          </div>
        </div>
        <div className="content text-3xl text-center md:text-left">
          <h1 className="text-5xl text-yellow-500 font-bold">
            CulturalFreaksMY
          </h1>
          <p className="text-white">Slogan...</p>
        </div>
      </div>
      {showSignup && <Signup />}
    </div>
  );
};

export default Login;
