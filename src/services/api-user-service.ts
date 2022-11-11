import axios from "axios";



const instance = axios.create({
  baseURL: "http://20.163.234.208:4444/api/User",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config: any) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {

    return res;
  },
  async (err) => {
    console.log("Error ", err)
    const originalConfig = err.config;
    if (err.response) {
      // Validation failed, ...
      console.log("Interceptors", err.response)
      if (err.response.status === 400 && err.response.data) {
        return Promise.reject(err.response.data);
      }
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry && getAccessToken() != null) {
        originalConfig._retry = true;
        try {
          const rs = await refreshAccessToken();
          const { accessToken, refreshToken } = rs.data;
          setRefreshToken(refreshToken)
          setAccessToken(accessToken)
          instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
          return instance(originalConfig);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
      // Backend not started, ...
      if (err.response.status === 404) {
        if (axios.isAxiosError(err)) {
          console.log("err.response.status === 404 ", err)
          return Promise.reject(err.response.data);
        }
        return;
        // Else Toast
      }
    }
    return Promise.reject(err);
  }
);

function refreshAccessToken() {

  return instance.post("/RefreshToken", {
    token: getAccessToken(),
    refreshToken: getrefreshToken()
  });
}


const responseBody: any = (response: any) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then().then(responseBody),
  post: (url: string, body?: any) =>
    instance.post(url, body).then().then(responseBody),
  put: (url: string, body?: string) =>
    instance.put(url, body).then().then(responseBody),
  patch: (url: string, body: string) =>
    instance.patch(url, body).then().then(responseBody),
  del: (url: string) => instance.delete(url).then().then(responseBody),
};

const User = {
  login: (user: any) => requests.post(`/login`, user),

  forgotPassword: (email: string) => requests.post(`/ForgotPassword`, email),
  getUsers: (pageNumber: number, pageSize: number) => {


    return requests.post(`/GetUsers`, { pageNumber: pageNumber, pageSize: pageSize });
  },

  getRoles: () => requests.get(`/GetAllRoles`),
  DeleteUser: (email: string) => requests.get(`/DeleteUser?email=${email}`),
  LogOut: (email: string) => requests.get(`/LogOut?email=${email}`),
  BlockUser: (email: string) => requests.get(`/BlockUser?email=${email}`),
  UnblockUser: (email: string) => requests.get(`/UnblockUser?email=${email}`),
  register: (registerUser: any) => requests.post(`/register`, registerUser),
  changeInfo: (changeInfo: any) => requests.post(`/ChangeInfoUser`, changeInfo),
  changePassword: (changePassword: any) => requests.post(`/ChangeUserPassword`, changePassword),
};

export async function Log_Out(email: string) {

  const data = await User.LogOut(email)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}
export async function DeleteUser(email: string) {

  const data = await User.DeleteUser(email)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}
export async function UnblockUser(email: string) {

  const data = await User.UnblockUser(email)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}
export async function BlockUser(email: string) {
  const data = await User.BlockUser(email)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}
export async function changePassword(changePassword: any) {
  const data = await User.changePassword(changePassword)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}
export async function changeInfo(changeInfo: any) {
  const data = await User.changeInfo(changeInfo)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}
export async function login(user: any) {
  const data = await User.login(user)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function forgotPassword(email: string) {
  const data = await User.forgotPassword(email)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function getUsers(pageNumber: number, pageSize: number) {
  const data = await User.getUsers(pageNumber, pageSize)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}
export async function GetAllRoles() {
  const data = await User.getRoles()
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}
export async function RegisterUser(registerUser: any) {
  const data = await User.register(registerUser)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export function setAccessToken(token: string) {
  window.localStorage.setItem("accessToken", token)
}

export function setRefreshToken(token: string) {
  window.localStorage.setItem("refreshToken", token)
}

export function getAccessToken(): null | string {
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken
}

export function getrefreshToken(): null | string {
  const refreshToken = window.localStorage.getItem("refreshToken");
  return refreshToken
}

export function removeTokens() {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
}
