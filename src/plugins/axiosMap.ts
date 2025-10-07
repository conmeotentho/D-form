import { createAxiosInstance } from './createAxiosInstance';

const BASEURL = import.meta.env.VITE_API_URL_MAP;
const { axiosInstance, handleRequest, refresh_token } = createAxiosInstance(BASEURL);

export { handleRequest, refresh_token };
export default axiosInstance;
