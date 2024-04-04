// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { testService } from '../../services/testService';
// import QuestionCard from '../../component/QuestionCard';
// import { PATHS } from '../../constants/path';

// const TestPage = () => {
//     const { testId } = useParams();
//     const [currentTest, setCurrentTest] = useState(null);
//     const [answers, setAnswers] = useState({});
//     const [allAnswersCleared, setAllAnswersCleared] = useState(false);

//     useEffect(() => {
//         const fetchTest = async () => {
//             try {
//                 const response = await testService.getSpecificTest(testId);
//                 setCurrentTest(response.data);
//                 console.log(response.data);
//             } catch (error) {
//                 console.error('Error fetching test data:', error);
//             }
//         };

//         fetchTest();
//     }, [testId]);

//     useEffect(() => {
//         // Load saved answers from localStorage
//         const savedAnswers = {};
//         Object.keys(currentTest?.questions || {}).forEach((questionId, index) => {
//             const savedAnswer = localStorage.getItem(`answer-${index}`);
//             if (savedAnswer) {
//                 savedAnswers[`question-${questionId}`] = savedAnswer;
//             }
//         });
//         setAnswers(savedAnswers);
//     }, [currentTest]);

//     // const handleSubmit = (event) => {
//     //     event.preventDefault();

//     //     const totalQuestions = currentTest.questions.length;
//     //     const answeredQuestions = Object.keys(answers).length;

//     //     if (answeredQuestions !== totalQuestions) {
//     //         alert("Please answer all questions.");
//     //         return; // Exit early if not all questions are answered
//     //     }

//     //     currentTest.questions.forEach(question => {
//     //         const questionId = question.question; // Change this to 'id'
//     //         const correctAnswer = question.correctAnswer;   
//     //         console.log("Question ID:", questionId);
//     //         console.log("Correct Answer:", correctAnswer);
//     //     });

//     //     alert("Form submitted successfully!");
//     // };

//     // localStorage.clear();
//     // console.log("localStorage:", localStorage);

//     const handleSubmit = (event) => {
//         event.preventDefault();
    
//         const totalQuestions = currentTest.questions.length;
//         const answeredQuestions = Object.keys(answers).length;

//         console.log(totalQuestions + " , " + answeredQuestions);
    
//         if (answeredQuestions !== totalQuestions) {
//             alert("Please answer all questions.");
//             return; // Exit early if not all questions are answered
//         }
    
//         currentTest.questions.forEach(question => {
//             const questionId = question.id; // Assuming there's an 'id' property in the question object
//             const correctAnswer = question.correctAnswer;   
//             console.log("Question ID:", questionId);
//             console.log("Correct Answer:", correctAnswer);
//         });
    
//         // Log out localStorage
//         console.log("localStorage:", localStorage);
    
//         alert("Form submitted successfully!");
//     };
    

    
//     const handleAnswerChange = (questionId, optionId) => {
//         console.log('Handle Answer Change:', questionId, optionId);
        
//         // Save the selected option ID to localStorage
//         localStorage.setItem(`answer-${questionId}`, optionId);
        
//         // Find the question object corresponding to the provided questionId
//         const question = currentTest.questions.find(q => q.question === questionId);
//         if (question) {
//             // Find the selected option object corresponding to the provided optionId
//             const selectedOption = question.options.find(o => o.id === optionId);
            
//             console.log(selectedOption);
//         }
//     };
    
    
//     const handleClearAll = () => {
      
//         localStorage.clear();
//         window.location.reload(); // Reload the page
//     };

//     if (!currentTest) {
//         return <p>Loading test data...</p>;
//     }

//     return (
//         <div className="test-creation-page">
//             <hr />
//             <Link to={PATHS.HOME} className='back-btn'>Back Home Page</Link>

//             <form onSubmit={handleSubmit} className="create-questions-container">
//                 {Object.values(currentTest.questions).map((question, index) => (
//                     // Conditionally render QuestionCard only if all answers haven't been cleared
//                     !allAnswersCleared && <QuestionCard key={index} index={index} question={question} handleChange={handleAnswerChange} counter={index + 1} />
//                 ))}
//                 <div className="button">
//                     <button type="button" onClick={handleClearAll} className="clear-all-button">Clear All</button>
//                     <button type="submit" onClick={handleSubmit} className="submit-button">Submit Test</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default TestPage;


import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { testService } from '../../services/testService';
import QuestionCard from '../../component/QuestionCard';
import { PATHS } from '../../constants/path';

const TestPage = () => {
    const { testId } = useParams();
    const [currentTest, setCurrentTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const [allAnswersCleared, setAllAnswersCleared] = useState(false);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await testService.getSpecificTest(testId);
                setCurrentTest(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching test data:', error);
            }
        };

        fetchTest();
    }, [testId]);

    useEffect(() => {
        // Load saved answers from localStorage
        const savedAnswers = {};
        Object.keys(currentTest?.questions || {}).forEach((questionId, index) => {
            const savedAnswer = localStorage.getItem(`answer-${index}`);
            if (savedAnswer) {
                savedAnswers[`question-${questionId}`] = savedAnswer;
            }
        });
        setAnswers(savedAnswers);
    }, [currentTest]);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const totalQuestions = currentTest.questions.length;
        const answeredQuestions = Object.keys(answers).length;

        if (answeredQuestions !== totalQuestions) {
            alert("Please answer all questions.");
            return; // Exit early if not all questions are answered
        }
    
        console.log("All answers:", answers);
        // You can proceed with submitting the answers to the backend here
        // Use testService.doTest(answers) to send answers to the backend
    
        alert("Form submitted successfully!");
    };
    
    const handleAnswerChange = (questionId, optionId) => {
        console.log('Handle Answer Change:', questionId, optionId);
        
        // Save the selected option ID to state
        setAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: optionId }));
        // Save the selected option ID to localStorage
        localStorage.setItem(`answer-${questionId}`, optionId);
    };
    
    const handleClearAll = () => {
        // Clear all answers from localStorage
        localStorage.clear();
        // Clear all answers from state
        setAnswers({});
        // Reload the page
        window.location.reload();
    };

    if (!currentTest) {
        return <p>Loading test data...</p>;
    }

    return (
        <div className="test-creation-page">
            <hr />
            <Link to={PATHS.HOME} className='back-btn'>Back Home Page</Link>

            <form onSubmit={handleSubmit} className="create-questions-container">
                {Object.values(currentTest.questions).map((question, index) => (
                    // Conditionally render QuestionCard only if all answers haven't been cleared
                    !allAnswersCleared && <QuestionCard key={index} index={index} question={question} handleChange={handleAnswerChange} counter={index + 1} />
                ))}
                <div className="button">
                    <button type="button" onClick={handleClearAll} className="clear-all-button">Clear All</button>
                    <button type="submit" className="submit-button">Submit Test</button>
                </div>
            </form>
        </div>
    );
};

export default TestPage;
