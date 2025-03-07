
import axiosInstance from "../utils/axiosInstance";

export const profileService = {
  changePassword(id, currentPassword, newPassword) {
    return axiosInstance.put(`/change_password`, {
      id,
      currentPassword,
      newPassword,
    });
  },

  updateTrainingPoint(id, totalPoints) {
    return axiosInstance.put(`/update_training_point`, { id, totalPoints });
  },

  getPoint(id) {
    return axiosInstance.post("/point_category", { id });
  },

  searchStudent(studentId, faculty) {
    return axiosInstance.post("/searchStudentWithPoint", {
      studentId,
      faculty,
    });
  },

  getStudent(faculty) {
    return axiosInstance.post("/studentByF", {
      faculty,
    });
  },
  
  updateDiscipline(studentId, name, point) {
    return axiosInstance.post("/update-discipline", { studentId, name, point });
  },
};

export default profileService;
