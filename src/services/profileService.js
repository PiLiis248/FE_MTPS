import React from 'react';
import axiosInstance from '../utils/axiosInstance';

export const profileService = {
    changePassword(id, currentPassword, newPassword) {
        return axiosInstance.put(`/change_password`, { id, currentPassword, newPassword });
    },
    updateTrainingPoint(id, totalPoints) {
        return axiosInstance.put(`/update_training_point`, { id, totalPoints });
    }
};


export default profileService;
