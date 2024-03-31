import React from 'react';
import axiosInstance from '../utils/axiosInstance';

export const postService = {
    getPost() {return axiosInstance.get("/posts")},
    updatePost(postId, updatedPostData) {return axiosInstance.put(`/update_post_data`, {postId, updatedPostData})},
    updateStdJoin(postId, stuId) {return axiosInstance.put(`/update_std_join`, {postId, stuId})}
}

export default postService;
