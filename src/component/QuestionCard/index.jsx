import React from 'react';
import '../../../public/assets/css/test.css'; // Import the test.css file

const QuestionCard = ({ question, index, handleChange }) => {
    const { question: questionText, options, correctAnswer } = question;

    const handleOptionChange = (event) => {
        const { name, value } = event.target;
        handleChange(name, value);
    };

    return (
        <div className="question-card">
            <h2>{questionText}</h2>
            <div className="options">
                {Object.entries(options).map(([key, option]) => (
                    <div key={key} className="option">
                        <input
                            type="radio"
                            id={`option-${key}`}
                            name={`question-${index}`}
                            value={option.text}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor={`option-${key}`}>{option.text}</label>
                    </div>
                ))}
            </div>
            <input
                type="hidden"
                name={`correct-answer-${index}`}
                value={correctAnswer}
                onChange={(e) => handleChange(`correct-answer-${index}`, e.target.value)}
            />
        </div>
    );
};

export default QuestionCard;
