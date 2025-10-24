import axios from 'axios';
import { refreshTokenAPI } from '@/service/AuthService';
import { setSession } from '@/utils/jwt';

export function createAxiosInstance(BASEURL: string) {
  const axiosInstance = axios.create({
    baseURL: BASEURL,
    timeout: 30000,
    responseType: 'json', // ✅ Ép axios luôn parse JSON
    headers: {
      Accept: 'application/json',
    },
  });

  const handleResponse = async (response: any) => {
    return response;
  };

  // Request interceptor for API calls
  axiosInstance.interceptors.request.use((config: any) => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    if (access_token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${access_token}`,
        refresh_token: `${refresh_token}`
      };
    }
    config.method = config.method.toUpperCase();
    return config;
  });

  axiosInstance.interceptors.response.use(handleResponse, async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refresh_token();
      return axiosInstance(originalRequest);
    }

    if (error.response && error.response.status === 401) {
      setSession(null, null);
      window.location.href = '/auth/login';
    }

    throw error;
  });

  const refresh_token = async () => {
    const refresh_token = localStorage.getItem('refresh_token') as string;
    const urlencoded = new URLSearchParams();
    urlencoded.append('refresh_token', refresh_token);
    const { status, data, message } = await refreshTokenAPI(urlencoded);
    if (status === 200) {
      setSession(data?.access_token, data?.refresh_token);
    } else {
      throw message;
    }
  };

  const handleRequest = async (config: any) => {
    try {
      const resp = await axiosInstance(config);
      return resp;
    } catch (error: any) {
      console.log(error);
      if (error.response) return error.response;
      return { code: '408', message: error.message };
    }
  };

  return { axiosInstance, handleRequest, refresh_token };
}
