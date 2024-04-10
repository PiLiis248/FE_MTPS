import React from "react";
import axiosInstance from "../utils/axiosInstance";

export const facultyService = {
  getAllStudents() {
    return axiosInstance.get("/faculty_student");
  },
};

export default facultyService;
