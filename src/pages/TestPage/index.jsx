// TestPage.js

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { testService } from "../../services/testService";
import QuestionCard from "../../component/QuestionCard";
import { PATHS } from "../../constants/path";
import { useAuthContext } from "../../context/AuthContext";

const TestPage = () => {
  const { testId } = useParams();
  const { profile } = useAuthContext();
  const [currentTest, setCurrentTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [allAnswersCleared, setAllAnswersCleared] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await testService.getSpecificTest(testId);
        setCurrentTest(response.data);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchTest(testId);
    localStorage.clear();
  }, [testId]);

  useEffect(() => {
    const savedAnswers = {};
    Object.keys(currentTest?.questions || {}).forEach((questionId, index) => {
      const savedAnswer = localStorage.getItem(`question_${index}`);
      if (savedAnswer) {
        savedAnswers[`question_${index}`] = savedAnswer;
      }
    });
    setAnswers(savedAnswers);
  }, [currentTest]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const answers = {};
    Object.keys(currentTest?.questions || {}).forEach((questionId, index) => {
      const savedAnswer = localStorage.getItem(`question_${index}`);
      if (savedAnswer) {
        answers[questionId] = savedAnswer;
      }
    });

    try {
      const response = await testService.doTest(answers, testId, profile.id);

      navigate(PATHS.HOME);
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  const handleAnswerChange = (questionId, optionId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));

    localStorage.setItem(questionId, optionId);
  };

  const handleClearAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (!currentTest) {
    return <p>Loading test data...</p>;
  }

  return (
    <div
      className="test-creation-page"
      style={{ padding: "30px 50px", background: "#E8EFCF" }}
    >
      <div
        className="button-back"
        style={{ fontSize: "20px", fontFamily: "pnb", marginBottom: "40px" }}
      >
        <Link to={PATHS.HOME}>Back Home Page</Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="create-questions-container"
        style={{ padding: "0 60px" }}
      >
        {Object.values(currentTest.questions).map(
          (question, index) =>
            !allAnswersCleared && (
              <QuestionCard
                key={index}
                index={index}
                question={question}
                handleChange={handleAnswerChange}
                counter={index + 1}
              />
            )
        )}
        <div
          className="button"
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "20px",
            columnGap: "200px",
            marginTop: "30px",
          }}
        >
          <button
            type="button"
            onClick={handleClearAll}
            className="clear-all-button"
            style={{
              background: "#D24545",
              padding: "10px",
              borderRadius: "10px",
              color: "white",
            }}
          >
            Clear All
          </button>
          <button
            type="submit"
            className="submit-button"
            style={{
              background: "#9BCF53",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Submit Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestPage;
