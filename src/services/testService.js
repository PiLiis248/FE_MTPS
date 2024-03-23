import React from 'react';
import axiosInstance from '../utils/axiosInstance';

export const testService = {
    getTest() {return axiosInstance.get(`/test/${testId}`)}
}

export default testService;
