import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import moment from "moment";
import { editProfile, profileSelector } from "../profileSlice";
import { getPosts } from "../../home/postSlice";

const EditProfile = ({ onClose }) => {
  const dispatch = useDispatch();
  const { register, setValue, handleSubmit } = useForm();
  const { myProfile } = useSelector(profileSelector);
  const hiddenImageUploadInput = React.useRef(null);
  const current = moment(myProfile.dob).toObject();
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
  const [profilePicture, setProfilePicture] = React.useState(
    myProfile.profilePicture
  );

  const onSubmit = (data) => {
    data.dob = `${year}-${month}-${day}`;
    data.profilePicture = profilePicture;
    dispatch(editProfile(data));
    dispatch(getPosts({ userId: myProfile._id }));
    onClose(false);
  };

  const convertFileToBase64 = (file) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (fileEvent) => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        resolve(base64String);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUploadChange = async (event) => {
    const mediaUploaded = event.target.files[0];
    setProfilePicture(await convertFileToBase64(mediaUploaded));
  };

  React.useEffect(() => {
    setValue("firstName", myProfile.firstName);
    setValue("surname", myProfile.surname);
    setValue("gender", myProfile.gender);

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

  return (
    <div className="relative w-screen h-screen inset-0 m-auto flex items-center justify-center bg-gray-300 bg-opacity-75">
      <div className="container mx-auto flex flex-col items-center ">
        <div className="bg-white rounded-lg shadow-lg w-96 p-4 flex flex-col">
          <div className="border-b border-black flex justify-between items-center mb-3 pb-3">
            <span className="text-2xl">Edit profile</span>
            <FontAwesomeIcon
              icon={faTimes}
              className="text-gray-500 cursor-pointer"
              onClick={() => onClose(false)}
            />
          </div>
          <form
            className="flex flex-col space-y-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex justify-between items-center">
              <span>Profile picture: </span>
              <div className="w-56 p-1 flex justify-between items-center border border-black">
                <div className="w-20 h-20 rounded-full bg-black overflow-hidden">
                  {!profilePicture && (
                    <img
                      alt="Jack"
                      src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                      className="object-cover object-center"
                    />
                  )}
                  {profilePicture && (
                    <img
                      alt={myProfile.firstName}
                      src={`data:image/png;base64, ${profilePicture}`}
                      className="object-cover object-center"
                    />
                  )}
                </div>
                <div className="w-max bg-gray-300 p-1 cursor-pointer">
                  <div
                    className="select-none"
                    onClick={() => hiddenImageUploadInput.current.click()}
                  >
                    Upload
                  </div>
                  <input
                    ref={hiddenImageUploadInput}
                    type="file"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleUploadChange(event)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>First name: </span>
              <input
                placeholder="First name"
                {...register("firstName")}
                className="w-56 px-1 border border-black"
              />
            </div>
            <div className="flex justify-between items-center">
              <span>Surname: </span>
              <input
                placeholder="Surname"
                {...register("surname")}
                className="w-56 px-1 border border-black"
              />
            </div>
            <div className="flex justify-between items-center">
              <span>New password: </span>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-56 px-1 border border-black"
              />
            </div>
            <div className="flex justify-between items-center">
              <span>Date of birth:</span>
              <div className="w-56 flex space-x-2 h-6">
                <select
                  className="flex-1 border border-black"
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                >
                  {daysList}
                </select>
                <select
                  className="flex-1 border border-black"
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                >
                  {monthsList}
                </select>
                <select
                  className="flex-1 border border-black"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  {yearsList}
                </select>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Gender: </span>
              <div className="w-56 flex space-x-2 h-6">
                <div className="flex flex-1 items-center justify-between p-1 border border-black">
                  <label>Male</label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    {...register("gender", { required: true })}
                  />
                </div>
                <div className="flex flex-1 items-center justify-between p-1 border border-black">
                  <label>Female</label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    {...register("gender", { required: true })}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-32 self-center bg-yellow-500 text-white p-3 rounded-lg font-semibold text-lg"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
