import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import backgroundImage from "../../../assets/images/background-image.jpeg";
import { ReactComponent as CheckedIcon } from "../../../assets/icons/checked.svg";
import { useForm } from "react-hook-form";
import { authSelector, resetPassword } from "../authSlice";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const { register, handleSubmit } = useForm();
  const { passwordReset } = useSelector(authSelector);

  const onSubmit = (data) => {
    const token = query.get("token");
    const { email, password } = data;
    dispatch(resetPassword({ token, email, password }));
  };

  React.useEffect(() => {
    if (passwordReset) {
      history.push("/");
    }
  }, [passwordReset]);

  return (
    <div
      className="fixed h-screen w-screen flex justify-center items-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="flex flex-col w-96 p-4 rounded-md bg-white">
        <span className="text-3xl mb-3">Reset Password</span>
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
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
            className="w-full mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md
                focus:ring-1 ring-cyan-500"
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold text-lg"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
