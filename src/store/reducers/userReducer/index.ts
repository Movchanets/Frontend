import { UserState, UserActions, UserActionTypes } from "./types";

const initialState: UserState = {
  user: {},
  message: null,
  loading: false,
  error: null,
  isAuth: false,
  allUsers: [],
  roles: []
};

const UserReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.START_REQUEST:
      return { ...state, loading: true };
    case UserActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload.decodedToken,
        message: action.payload.message,
      };
    case UserActionTypes.ERROR_MSG:
      return { ...state, loading: false, message: action.payload.message };
    case UserActionTypes.SERVER_USER_ERROR:
      return { ...state, loading: false, message: action.payload.message };
    case UserActionTypes.GETROLES_SUCCESS:
      return { ...state, message: action.payload.message, roles: action.payload.payload, loading: false };

    case UserActionTypes.GETROLES_SUCCESS:
      return { ...state, message: action.payload.message, roles: action.payload.payload, loading: false };
    case UserActionTypes.SERVER_USER_ERROR:
      return { ...state, loading: false, message: action.payload.message };



    case UserActionTypes.LOGOUT_USER:
      return {
        isAuth: false,
        loading: false,
        user: null,
        message: null,
        error: null,
        allUsers: [],
        roles: []
      };
    case UserActionTypes.DELETE_USER_SUCCESS:
      return { ...state, loading: false, message: action.payload };


    case UserActionTypes.UNBLOCK_USER_SUCCESS:
      return { ...state, loading: false, message: action.payload };

    case UserActionTypes.BLOCK_USER_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case UserActionTypes.PASSWORD_CHANGE_SUCCESS:
      return { ...state, loading: false, message: action.payload };

    case UserActionTypes.REGISTER_SUCCESS:
      return { ...state, loading: false, message: action.payload };

    case UserActionTypes.UPDATE_USER:
      return { ...state, loading: false, user: action.payload }
    case UserActionTypes.CHANGE_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };

    case UserActionTypes.FORGOT_USER_PASSWORD_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };

    case UserActionTypes.ALL_USERS_LOADED:
      return { ...state, loading: false, message: action.payload.message, allUsers: action.payload.payload }
    default:
      return state;
  }
};

export default UserReducer;
