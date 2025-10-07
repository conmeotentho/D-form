import { handleRequest } from "@/plugins/axiosAuth";

// export const signin = async (data) => {
//   let config = {
//     url: '/api/auth/login',
//     method: 'POST',
//     data
//   };
//   return handleRequest(config);
// };

export const refreshTokenAPI = async (data: URLSearchParams) => {
  const config = {
    method: 'post',
    url: '/refresh-token',
    data
  };

  return handleRequest(config);
};

// export const signout = async (data) => {
//   let config = {
//     url: '/api/users',
//     method: 'POST',
//     data
//   };
//   return handleRequest(config);
// };