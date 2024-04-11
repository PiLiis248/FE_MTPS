import React from "react";
import axiosInstance from "../utils/axiosInstance";

export const facultyService = {
  getAllStudents() {
    return axiosInstance.get("/faculty_student");
  },
  getExpiredPost() {
    return axiosInstance.get("/expiredpost");
  },
};

export default facultyService;
