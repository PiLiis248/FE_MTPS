// QuestionCard.js
import React from 'react';
import "../../../public/assets/css/test.css"

const QuestionCard = ({ index, handleChange }) => {
    return (
        <div className="question-card">
            <h2>Question {index + 1}</h2>
            <div className="form-group">
                <label htmlFor={`question-${index}`}></label>
                <input type="text" id={`question-${index}`} name={`question-${index}`} onChange={(e) => handleChange(e, index)} />
            </div>
            <div className="form-group">
                <label htmlFor={`option-a-${index}`}>Option A:</label>
                <input type="text" id={`option-a-${index}`} name={`option-a-${index}`} onChange={(e) => handleChange(e, index)} />
            </div>
            <div className="form-group">
                <label htmlFor={`option-b-${index}`}>Option B:</label>
                <input type="text" id={`option-b-${index}`} name={`option-b-${index}`} onChange={(e) => handleChange(e, index)} />
            </div>
            <div className="form-group">
                <label htmlFor={`option-c-${index}`}>Option C:</label>
                <input type="text" id={`option-c-${index}`} name={`option-c-${index}`} onChange={(e) => handleChange(e, index)} />
            </div>
            <div className="form-group">
                <label htmlFor={`option-d-${index}`}>Option D:</label>
                <input type="text" id={`option-d-${index}`} name={`option-d-${index}`} onChange={(e) => handleChange(e, index)} />
            </div>
            <div className="form-group">
                <label htmlFor={`correct-answer-${index}`}>Correct Answer:</label>
                <input type="text" id={`correct-answer-${index}`} name={`correct-answer-${index}`} onChange={(e) => handleChange(e, index)} />
            </div>
        </div>
    );
};

export default QuestionCard;
