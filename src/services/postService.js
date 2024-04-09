import React from 'react';
import axiosInstance from '../utils/axiosInstance';

export const postService = {
    getPost() {return axiosInstance.get("/posts")},
    getAttendees(postId) {return axiosInstance.get(`/list_attendees/${ postId }`)},
    updatePost(postId, updatedPostData) {return axiosInstance.put(`/update_post_data`, {postId, updatedPostData})},
    createPost(formData) {return axiosInstance.post("/create_post", formData)},
    checkAttendance(postId, studentId) {return axiosInstance.put("/check_attendance", { postId, studentId })}
}

export default postService;
