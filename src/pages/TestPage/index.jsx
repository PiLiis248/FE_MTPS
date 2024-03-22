// import React from 'react';
// import testData from '../../data/test.json';
// import '../../../public/assets/css/testPage.css';
// import { useParams } from "react-router-dom";

// const TestPage = () => {
//     let { testId } = useParams();
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Handle form submission logic here
//     };

//     return (
//         <div className="test-container">
//             <form onSubmit={handleSubmit}>
//                 {Object.entries(testData).map(([key, question], index) => (
//                     <div key={key} className="question-block">
//                         <p>{`${index + 1}. ${question.question}`}</p>
//                         <div className="options">
//                             {Object.entries(question.options).map(([optionKey, optionValue]) => (
//                                 <label key={optionKey} className="option">
//                                     <input type="radio" name={`question${index}`} value={optionKey} />
//                                     <span>{`${optionKey}. ${optionValue.text}`}</span>
//                                 </label>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//                 <button type="submit" className="submit-btn">Submit Test</button>
//             </form>
//         </div>
//     );
// };

// export default TestPage;


import React from 'react';
import testData from '../../data/test.json'; // Ensure the path to your test.json is correct

const TestPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        // You might want to collect answers and compare them to correct answers or send them somewhere
        console.log("Form submitted");
    };

    return (
        <div className="test-container">
            <form onSubmit={handleSubmit}>
                {testData.questions.map((question, index) => (
                    <div key={index} className="question-block">
                        <p>{question.text}</p>
                        {question.options.map((option, optionIndex) => (
                            <label key={optionIndex} className="option">
                                <input type="radio" name={`question${index}`} value={option} />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit Test</button>
            </form>
        </div>
    );
};

export default TestPage;
