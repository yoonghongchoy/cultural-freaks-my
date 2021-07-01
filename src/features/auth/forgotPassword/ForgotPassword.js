import React from "react";
import backgroundImage from "../../../assets/images/background-image.jpeg";
import { ReactComponent as CheckedIcon } from "../../../assets/icons/checked.svg";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { authSelector, forgotPassword } from "../authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { forgotPasswordSent } = useSelector(authSelector);

  const onSubmit = (data) => {
    dispatch(forgotPassword(data.email));
  };

  React.useEffect(() => {}, [forgotPasswordSent]);

  return (
    <div
      className="fixed h-screen w-screen flex justify-center items-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {!forgotPasswordSent && (
        <div className="flex flex-col w-96 p-4 rounded-md bg-white">
          <span className="text-3xl mb-1">Forgot Password</span>
          <span className="mb-3">Please enter your email</span>
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
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold text-lg"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {forgotPasswordSent && (
        <div className="flex flex-col items-center justify-center w-96 p-10 rounded-md bg-white space-y-4">
          <CheckedIcon className="w-40 h-40" />
          <span className="text-xl">Email sent</span>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
