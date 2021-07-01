import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { authSelector, clearState, setShowSignup, signup } from "../authSlice";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast, Toaster } from "react-hot-toast";

const Signup = () => {
  const dispatch = useDispatch();
  const { isSuccess, isError, errorMessage, showSignup } =
    useSelector(authSelector);
  const { register, handleSubmit } = useForm();
  const current = moment().toObject();
  const currentMonth = current.months + 1;
  const currentYear = current.years;
  const currentDay = current.date;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const minOffset = 0;
  const maxOffset = 116;
  const [daysList, setDaysList] = React.useState([]);
  const [monthsList, setMonthsList] = React.useState([]);
  const [yearsList, setYearsList] = React.useState([]);
  const [day, setDay] = React.useState(currentDay);
  const [month, setMonth] = React.useState(currentMonth);
  const [year, setYear] = React.useState(currentYear);

  const onSubmit = (data) => {
    dispatch(signup({ ...data, dob: `${year}-${month}-${day}` }));
    dispatch(setShowSignup(!showSignup));
  };

  React.useEffect(() => {
    const monthsList =
      months.length > 0 &&
      months.map((item, i) => {
        return (
          <option key={i} value={i + 1}>
            {item}
          </option>
        );
      });
    setMonthsList([...monthsList]);

    const yearsList = [];
    for (let i = minOffset; i <= maxOffset; i++) {
      const y = currentYear - i;
      const yearOption = (
        <option key={y} value={y}>
          {y}
        </option>
      );
      yearsList.push(yearOption);
    }
    setYearsList([...yearsList]);
  }, []);

  React.useEffect(() => {
    const daysList = [];
    for (
      let i = 1;
      i <= moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
      i++
    ) {
      const dayOption = (
        <option key={i} value={i}>
          {i}
        </option>
      );
      daysList.push(dayOption);
    }
    setDaysList([...daysList]);
  }, [month, year]);

  React.useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      toast.success("Please activate your account.");
      dispatch(clearState());
    }
  }, [isError, isSuccess]);

  return (
    <div className="relative w-screen h-screen inset-0 m-auto flex items-center justify-center bg-gray-300 bg-opacity-75">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto flex flex-col items-center ">
        <div className="bg-white rounded-lg shadow-lg w-96">
          <div className="p-4 border-b-2 text-left">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold mb-1">Sign Up</h1>
              <FontAwesomeIcon
                icon={faTimes}
                className="text-gray-500 cursor-pointer"
                onClick={() => dispatch(setShowSignup(!showSignup))}
              />
            </div>
            <p className="text-sm text-gray-400">It's quick and easy.</p>
          </div>
          <form className="p-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex space-x-1">
              <input
                placeholder="First name"
                {...register("firstName", {
                  required: true,
                })}
                className="w-full mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md
                focus:ring-1 ring-cyan-500"
              />
              <input
                placeholder="Surname"
                {...register("surname", {
                  required: true,
                })}
                className="w-full mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md
                focus:ring-1 ring-cyan-500"
              />
            </div>
            <input
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
              })}
              className="w-full mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
            />
            <input
              type="password"
              placeholder="New Password"
              {...register("password", { required: true })}
              className="w-full mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
            />
            <span className="text-left text-sm text-gray-500">
              Date of birth
            </span>
            <div className="flex space-x-2 h-12 mb-3">
              <select
                className="flex-1 rounded-md border border-gray-400"
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
              >
                {daysList}
              </select>
              <select
                className="flex-1 rounded-md border border-gray-400"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
              >
                {monthsList}
              </select>
              <select
                className="flex-1 rounded-md border border-gray-400"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {yearsList}
              </select>
            </div>
            <span className="text-left text-sm text-gray-500">Gender</span>
            <div className="flex space-x-2 h-12 mb-3">
              <div className="flex flex-1 items-center justify-between p-4 rounded-md border border-gray-400">
                <label>Male</label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  {...register("gender", { required: true })}
                />
              </div>
              <div className="flex flex-1 items-center justify-between p-4 rounded-md border border-gray-400">
                <label>Female</label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  {...register("gender", { required: true })}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold text-lg"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
