import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { testService } from '../../services/testService'; // Import your test service

import '../../../public/assets/css/testPage.css'; // Ensure this path is correct for your project
import useQuery from '../../hooks/useQuery';

const TestPage = () => {
    const { testId } = useParams(); // Get the testId from the URL params
    const [currentTest, setCurrentTest] = useState(null);
    // const {
    //   data: testData,
    //   loading: testLoading,
    //   error: testError,
    //   refetch: testRefetch,
    // } = useQuery(testService.getSpecificTest(testId));
    // if(!testLoading){
    //     console.log(testData);

    // }
    useEffect(() => {
        const fetchTest = async () => {
            try {
                console.log(testId);
                const response = await testService.getSpecificTest(testId); // Fetch test data using testId
                setCurrentTest(response.data); // Set the fetched test data to state
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching test data:', error);
                // Handle error if necessary
            }
        };

        fetchTest(); // Call fetchTest function when component mounts
    }, [currentTest]); // Run useEffect when testId changes

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted");
        // Handle form submission logic here
    };

    return (
        <div className="test-container">
            {/* <h2>{currentTest.name}</h2>
                    <div className="info-item"><strong>Description:</strong> {currentTest.desc}</div>
                    <div className="info-item"><strong>Start Time:</strong> {currentTest.startTime}</div>
                    <div className="info-item"><strong>End Time:</strong> {currentTest.endTime}</div>
                    <div className="info-item"><strong>Location:</strong> {currentTest.location}</div> */}
            {!!testData ? (
                <>
                    
                    <hr />
                    <form onSubmit={handleSubmit}>
                        {testData.questions.map((question, index) => (
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
