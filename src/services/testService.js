import React from 'react';
import axiosInstance from '../utils/axiosInstance';

export const testService = {
    getSpecificTest(testId) {return axiosInstance.get(`/specific_test/${ testId }`)},
    doTest(answers, testId) {return axiosInstance.post(`/test_answer`), {answers, testId}}
}

export default testService;
