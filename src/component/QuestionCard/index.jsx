// QuestionCard.js

import React, { useEffect, useState } from 'react';
import '../../../public/assets/css/test.css'; // Import the test.css file

const QuestionCard = ({ question, index, handleChange, counter }) => {
    const { question: questionText, options, correctAnswer } = question;
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        const saveAnswer = localStorage.getItem(`question_${index}`);
        if (saveAnswer) {
            handleChange(`question_${index}`, saveAnswer);
            setSelectedOption(saveAnswer);
        }
    }, []);

    const handleOptionChange = (event) => {
        const { value } = event.target;
        setSelectedOption(value);
        
        handleChange(`question_${index}`, value);
        localStorage.setItem(`question_${index}`, value);
    };

    const handleClearAnswer = (event) => {
        event.preventDefault();
        setSelectedOption('');
        handleChange(`question_${index}`, '');
        localStorage.removeItem(`question_${index}`);
    };

    return (
        <div className="question-card">
            <h2>{counter}. {questionText}<span className="required-star">*</span></h2>
            <div className="options">
                {Object.entries(options).map(([key, option]) => (
                    <div key={key} className="option">
                        <input
                            type="radio"
                            id={`option-${key}`}
                            name={`question-${index}`}
                            value={option.id}
                            checked={selectedOption === option.id}
                            onChange={handleOptionChange}
                        />
                        <label 
                            htmlFor={`option-${key}`} 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        >
                            {option.text}
                        </label>
                    </div>
                ))}
            </div>
            <button onClick={handleClearAnswer} className='clear-button'>Clear Answer</button>
        </div>
    );
};

export default QuestionCard;
