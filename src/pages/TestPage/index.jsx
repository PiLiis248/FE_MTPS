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
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching test data:', error);
            }
        };

        fetchTest();
    }, [testId]);

    useEffect(() => {
        // Load saved answers from localStorage
        const savedAnswers = {};
        Object.keys(currentTest?.questions || {}).forEach((questionId, index) => {
            const savedAnswer = localStorage.getItem(`answer-${index}`);
            if (savedAnswer) {
                savedAnswers[`question-${questionId}`] = savedAnswer;
            }
        });
        setAnswers(savedAnswers);
    }, [currentTest]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const totalQuestions = currentTest.questions.length;
        const answeredQuestions = Object.keys(answers).length;

        if (answeredQuestions !== totalQuestions) {
            alert("Please answer all questions.");
            return; // Exit early if not all questions are answered
        }

        currentTest.questions.forEach(question => {
            const questionId = question.question; // Change this to 'id'
            const correctAnswer = question.correctAnswer;   
            console.log("Question ID:", questionId);
            console.log("Correct Answer:", correctAnswer);
        });

        alert("Form submitted successfully!");
    };

    const handleAnswerChange = (questionId, optionId) => {
        // Save the selected option ID to localStorage
        localStorage.setItem(`answer-${questionId}`, optionId);
    
        // Find the question object corresponding to the provided questionId
        const question = currentTest.questions.find(q => q.question === questionId);
        if (question) {
            // Find the selected option object corresponding to the provided optionId
            const selectedOption = question.options.find(o => o.id === optionId);
            if (selectedOption) {
                // Format the selected option in the desired format (1 - A, 2 - B, etc.)
                const optionIndex = question.options.indexOf(selectedOption);
                const formattedOption = `${optionIndex + 1} - ${optionId}`;
    
                // Update the answers state
                setAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: formattedOption }));
    
                // Log the selected option
                console.log(`Selected option for question ${questionId}: ${formattedOption}`);
            }
        }
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
