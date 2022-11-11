export interface UserState {
    user: any,
    message: null | string,
    loading: boolean,
    error: null | string
    isAuth: boolean,
    allUsers: [],
    roles: []
}

export enum UserActionTypes {
    START_REQUEST = "START_REQUEST",
    LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
    FORGOT_USER_PASSWORD_SUCCESS = "FORGOT_USER_PASSWORD_SUCCESS",
    LOGOUT_USER = "LOGOUT_USER",
    ALL_USERS_LOADED = "ALL_USERS_LOADED",
    GETROLES_SUCCESS = "GETROLES_SUCCESS",
    REGISTER_SUCCESS = "REGISTER_SUCCESS",
    PASSWORD_CHANGE_SUCCESS = "PASSWORD_CHANGE_SUCCESS",
    CHANGE_SUCCESS = "CHANGE_SUCCESS",
    UPDATE_USER = "UPDATE_USER",
    BLOCK_USER_SUCCESS = "BLOCK_USER_SUCCESS",

    UNBLOCK_USER_SUCCESS = "UNBLOCK_USER_SUCCESS",

    LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS",

    DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS",

    TOKEN_UPDATE_SUCCESS = "TOKEN_UPDATE_SUCCESS",

    SERVER_USER_ERROR = "SERVER_USER_ERROR",
    ERROR_MSG = "ERROR_MSG"
}
interface Error_MSG {
    type: UserActionTypes.ERROR_MSG,
    payload: any
}

interface UpdateTokenSuccess {
    type: UserActionTypes.TOKEN_UPDATE_SUCCESS,
    payload: any
}
interface DeleteUserSuccess {
    type: UserActionTypes.DELETE_USER_SUCCESS,
    payload: any
}
interface LogOutUserSuccess {
    type: UserActionTypes.LOG_OUT_SUCCESS,
    payload: any
}

interface UnblockUserSuccess {
    type: UserActionTypes.UNBLOCK_USER_SUCCESS,
    payload: any
}

interface BlockUserSuccess {
    type: UserActionTypes.BLOCK_USER_SUCCESS,
    payload: any
}

interface UpdateUser {
    type: UserActionTypes.UPDATE_USER,
    payload: any
}
interface ChangeUserPasswordActionSuccess {
    type: UserActionTypes.PASSWORD_CHANGE_SUCCESS,
    payload: any

}

interface ChangeUserInfoActionSuccess {
    type: UserActionTypes.CHANGE_SUCCESS,
    payload: any

}

interface RegisterUserActionSuccess {
    type: UserActionTypes.REGISTER_SUCCESS,
    payload: any
}

interface GetRolesActionSuccess {
    type: UserActionTypes.GETROLES_SUCCESS,
    payload: any
}
interface LOGOUT_USER {
    type: UserActionTypes.LOGOUT_USER
}

interface ForgotUserPasswordSuccessAction {
    type: UserActionTypes.FORGOT_USER_PASSWORD_SUCCESS,
    payload: any
}



interface StartRequestAction {
    type: UserActionTypes.START_REQUEST,
}

interface LoginUserSuccessAction {
    type: UserActionTypes.LOGIN_USER_SUCCESS
    payload: any
}



interface ServerUserErrorAction {
    type: UserActionTypes.SERVER_USER_ERROR,
    payload: any
}

interface AllUsersLoadedAction {
    type: UserActionTypes.ALL_USERS_LOADED,
    payload: any
}

export type UserActions = LOGOUT_USER
    | UpdateUser
    | RegisterUserActionSuccess
    | GetRolesActionSuccess
    | StartRequestAction
    | LoginUserSuccessAction
    | ForgotUserPasswordSuccessAction
    | AllUsersLoadedAction
    | ChangeUserInfoActionSuccess
    | ChangeUserPasswordActionSuccess
    | LogOutUserSuccess
    | UnblockUserSuccess
    | DeleteUserSuccess
    | UpdateTokenSuccess
    | BlockUserSuccess
    | ServerUserErrorAction
    | Error_MSG;