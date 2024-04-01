import React from 'react';
import axiosInstance from '../utils/axiosInstance';

export const testService = {
    getSpecificTest(testId) {return axiosInstance.get(`/specific_test/${ testId }`)}
}

export default testService;
