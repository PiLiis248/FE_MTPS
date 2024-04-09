// CreatePost.js

import {
  Button,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../public/assets/css/create_post.css";
import SideBar from "../../component/SideBar";
import { PATHS } from "../../constants/path";
import { useAuthContext } from "../../context/AuthContext";
import { postService } from "../../services/postService";
import testService from "../../services/testService";
import { message } from "antd";
const CreatePost = () => {
  const { profile } = useAuthContext();
  const navigate = useNavigate();
  const [testId, setTestId] = useState();
  const [open, setOpen] = useState(false);
  const [numQuestions, setNumQuestions] = useState(0);
  const [forms, setForms] = useState([]);
  const [target, setTarget] = useState("");
  const [formValues, setFormValues] = useState({});
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const initialFacultyName =
    localStorage.getItem("facultyName") || (profile ? profile.facultyName : "");

  const [formData, setFormData] = useState({
    name: "",
    facultyName: initialFacultyName,
    desc: "",
    status: true,
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    point: "",
    location: "",
    numberParticipants: "",
    stdJoin: [],
    testId: null,
  });
  useEffect(() => {
    localStorage.setItem("facultyName", formData.facultyName);
  }, [formData.facultyName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCreateActivity = async (e) => {
    e.preventDefault();
    try {
      const response = await postService.createPost(formData);
      navigate(PATHS.HOME);
      console.log(response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  /* START CREATE QUESTION FORM */
  const handleCreateForms = () => {
    const newForms = [];
    for (let i = 0; i < numQuestions; i++) {
      newForms.push(createForm(i));
    }
    setForms(newForms);
    setNumQuestions(0);
  };

  const handleFormValueChange = (index, fieldName, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [`${fieldName}-${index}`]: value,
    }));
  };

  const createForm = (index) => (
    <div key={index}>
      <Divider className="form__divider" />
      <Form layout="vertical">
        <Form.Item
          name={`question-${index}`}
          label={`Question ${index + 1}`}
          className="form-question"
        >
          <Input.TextArea
            rows={2}
            style={{ width: "50%" }}
            className="form-question-ques"
            onChange={(e) =>
              handleFormValueChange(index, "question", e.target.value)
            }
          />
        </Form.Item>
        <Form.Item label="Answers" className="form-answer">
          {["A", "B", "C", "D"].map((answerIndex) => (
            <Form.Item
              key={answerIndex}
              className={`form-answer-${index}-${answerIndex}`}
              name={`answer-${index}-${answerIndex}`}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginRight: "30px",
              }}
            >
              <Input
                placeholder={`Answer ${answerIndex}`}
                onChange={(e) =>
                  handleFormValueChange(
                    index,
                    `answer-${answerIndex}`,
                    e.target.value
                  )
                }
              />
            </Form.Item>
          ))}
        </Form.Item>
        <Form.Item label="Correct Answer" className="form-correct">
          <Select
            placeholder="Select correct answer"
            style={{ width: "50%" }}
            onChange={(value) =>
              handleFormValueChange(index, "correct-answer", value)
            }
          >
            {["A", "B", "C", "D"].map((answerIndex) => (
              <Option
                key={answerIndex}
                value={`answer-${index}-${answerIndex}`}
              >
                {`Answer ${answerIndex}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );

  const handleSubmit = async () => {
    try {
      const questions = convertFormDataToQuestions(formValues);
      const res = await testService.createTest(questions, target);
      setTestId(res?.data.newTestId);
      message.success("Create question successfully");
      setOpen(false);
      setFormValues({});
      setNumQuestions(0);
      setForms([]);
      setTarget("");
    } catch (error) {
      console.error("Error processing payment:", error);
      message.error("Failed create question");
    }
  };

  const convertFormDataToQuestions = (formValues) => {
    const questions = [];
    const numQuestions = Object.keys(formValues).filter((key) =>
      key.startsWith("question-")
    ).length;
    for (let i = 0; i < numQuestions; i++) {
      const question = formValues[`question-${i}`];
      const correctAnswer0 = formValues[`correct-answer-${i}`];
      const correctOption = correctAnswer0 ? correctAnswer0.slice(-1) : "";
      const options = [];
      for (let j = 0; j < 4; j++) {
        const optionId = String.fromCharCode(65 + j);
        const optionText = formValues[`answer-${optionId}-1`];
        options.push({ id: optionId, text: optionText });
      }

      questions.push({ question, correctOption, options });
    }

    return questions;
  };
  /* END CREATE QUESTION FORM */

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      testId: testId || null,
    }));
  }, [testId]);
  return (
    <div className="create-post-container">
      <SideBar className="sidebar-create" />
      <div className="form-create">
        <h2>Post Form</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">
              <strong>Topic event:</strong>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="facultyName">
              <strong>Faculty:</strong>
            </label>
            <input
              type="text"
              id="facultyName"
              name="facultyName"
              value={formData.facultyName}
              onChange={handleChange}
              readOnly={!!profile}
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc">
              <strong>Content:</strong>
            </label>
            <textarea
              id="desc"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="startDate">
              <strong>Open Form Date:</strong>
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />

            <label htmlFor="startTime">
              <strong>Open Form Time:</strong>
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">
              <strong>Close Form Date:</strong>
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />

            <label htmlFor="endTime">
              <strong>Close Form Time:</strong>
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">
              <strong>Event information:</strong>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="<place> _ <date> _ <time>"
            />
          </div>
          {/* Dropdown for Training Point */}
          <div className="form-group">
            <label htmlFor="point">
              <strong>Training Point:</strong>
            </label>
            <select
              id="point"
              name="point"
              value={formData.point}
              onChange={handleChange}
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="8">8</option>
              <option value="10">10</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="numberParticipants">
              <strong>Number of Participants:</strong>
            </label>
            <input
              type="number"
              id="numberParticipants"
              name="numberParticipants"
              value={formData.numberParticipants}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">
              <strong>Post Status:</strong>
            </label>
            <div className="switch-container">
              <span className={formData.status ? "private" : "public"}>
                Private
              </span>
              <label className="switch">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={() =>
                    setFormData((prevState) => ({
                      ...prevState,
                      status: !formData.status,
                    }))
                  }
                />
                <span className="slider round"></span>
              </label>
              <span className={formData.status ? "public" : "private"}>
                Public
              </span>
            </div>
          </div>
          <div className="form-group">
            <div className="create-buttons">
              <button
                className="create-activity-button"
                onClick={handleCreateActivity}
              >
                Create Activity
              </button>
              <div className="group__create-test">
                {testId ? (
                  <Button
                    className="create-test-button"
                    onClick={handleCreateActivity}
                  >
                    Create Test
                  </Button>
                ) : (
                  <div className="create-test-link">
                    <Button onClick={showDrawer} className="create-test-button">
                      Create Question
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <div className="creation_page">
          <h2
            style={{
              textAlign: "center",
              fontFamily: "pnb",
              fontSize: "40px",
              marginBottom: "30px",
            }}
          >
            Create Test
          </h2>
          <div className="target">
            <InputNumber
              placeholder="Enter target"
              style={{
                width: "40%",
                marginBottom: "30px",
              }}
              onChange={(value) => setTarget(value)}
            />
          </div>
          <div className="input-number" style={{ marginBottom: "30px" }}>
            <InputNumber
              placeholder="Enter number of questions"
              style={{
                width: "40%",
              }}
              onChange={(value) => setNumQuestions(value)}
            />
            <Button
              style={{ marginLeft: "30px" }}
              type="primary"
              onClick={handleCreateForms}
            >
              Create
            </Button>
          </div>
          <div className="forms-container">{forms}</div>
          <Button
            style={{ marginLeft: "10px" }}
            type="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default CreatePost;
