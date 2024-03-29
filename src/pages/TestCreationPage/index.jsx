// TestCreationPage.js
import React, { useState } from 'react';
import QuestionCard from '../../component/QuestionCard';
import "../../../public/assets/css/testPage.css"

const TestCreationPage = () => {
    const [numQuestions, setNumQuestions] = useState(0);
    const [questions, setQuestions] = useState([]);

    const handleChange = (e, index) => {
        // Implement logic to handle changes in input fields
    };

    const handleCreateQuestions = () => {
        // Create an array of question cards based on the selected number of questions
        const newQuestions = Array.from({ length: numQuestions }, (_, index) => index);
        setQuestions(newQuestions);
    };

    return (
        <div>
            <h2>Create Test</h2>
            <div>
                <label htmlFor="num-questions">Number of Questions:</label>
                <input type="number" id="num-questions" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} />
                <button onClick={handleCreateQuestions}>Create Questions</button>
            </div>
            <div>
                {questions.map((index) => (
                    <QuestionCard key={index} index={index} handleChange={handleChange} />
                ))}
            </div>
        </div>
    );
};

export default TestCreationPage;
