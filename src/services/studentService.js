import React from 'react';
import axiosInstance from '../utils/axiosInstance';

export const studentService = {
    getAllStudents() {return axiosInstance.get("/faculty_student")}
};


export default studentService;
