
import axiosInstance from "../utils/axiosInstance";

export const testService = {
  getSpecificTest(testId) {
    return axiosInstance.get(`/specific_test?testId=${testId}`);
  },
 
  doTest(answers, testId, profileId) {
    return axiosInstance.post("/test_answer", { answers, testId, profileId });
  },

  createTest(questions, target) {
    return axiosInstance.post("/createtest", { questions, target });
  },
};

export default testService;
