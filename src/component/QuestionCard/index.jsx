// QuestionCard.js
import React, { useEffect, useState } from 'react';
import '../../../public/assets/css/test.css'; // Import the test.css file

const QuestionCard = ({ question, index, handleChange, counter }) => {
    const { question: questionText, options, correctAnswer } = question;
    const [selectedOption, setSelectedOption] = useState('');

    // useEffect(() => {
    //     const saveAnswer = localStorage.getItem(`answer-${index}`);
    //     if (saveAnswer) {
    //         handleChange(`question-${index}`, saveAnswer);
    //         setSelectedOption(saveAnswer);
    //     }
    // }, [index, handleChange]);

    useEffect(() => {
        const saveAnswer = localStorage.getItem(`answer-${index}`);
        if (saveAnswer) {
            handleChange(`question-${index}`, saveAnswer);
            setSelectedOption(saveAnswer);
        }
    }, []);
    

    const handleOptionChange = (event) => {
        const { value } = event.target;
        setSelectedOption(value);
        handleChange(`question-${index}`, value);
        localStorage.setItem(`answer-${index}`, value);
    };

    const handleClearAnswer = () => {
        setSelectedOption('');
        handleChange(`question-${index}`, '');
        localStorage.removeItem(`answer-${index}`);
    }

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
                            value={option.text}
                            checked={selectedOption === option.text}
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
            <input
                type="hidden"
                name={`correct-answer-${index}`}
                value={correctAnswer}
                onChange={(e) => handleChange(`correct-answer-${index}`, e.target.value)}
            />
            <button onClick={handleClearAnswer} className='clear-button'>Clear Answer</button>
        </div>
    );
};

export default QuestionCard;
