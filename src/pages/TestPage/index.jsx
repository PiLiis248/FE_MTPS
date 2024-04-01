import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../../public/assets/css/testPage.css'; // Ensure this path is correct for your project
import '../../../public/assets/css/test.css'; // Ensure this path is correct for your project
import { testService } from '../../services/testService'; // Import your test service
import QuestionCard from '../../component/QuestionCard'; // Import the QuestionCard component

const TestPage = () => {
    const { testId } = useParams(); 
    const [currentTest, setCurrentTest] = useState(null);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                console.log(testId);
                const response = await testService.getSpecificTest(testId); 
                setCurrentTest(response.data); 
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching test data:', error);
            }
        };

        fetchTest(); 
    }, [testId]); 

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted");
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
            <form onSubmit={handleSubmit} className="create-questions-container">
                {questionsArray.map((question, index) => (
                    <QuestionCard key={index} index={index} question={question} />
                ))}
                <button type="submit" className="submit-button">Submit Test</button>
            </form>
        </div>
    );
};

export default TestPage;
