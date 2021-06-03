import React from "react";
import { ReactComponent as LoadingIcon } from "../../../assets/loaders/loader.svg";
import { ReactComponent as ErrorIcon } from "../../../assets/icons/error.svg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { activateAccount, authSelector, clearState } from "../authSlice";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ActivateAccount = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(authSelector);
  const query = useQuery();

  React.useEffect(() => {
    dispatch(clearState());
    dispatch(activateAccount(query.get("token")));
  }, []);

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      history.push("/");
    }

    if (isError) {
      console.log(errorMessage);
    }
  }, [isFetching, isSuccess, isError]);

  return (
    <div className="flex h-screen">
      {isFetching && (
        <div className="flex flex-col m-auto">
          <LoadingIcon />
          <h1>Activating</h1>
        </div>
      )}
      {isError && (
        <div className="flex flex-col m-auto space-y-5">
          <ErrorIcon />
          <h1>Activate failed</h1>
        </div>
      )}
    </div>
  );
};

export default ActivateAccount;
