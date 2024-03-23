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


// import React from 'react';
// import testData from '../../data/test.json'; // Ensure the path to your test.json is correct

// const TestPage = () => {
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Handle form submission logic here
//         // You might want to collect answers and compare them to correct answers or send them somewhere
//         console.log("Form submitted");
//     };

//     return (
//         <div className="test-container">
//             <form onSubmit={handleSubmit}>
//                 {testData.questions.map((question, index) => (
//                     <div key={index} className="question-block">
//                         <p>{question.text}</p>
//                         {question.options.map((option, optionIndex) => (
//                             <label key={optionIndex} className="option">
//                                 <input type="radio" name={`question${index}`} value={option} />
//                                 {option}
//                             </label>
//                         ))}
//                     </div>
//                 ))}
//                 <button type="submit">Submit Test</button>
//             </form>
//         </div>
//     );
// };

// export default TestPage;


// import React from 'react';
// import testData from '../../data/test.json'; // Ensure the path to your test.json is correct
// import '../../../public/assets/css/testPage.css'

// const TestPage = () => {
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Handle form submission logic here
//         // You might want to collect answers and compare them to correct answers or send them somewhere
//         console.log("Form submitted");
//     };

//     return (
//         <div className="test-container">
//             {testData.map((test, testIndex) => (
//                 <div key={test.id} className="test">
//                     <h2>Test {testIndex + 1}</h2>
//                     <form onSubmit={handleSubmit}>
//                         {Object.keys(test.questions).map((questionId) => {
//                             const question = test.questions[questionId];
//                             return (
//                                 <div key={questionId} className="question-block">
//                                     <p>{question.question}</p>
//                                     {Object.keys(question.options).map((optionKey) => {
//                                         const option = question.options[optionKey];
//                                         return (
//                                             <label key={optionKey} className="option">
//                                                 <input type="radio" name={`question${questionId}`} value={optionKey} />
//                                                 {option.text}
//                                             </label>
//                                         );
//                                     })}
//                                 </div>
//                             );
//                         })}
//                         <button type="submit">Submit Test</button>
//                     </form>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default TestPage;

// import React from 'react';
// import testData from '../../data/test.json'; // Ensure the path to your test.json is correct
// import '../../../public/assets/css/testPage.css'
// const TestPage = () => {
//     let { testId } = useParams(); // Get the testId from URL parameters

//     // Filter the testData to find the test with the matching testId
//     const test = testData.find(test => test.id === testId);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Handle form submission logic here
//         console.log("Form submitted");
//     };

//     // If no test matches the testId, you can return a message or redirect
//     if (!test) {
//         return <div>Test not found</div>;
//     }

//     return (
//         <div className="test-container">
//             <div key={test.id} className="test">
//                 <h2>{test.title}</h2>
//                 <form onSubmit={handleSubmit}>
//                     {test.questions.map((question, questionIndex) => (
//                         <div key={questionIndex} className="question-block">
//                             <p>{question.question}</p>
//                             {question.options.map((option, optionIndex) => (
//                                 <label key={optionIndex} className="option">
//                                     <input type="radio" name={`question${questionIndex}`} value={option} />
//                                     {option}
//                                 </label>
//                             ))}
//                         </div>
//                     ))}
//                     <button type="submit">Submit Test</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default TestPage;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import '../../../public/assets/css/testPage.css'; // Update the path as necessary

// const TestPage = () => {
//     let { testId } = useParams(); // Get the testId from URL parameters
//     const [test, setTest] = useState(null);

//     useEffect(() => {
//         const fetchTest = async () => {
//             try {
//                 const response = await axios.get(`/test/${testId}`);
//                 setTest(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch test data:', error);
//                 // Handle error (e.g., test not found or server error)
//             }
//         };

//         fetchTest();
//     }, [testId]);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log("Form submitted");
//         // Further form submission logic here
//     };

//     if (!test) {
//         return <div>Loading test...</div>;
//     }

//     return (
//         <div className="test-container">
//             <div key={test.id} className="test">
//                 <h2>{test.title}</h2>
//                 <form onSubmit={handleSubmit}>
//                     {test.questions.map((question, questionIndex) => (
//                         <div key={questionIndex} className="question-block">
//                             <p>{question.question}</p>
//                             {question.options.map((option, optionIndex) => (
//                                 <label key={optionIndex} className="option">
//                                     <input type="radio" name={`question${questionIndex}`} value={option} />
//                                     {option}
//                                 </label>
//                             ))}
//                         </div>
//                     ))}
//                     <button type="submit">Submit Test</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default TestPage;


import React from 'react';
import '../../../public/assets/css/testPage.css'; // Ensure this path is correct for your project

const TestPage = () => {
    // Static assignment of testId for demonstration purposes
    const testId = 'testId002';

    // Mock post data
    const postData = {
        "id": "post02",
        "name": "Hoạt động trực tuyến: 'Tìm hiểu về Đoàn TNCS Hồ Chí Minh'",
        "desc": "🌞 Hòa trong không khí phấn khởi, chào mừng kỷ niệm 93 năm ngày thành lập Đoàn TNCS Hồ Chí Minh (26/03/1931 - 26/03/2024), Đoàn Khoa Toán - Thống kê tổ chức hoạt động 'Tìm hiểu về Đoàn TNCS Hồ Chí Minh'. 🌞 Nhằm tuyên truyền, giáo dục về quá trình ra đời, phát triển và truyền thống lịch sử vẻ vang của Đoàn TNCS Hồ Chí Minh. Qua đó giúp Đoàn viên thêm tự hào về tổ chức chính trị - xã hội của mình và giúp Thanh niên hiểu rõ hơn về vai trò và sứ mệnh tổ chức để tiếp tục phấn đấu trở thành Đoàn Viên.",
        "status": true,
        "startTime": "15/03/2024",
        "endTime": "17/03/2024",
        "point": 5,
        "location": "Online",
        "numberParticipants": 500,
        "testId": "testId002"
    };

    // Mock test data
    const testMockData = {
        "id": "testId002",
        "title": "Test 2",
        "questions": {
            "1": {
                "question": "Trong thời gian ở nước ngoài, Nguyễn Tất Thành đã làm những công việc gì?",
                "correctAnswer": "D",
                "options": {
                    "A": {
                        "text": "Phụ bếp, cào tuyết",
                        "isCorrect": false
                    },
                    "B": {
                        "text": "Đốt lò, bán báo",
                        "isCorrect": false
                    },
                    "C": {
                        "text": "Thợ ảnh, làm bánh",
                        "isCorrect": false
                    },
                    "D": {
                        "text": "Tất cả các công việc trên",
                        "isCorrect": true
                    }
                }
            },
            "2": {
                "question": "Theo Hồ Chí Minh, học để làm gì?",
                "correctAnswer": "D",
                "options": {
                    "A": {
                        "text": "Làm việc",
                        "isCorrect": false
                    },
                    "B": {
                        "text": "Làm cán bộ",
                        "isCorrect": false
                    },
                    "C": {
                        "text": "Làm người",
                        "isCorrect": false
                    },
                    "D": {
                        "text": "Cả a, b, c",
                        "isCorrect": true
                    }
                }
            },
            "3": {
                "question": "Nguyễn Tất Thành lúc ra đi tìm đường cứu nước bao nhiêu tuổi?",
                "correctAnswer": "C",
                "options": {
                    "A": {
                        "text": "19 tuổi",
                        "isCorrect": false
                    },
                    "B": {
                        "text": "20 tuổi",
                        "isCorrect": false
                    },
                    "C": {
                        "text": "21 tuổi",
                        "isCorrect": true
                    },
                    "D": {
                        "text": "24 tuổi",
                        "isCorrect": false
                    }
                }
            },
            "4": {
                "question": "Mặt trận Liên - Việt được thành lập vào thời gian nào?",
                "correctAnswer": "B",
                "options": {
                    "A": {
                        "text": "Năm 1945",
                        "isCorrect": false
                    },
                    "B": {
                        "text": "Năm 1951",
                        "isCorrect": true
                    },
                    "C": {
                        "text": "Năm 1960",
                        "isCorrect": false
                    },
                    "D": {
                        "text": "Năm 1969",
                        "isCorrect": false
                    }
                }
            },
            "5": {
                "question": "Nguyễn ái Quốc gửi bản 'Yêu sách của nhân dân Việt Nam' tới Hội nghị Vécxay vào ngày tháng năm nào?",
                "correctAnswer": "C",
                "options": {
                    "A": {
                        "text": "18/6/1917",
                        "isCorrect": false
                    },
                    "B": {
                        "text": "18/6/1918",
                        "isCorrect": false
                    },
                    "C": {
                        "text": "18/6/1919",
                        "isCorrect": true
                    },
                    "D": {
                        "text": "18/6/1920",
                        "isCorrect": false
                    }
                }
            },
            "6": {
                "question": "Theo Hồ Chí Minh, muốn thức tỉnh một dân tộc, trước hết phải thức tỉnh bộ phận dân cư nào?",
                "correctAnswer": "C",
                "options": {
                    "A": {
                        "text": "Tầng lớp trí thức",
                        "isCorrect": false
                    },
                    "B": {
                        "text": "Thiếu niên, nhi đồng",
                        "isCorrect": false
                    },
                    "C": {
                        "text": "Thanh niên",
                        "isCorrect": true
                    },
                    "D": {
                        "text": "Cả a,b, và c",
                        "isCorrect": false
                    }
                }
            },
            "7": {
                "question": "Bác Hồ viết: 'Nay chúng ta đã giành được quyền độc lập, một trong những công việc phải thực hiện cấp tốc trong lúc này, là nâng cao dân trí Phụ nữ lại càng cần phải học' Đoạn văn trên trích từ văn bản nào của Hồ Chí Minh",
                "correctAnswer": "A",
                "options": {
                    "A": {
                        "text": "Chống nạn thất học",
                        "isCorrect": true
                    },
                    "B": {
                        "text": "Sắc lệnh thành lập Nha bình dân học vụ",
                        "isCorrect": false
                    },
                    "C": {
                        "text": "Sắc lệnh thiết lập Hội đồng cố vấn học chính",
                        "isCorrect": false
                    },
                    "D": {
                        "text": "Đời sống mới",
                        "isCorrect": false
                    }
                }
            },
            "8": {
                "question": "Theo Hồ Chí Minh, muốn xây dựng chủ nghĩa xã hội trước hết cần có cái gì?",
                "correctAnswer": "C",
                "options": {
                    "A": {
                        "text": "Khoa học - kỹ thuật tiên tiến",
                        "isCorrect": false
                    },
                    "B": {
                        "text": "Kinh tế phát triển",
                        "isCorrect": false
                    },
                    "C": {
                        "text": "Con người xã hội chủ nghĩa",
                        "isCorrect": true
                    },
                    "D": {
                        "text": "Có tiền",
                        "isCorrect": false
                    }
                }
            },
            "9": {
                "question": " 'Tất cả các dân tộc trên thế giới đều sinh ra bình đẳng, dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do' Hồ Chí Minh nói câu đó trong văn kiện nào?",
                "correctAnswer": "A",
                "options": {
                    "A": {
                        "text": " Tuyên ngôn độc lập (1945)",
                        "isCorrect": true
                    },
                    "B": {
                        "text": "Đường Cách mệnh",
                        "isCorrect": false
                    },
                    "C": {
                        "text": "Bản án chế độ thực dân Pháp",
                        "isCorrect": false
                    },
                    "D": {
                        "text": "Lời kêu gọi toàn quốc kháng",
                        "isCorrect": false
                    }
                }
            },
            "10": {
                "question": "Hồ Chí Minh ví tuổi trẻ như mùa nào trong năm?",
                "correctAnswer": "C",
                "options": {
                    "A": {
                        "text": "Mùa xuân",
                        "isCorrect": true
                    },
                    "B": {
                        "text": "Mùa thu",
                        "isCorrect": false
                    },
                    "C": {
                        "text": "Mùa hạ",
                        "isCorrect": false
                    },
                    "D": {
                        "text": "Mùa đông",
                        "isCorrect": false
                    }
                }
            }   
            // Assume there are more questions formatted similarly
        }
    };

    // Directly using testMockData assuming testId matches
    const currentTest = testMockData;

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted");
        // Handle form submission logic here
    };

    // return (
    //     <div className="test-container">
    //         <h2>{postData.name}</h2>
    //         <div class="info-item"><strong>Description:</strong> {postData.desc}</div>
    //         <div class="info-item"><strong>Start Time:</strong> {postData.startTime}</div>
    //         <div class="info-item"><strong>End Time:</strong> {postData.endTime}</div>
    //         <div class="info-item"><strong>Location:</strong> {postData.location}</div>

    //         <hr />
    //         <form onSubmit={handleSubmit}>
    //             {Object.entries(currentTest.questions).map(([questionId, questionDetails], index) => (
    //                 <div key={questionId} className="question-block">
    //                     <p><strong>Question {index + 1}:</strong> {questionDetails.question}</p>
    //                     {Object.entries(questionDetails.options).map(([optionKey, optionValue]) => (
    //                     <div key={optionKey} className="option">
    //                         <label>
    //                             <input type="radio" name={`question${index}`} value={optionKey} />
    //                             {optionValue.text}
    //                         </label>
    //                     </div>
    //                 ))}
    //                 </div>
    //             ))}
    //             <button type="submit" className="submit-button">Submit Test</button>
    //         </form>
    //     </div>
    // );

    return (
        <div className="test-container">
            <h2>{postData.name}</h2>
            <div className="info-item"><strong>Description:</strong> {postData.desc}</div>
            <div className="info-item"><strong>Start Time:</strong> {postData.startTime}</div>
            <div className="info-item"><strong>End Time:</strong> {postData.endTime}</div>
            <div className="info-item"><strong>Location:</strong> {postData.location}</div>
    
            <hr />
            <form onSubmit={handleSubmit}>
                {Object.entries(currentTest.questions).map(([questionId, questionDetails], index) => (
                    <div key={questionId} className="question-block">
                        <p>
                            <strong>Question {index + 1}:</strong> {questionDetails.question}
                            <span className="required-star">*</span>
                        </p>
                        {Object.entries(questionDetails.options).map(([optionKey, optionValue]) => (
                            <div key={optionKey} className="option">
                                <label>
                                    <input type="radio" name={`question${index}`} value={optionKey} />
                                    {optionValue.text}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit" className="submit-button">Submit Test</button>
            </form>
        </div>
    );
    
};

export default TestPage;