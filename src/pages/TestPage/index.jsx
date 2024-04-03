import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { testService } from '../../services/testService';
import QuestionCard from '../../component/QuestionCard';
import { PATHS } from '../../constants/path';

const TestPage = () => {
    const { testId } = useParams();
    const [currentTest, setCurrentTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const [allAnswersCleared, setAllAnswersCleared] = useState(false);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await testService.getSpecificTest(testId);
                setCurrentTest(response.data);
            } catch (error) {
                console.error('Error fetching test data:', error);
            }
        };

        fetchTest();
    }, [testId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const unansweredQuestionIndex = Object.keys(currentTest.questions).findIndex(
            questionId => !answers[`question-${questionId}`]
        );
        if (unansweredQuestionIndex !== -1) {
            const element = document.querySelector(`#question-${unansweredQuestionIndex}`);
            if (element) {
                console.log("Scrolling to element:", element);
                window.scrollTo({
                    top: element.offsetTop,
                    behavior: 'smooth'
                });
            }
            console.log("Please answer all questions.");
        } else {
            Object.entries(answers).forEach(([key, value]) => {
                localStorage.setItem(key, value);
            });
            alert("Form submitted successfully!");
        }
    };

    const handleAnswerChange = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleClearAll = () => {
        Object.keys(currentTest.questions).forEach((questionId, index) => {
            localStorage.removeItem(`answer-${index}`);
        });
        const newAnswers = {};
        Object.keys(currentTest.questions).forEach((questionId) => {
            newAnswers[`question-${questionId}`] = '';
        });
        setAnswers(newAnswers);
        console.log("All answers cleared.");
        window.location.reload(); // Reload the page
    };
    

    if (!currentTest) {
        return <p>Loading test data...</p>;
    }

    return (
        <div className="test-creation-page">
            <hr />
            <Link to={PATHS.HOME} className='back-btn'>Back Home Page</Link>

            <form onSubmit={handleSubmit} className="create-questions-container">
                {Object.values(currentTest.questions).map((question, index) => (
                    // Conditionally render QuestionCard only if all answers haven't been cleared
                    !allAnswersCleared && <QuestionCard key={index} index={index} question={question} handleChange={handleAnswerChange} counter={index + 1} />
                ))}
                <div className="button">
                    <button type="button" onClick={handleClearAll} className="clear-all-button">Clear All</button>
                    <button type="submit" className="submit-button">Submit Test</button>
                </div>
            </form>
        </div>
    );
};

export default TestPage;
