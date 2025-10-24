import axios from 'axios';
import { refreshTokenAPI } from '@/service/AuthService';
import { setSession } from '@/utils/jwt';

export function createAxiosInstance() {
  const BASEURL = 'http://10.165.68.7:30216';
  const axiosInstance = axios.create({
    baseURL: BASEURL,
    timeout: 30000,
  });

  const handleResponse = async (response: any) => {
    return response;
  };

  // Request interceptor for API calls
  axiosInstance.interceptors.request.use((config: any) => {
    const lowcoderStorage = localStorage.getItem('lowcoder_app_local_storage');
    let access_token = null;
    let refresh_token = null;

    if (lowcoderStorage) {
      try {
        const parsed = JSON.parse(lowcoderStorage);
        access_token = parsed?.access_token || null;
        refresh_token = parsed?.refresh_token || null;
      } catch (e) {
        console.warn('Không parse được lowcoder_app_local_storage:', e);
      }
    }
    access_token = access_token || localStorage.getItem('access_token');
    refresh_token = refresh_token  || localStorage.getItem('refresh_token');


    if (access_token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${access_token}`,
        RefreshToken: `${access_token}`
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
