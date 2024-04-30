import axiosInstance from "../utils/axiosInstance";

export const authService = {
  login(payload = {}) {
    return axiosInstance.post(`/login`, payload);
  },

  getProfile() {
    return axiosInstance.get("/profile");
  },
  
  logout() {
    return axiosInstance.post(`/logout`);
  },
  
};

export default authService;