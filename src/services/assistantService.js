import React from "react";
import axiosInstance from "../utils/axiosInstance";

export const assistantService = {
  getAllStudents() {
    return axiosInstance.get("/assistant_student");
  },
  getExpiredPost() {
    return axiosInstance.get("/expiredpost");
  },
};

export default assistantService;
