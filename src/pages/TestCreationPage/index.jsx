import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select, Divider } from "antd";
import "../../../public/assets/css/testPage.css";
import testService from "../../services/testService";
import { message } from "antd";
import { PATHS } from "../../constants/path";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const TestCreationPage = () => {
  const [numQuestions, setNumQuestions] = useState(0);
  const [forms, setForms] = useState([]);
  const [target, setTarget] = useState("");
  const [formValues, setFormValues] = useState({});
  const [testId, setTestId] = useState();
  const navigate = useNavigate();
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
            style={{ width: "20%" }}
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
      navigate(PATHS.CREATE_POST);
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
      const correctAnswer = correctAnswer0 ? correctAnswer0.slice(-1) : "";
      const options = [];
      for (let j = 0; j < 4; j++) {
        const optionId = String.fromCharCode(65 + j);
        const optionText = formValues[`answer-${optionId}-1`];
        options.push({ id: optionId, text: optionText });
      }

      questions.push({ question, correctAnswer, options });
    }

    return questions;
  };

  return (
    <div className="creation_page">
      <h2 style={{ textAlign: "center", fontFamily: "pnb", fontSize: "40px" }}>
        Create Test
      </h2>
      <div className="target">
        <InputNumber
          placeholder="Enter target"
          style={{
            width: "15%",
            marginBottom: "30px",
          }}
          onChange={(value) => setTarget(value)}
        />
      </div>
      <div className="input-number" style={{ marginBottom: "30px" }}>
        <InputNumber
          placeholder="Enter number of questions"
          style={{
            width: "15%",
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
        <Button
          style={{ marginLeft: "10px" }}
          type="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <div className="forms-container">{forms}</div>
    </div>
  );
};

export default TestCreationPage;
