// // src/components/Post.jsx
// import React from 'react';
// import '../../../public/assets/css/post.css'; // Ensure you create this CSS file for styling

// const PostForm = ({ name, desc, startTime, endTime, location, numberParticipants, testId }) => {
//     const isActivity = !testId;

//     const handleJoinClick = () => {
//         if (isActivity) {
//             // Logic to confirm joining the activity
//             alert('Are you sure you want to join this activity?'); // This could be replaced with a more sophisticated dialog/modal in your application
//         } else {
//             // Logic to navigate to the quiz page
//             // This assumes you have a routing mechanism in place, e.g., using React Router
//             console.log(`Navigating to quiz/test page with testId: ${testId}`); // Placeholder for navigation logic
//             // For example, with React Router: navigate(`/quiz/${testId}`);
//         }
//     };

//     return (
//         <div className="post-container">
//             <h3 className="post-title">{name}</h3>
//             <p className="post-description">{desc}</p>
//             <div className="post-details">
//                 <p>Start Time: {startTime}</p>
//                 <p>End Time: {endTime}</p>
//                 <p>Location: {location}</p>
//                 <p>Number of Participants: {numberParticipants}</p>
//             </div>
//             <button onClick={handleJoinClick} className="join-btn">{isActivity ? 'Join Activity' : 'Take Test'}</button>
//         </div>
//     );
// };

// export default PostForm;

// src/components/PostForm.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../../public/assets/css/post.css'; // Ensure you create this CSS file for styling
import '../../../public/assets/css/testPage.css'

const PostForm = ({ name, desc, startTime, endTime, location, numberParticipants, testId }) => {
    const isActivity = !testId;

    return (
        <div className="post-container">
            <h3 className="post-title">{name}</h3>
            <p className="post-description">{desc}</p>
            <div className="post-details">
                <p>Start Time: {startTime}</p>
                <p>End Time: {endTime}</p>
                <p>Location: {location}</p>
                <p>Number of Participants: {numberParticipants}</p>
            </div>
            <Link to={isActivity ? '/activity' : `/test/${testId}`} className="join-btn">
                {isActivity ? 'Join Activity' : 'Take Test'}
            </Link>
        </div>
    );
};

export default PostForm;
