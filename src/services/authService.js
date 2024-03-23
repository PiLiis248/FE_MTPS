import axiosInstance from "../utils/axiosInstance";


export const authService = {
  login(payload = {}) {
    return axiosInstance.post(`/login`, payload);
  },
  logout() {
    return axiosInstance.post(`/logout`);
  },
  
};

export default authService;