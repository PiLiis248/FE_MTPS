

// TestPage.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../../public/assets/css/testPage.css'; // Ensure this path is correct for your project
import '../../../public/assets/css/test.css'; // Ensure this path is correct for your project
import { testService } from '../../services/testService'; // Import your test service
import QuestionCard from '../../component/QuestionCard'; // Import the QuestionCard component
import { PATHS } from '../../constants/path';

const TestPage = () => {
    const { testId } = useParams(); 
    const [currentTest, setCurrentTest] = useState(null);
    const [answers, setAnswers] = useState({}); // State to store selected answers

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

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Check if all questions have been answered
    //     if (Object.keys(answers).length === Object.keys(currentTest.questions).length) {
    //         console.log("Form submitted");
    //         // Save answers to local storage
    //         Object.entries(answers).forEach(([key, value]) => {
    //             localStorage.setItem(key, value);
    //         });
    //     } else {
    //         console.log("Please answer all questions.");
    //     }
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Check if all questions have been answered
        if (Object.keys(answers).length === Object.keys(currentTest.questions).length) {
            console.log("Form submitted");
            // Save answers to local storage
            Object.entries(answers).forEach(([key, value]) => {
                localStorage.setItem(key, value);
            });
            // Notify submission
            alert("Form submitted successfully!");
        } else {
            console.log("Please answer all questions.");
            // Scroll to the first unanswered question
            const firstUnansweredQuestionIndex = Object.keys(currentTest.questions).findIndex(
                questionId => !answers[`question-${questionId}`]
            );
            if (firstUnansweredQuestionIndex !== -1) {
                const element = document.querySelector(`#question-${firstUnansweredQuestionIndex}`);
                window.scrollTo({
                    top: element.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    };
    


    const handleAnswerChange = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    // const handleClearAll = () => {
    //     // Clear all answers
    //     setAnswers({});
    //     // Clear answers from local storage
    //     Object.keys(currentTest.questions).forEach((questionId, index) => {
    //         localStorage.removeItem(`answer-${index}`);
    //     });
    //     console.log("All answers cleared.");
    // };

    const handleClearAll = () => {
        // Clear answers from local storage
        Object.keys(currentTest.questions).forEach((questionId, index) => {
            localStorage.removeItem(`answer-${index}`);
        });
        // Reset state of selected answers for all questions
        const newAnswers = {};
        Object.keys(currentTest.questions).forEach((questionId) => {
            newAnswers[`question-${questionId}`] = ''; // Set answer to empty string
        });
        setAnswers(newAnswers);
        console.log("All answers cleared.");
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    

    if (!currentTest) {
        return <p>Loading test data...</p>;
    }

    const questionsArray = Object.values(currentTest.questions);

    if (!Array.isArray(questionsArray)) {
        console.error("Invalid test data format: questions must be an array");
        return <p>Error: Invalid test data format</p>;
    }

    return (
        <div className="test-creation-page">
            <hr />
            <Link to={PATHS.HOME} className='back-btn'>Back Home Page</Link>
            
            <form onSubmit={handleSubmit} className="create-questions-container">
                {questionsArray.map((question, index) => (
                    <QuestionCard key={index} index={index} question={question} handleChange={handleAnswerChange} counter={index+1}/>
                ))}
                <div className="button">
                    <button type="clear_all" onClick={handleClearAll} className="clear-all-button">Clear All</button>
                    <button type="submit" className="submit-button">Submit Test</button>
                </div>
            </form>
            
        </div>
    );
};

export default TestPage;
