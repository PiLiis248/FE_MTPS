import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { testService } from '../../services/testService'; // Import your test service

import '../../../public/assets/css/testPage.css'; // Ensure this path is correct for your project

const TestPage = () => {
    const { testId } = useParams(); // Get the testId from the URL params
    const [currentTest, setCurrentTest] = useState(null);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await testService.getTest(testId); // Fetch test data using testId
                setCurrentTest(response.data); // Set the fetched test data to state
            } catch (error) {
                console.error('Error fetching test data:', error);
                // Handle error if necessary
            }
        };

        fetchTest(); // Call fetchTest function when component mounts
    }, [testId]); // Run useEffect when testId changes

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted");
        // Handle form submission logic here
    };

    return (
        <div className="test-container">
            {currentTest ? (
                <>
                    <h2>{currentTest.name}</h2>
                    <div className="info-item"><strong>Description:</strong> {currentTest.desc}</div>
                    <div className="info-item"><strong>Start Time:</strong> {currentTest.startTime}</div>
                    <div className="info-item"><strong>End Time:</strong> {currentTest.endTime}</div>
                    <div className="info-item"><strong>Location:</strong> {currentTest.location}</div>

                    <hr />
                    <form onSubmit={handleSubmit}>
                        {currentTest.questions.map((question, index) => (
                            <div key={question.questionId} className="question-block">
                                <p>
                                    <strong>Question {index + 1}:</strong> {question.question}
                                    <span className="required-star">*</span>
                                </p>
                                {question.options.map((option) => (
                                    <div key={option.optionId} className="option">
                                        <label>
                                            <input type="radio" name={`question${index}`} value={option.optionId} />
                                            {option.text}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button type="submit" className="submit-button">Submit Test</button>
                    </form>
                </>
            ) : (
                <p>Loading test data...</p>
            )}
        </div>
    );
};

export default TestPage;
