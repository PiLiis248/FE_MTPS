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
        console.log('Handle Answer Change:', questionId, optionId);
        
        // Save the selected option ID to localStorage
        localStorage.setItem(`answer-${questionId}`, optionId);
        
        // Find the question object corresponding to the provided questionId
        const question = currentTest.questions.find(q => q.question === questionId);
        if (question) {
            // Find the selected option object corresponding to the provided optionId
            const selectedOption = question.options.find(o => o.id === optionId);
            if (selectedOption) {
                // Get the index of the selected option
                const optionIndex = question.options.findIndex(o => o.id === optionId);
                
                // Convert the option index to a letter (e.g., 0 -> A, 1 -> B, 2 -> C, ...)
                const optionLetter = String.fromCharCode(65 + optionIndex);
                
                // Format the selected option (e.g., "1 - D", "2 - C", "3 - B", ...)
                const formattedOption = `${optionIndex + 1} - ${optionLetter}`;
        
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
