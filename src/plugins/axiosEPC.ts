import { createAxiosInstance } from './createAxiosInstance';

const BASEURL = import.meta.env.VITE_APP_EPC_BASE_URL;
const { axiosInstance, handleRequest, refresh_token } = createAxiosInstance(BASEURL);

export { handleRequest, refresh_token };
export default axiosInstance;
