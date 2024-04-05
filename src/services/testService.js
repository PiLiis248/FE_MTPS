import React from 'react';
import axiosInstance from '../utils/axiosInstance';

export const testService = {
    getSpecificTest(testId) {return axiosInstance.get(`/specific_test/${ testId }`)},
    // doTest(answers, testId, profileId) {return axiosInstance.put(`/test_answer`), {answers, testId, profileId}}
    doTest(answers, testId, profileId) {
        return axiosInstance.put('/test_answer', {answers, testId, profileId})
    }
}

export default testService;
