import React from "react";
import axiosInstance from "../utils/axiosInstance";

export const postService = {
  getPost() {
    return axiosInstance.get("/posts");
  },
  getPostSpecific(postID) {
    return axiosInstance.post("/postSpecific", { postID });
  },
  getAttendees(id) {
    return axiosInstance.get(`/list_attendees/${id}`);
  },
  updatePost(postId, updatedPostData) {
    return axiosInstance.put(`/update_post_data`, { postId, updatedPostData });
  },
  createPost(formData) {
    return axiosInstance.post("/create_post", formData);
  },
  checkAttendance(postId, studentId) {
    return axiosInstance.put("/check_attendance", { postId, studentId });
  },
  getPostByCategory(categories) {
    const categoriesQuery = Array.isArray(categories)
      ? categories.join(",")
      : categories;
    return axiosInstance.get(`/postByCate`, {
      params: { categories: categoriesQuery },
    });
  },
};

export default postService;
