import React from 'react';
import axiosInstance from '../utils/axiosInstance';

export const postService = {
    getPost() {return axiosInstance.get("/posts")},
    updatePost(postId, updatedPostData) {return axiosInstance.put(`/update_post_data`, {postId, updatedPostData})},
    createPost(formData) {return axiosInstance.post("/create_post", formData)},
    deletePost(id) {return axiosInstance.delete("/delete_post", {id})}
}

export default postService;
