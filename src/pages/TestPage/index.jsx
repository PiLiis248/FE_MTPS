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
    <div className="test-creation-page">
      <hr />
      <Link to={PATHS.HOME} className="back-btn">
        Back Home Page
      </Link>

      <form onSubmit={handleSubmit} className="create-questions-container">
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
        <div className="button">
          <button
            type="button"
            onClick={handleClearAll}
            className="clear-all-button"
          >
            Clear All
          </button>
          <button type="submit" className="submit-button">
            Submit Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestPage;
