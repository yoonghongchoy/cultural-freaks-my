import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Signup = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  return (
    <div className="relative w-screen h-screen inset-0 m-auto flex items-center justify-center">
      <div className="container mx-auto flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-lg w-80">
          <div className="p-4 border-b-2 text-left">
            <h1 className="text-4xl font-bold">Sign Up</h1>
            <p className="text-sm text-gray-400">It's quick and easy.</p>
          </div>
          <form className="p-4 flex flex-col">
            <input
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
              })}
              className="w-full mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
            />
            <input
              placeholder="Password"
              {...register("password", { required: true })}
              className="w-full mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold text-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
