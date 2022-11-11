import { UserActionTypes, UserActions } from "../../reducers/userReducer/types";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import {
  login, RegisterUser, changeInfo, GetAllRoles, forgotPassword, changePassword,
  removeTokens, getUsers, BlockUser, UnblockUser, Log_Out, DeleteUser, setAccessToken,
  setRefreshToken
} from "../../../services/api-user-service";
import jwtDecode from "jwt-decode";


export const LoginUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await login(user);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.ERROR_MSG,
          payload: data.response.message,
        });
        toast.error(response.message);
      } else {
        const { accessToken, refreshToken, message } = data.response;

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        AuthUser(accessToken, message, dispatch);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const ForgotPassword = (email: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await forgotPassword(email);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.ERROR_MSG,
          payload: data.response,
        });
        toast.error(response.message);
      } else {
        dispatch({
          type: UserActionTypes.FORGOT_USER_PASSWORD_SUCCESS,
          payload: data.response,
        });
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const LogOut = (email: string) => {
  return async (dispatch: Dispatch<UserActions>) => {



    try {
      const data = await Log_Out(email);
      const { response } = data;

      if (response.isSuccess) {
        dispatch({ type: UserActionTypes.LOG_OUT_SUCCESS, payload: "Log_Out Success" });
        toast("Logout Success");
      }
      else {
        dispatch({ type: UserActionTypes.ERROR_MSG, payload: "Log_Out Error" });
      }
    } catch (error) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "LogOut user error",
      });
    }
    removeTokens();
    dispatch({
      type: UserActionTypes.LOGOUT_USER
    });
  }
}

export const AuthUser = (token: string, message: string, dispatch: Dispatch<UserActions>) => {
  const decodedToken = jwtDecode(token) as any;
  dispatch({
    type: UserActionTypes.LOGIN_USER_SUCCESS,
    payload: {
      message,
      decodedToken
    },
  });
};
export const UserDelete = (email: string) => {

  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await DeleteUser(email);
      const { response } = data;

      if (response.isSuccess) {
        dispatch({
          type: UserActionTypes.DELETE_USER_SUCCESS,
          payload: "User Deleted",
        });
        toast("User Deleted")
      }
      else {
        dispatch({
          type: UserActionTypes.ERROR_MSG,
          payload: "User Deleted error",
        });
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Block user error",
      });
    }
  }
}
export const UserBlock = (email: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await BlockUser(email);
      const { response } = data;
      if (response.isSuccess) {
        dispatch({
          type: UserActionTypes.BLOCK_USER_SUCCESS,
          payload: "User blocked",
        });
        toast("User Blocked")
      }
      else {
        dispatch({
          type: UserActionTypes.ERROR_MSG,
          payload: "Unknown error",
        });
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Block user error",
      });
    }
  }
}
export const UserUnblock = (email: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await UnblockUser(email);

      const { response } = data;
      if (response.isSuccess) {
        dispatch({
          type: UserActionTypes.UNBLOCK_USER_SUCCESS,
          payload: "User unblocked",
        });
        toast("User Unblocked")
      }
      else {
        dispatch({
          type: UserActionTypes.ERROR_MSG,
          payload: "Unblock user error",
        });
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  }
}
export const GetUsers = (pageNumber: number, pageSize: number) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await getUsers(pageNumber, pageSize);
      const { response } = data;

      if (response.isSuccess) {
        dispatch({
          type: UserActionTypes.ALL_USERS_LOADED,
          payload: response,
        });
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
}
export const ChangePassword = (passwordchange: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });

      const data = await changePassword(passwordchange);

      const { response } = data;

      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.ERROR_MSG,
          payload: data.response.message,
        });
        toast.error(response.message);
      } else {

        dispatch({
          type: UserActionTypes.PASSWORD_CHANGE_SUCCESS,
          payload: data.response,

        });
        toast(data.response.message);


      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};
export const ChangeInfo = (Info: any, IsMyProfile: boolean) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });

      const data = await changeInfo(Info);

      const { response } = data;

      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.ERROR_MSG,
          payload: data.response.message,
        });
        toast.error(response.message);
      } else {

        dispatch({
          type: UserActionTypes.CHANGE_SUCCESS,
          payload: data.response,

        });
        if (IsMyProfile) {
          const { accessToken, refreshToken, message } = data.response;

          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          AuthUser(accessToken, message, dispatch);

        }
        toast(data.response.message);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};
export const UpdateUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    dispatch({
      type: UserActionTypes.CHANGE_SUCCESS,
      payload: user
    });
  }
}
export const registerUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });

      const data = await RegisterUser(user);
      const { response } = data;

      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.ERROR_MSG,
          payload: data.response.message,
        });
        toast.error(response.message);
      } else {
        dispatch({
          type: UserActionTypes.REGISTER_SUCCESS,
          payload: data.response.message,
        });
        toast(data.response.message);

      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};
export const GetRoles = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await GetAllRoles();
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.ERROR_MSG,
          payload: data.response.message,
        });
        toast.error(response.message);
      } else {


        dispatch({
          type: UserActionTypes.GETROLES_SUCCESS,
          payload: response,
        });


      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};
