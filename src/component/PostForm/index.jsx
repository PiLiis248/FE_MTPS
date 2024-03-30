// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../../../public/assets/css/post.css'; 

// const PostForm = ({ name, facultyName, desc, startTime, endTime, location, numberParticipants, testId }) => {
//     const isActivity = !testId;

//     return (
//         <div className="post-container">
//             <h3 className="post-faculty">{facultyName}</h3>
//             <h3 className="post-title">{name}</h3>
//             <p className="post-description">{desc}</p>
//             <div className="post-details">
//                 <p>Start Time: {startTime}</p>
//                 <p>End Time: {endTime}</p>
//                 <p>Location: {location}</p>
//                 <p>Number of Participants: {numberParticipants}</p>
//             </div>
//             <Link to={isActivity ? '/activity' : `/test/${testId}`} className="join-btn">
//                 {isActivity ? 'Join Activity' : 'Take Test'}
//             </Link>
//         </div>
//     );
// };

// export default PostForm;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../../../public/assets/css/post.css'; 
// import { PATHS } from '../../constants/path';

// const PostForm = ({ id, name, facultyName, desc, startTime, startDate, endTime, endDate, location, numberParticipants, testId }) => {
//     const isActivity = !testId;

//     return (
//         <div className="post-container">
//             <h3 className="post-faculty">{facultyName}</h3>
//             <h3 className="post-title">{name}</h3>
//             <p className="post-datetime">{startTime} , {startDate}</p>
//             <p className="post-description">{desc}</p>
//             <div className="post-details">
//                 <p>End Event: {endTime} , {endDate}</p>
//                 <p>Location: {location}</p>
//                 <p>Number of Participants: {numberParticipants}</p>
//             </div>
//             {isActivity ? (
//                 <Link to={PATHS.HOME} className="join-btn">Join Activity</Link>
//             ) : (
//                 <Link to={PATHS.TEST} className="join-btn">Take Test</Link>
//             )}
//         </div>
//     );
// };

// export default PostForm;

import React from 'react';
import { Link } from 'react-router-dom';
import '../../../public/assets/css/post.css'; 
import { PATHS } from '../../constants/path';

const PostForm = ({ id, name, facultyName, desc, startTime, startDate, endTime, endDate, location, numberParticipants, testId }) => {
    const isActivity = !testId;

    return (
        <div className="post-container">
            <div className="post-faculty">
                <span>{facultyName}</span>
            </div>
            <h3 className="post-title">{name}</h3>
            <p className="post-description">{desc}</p>
            <div className="post-details">
                <p>Start Event: {startTime}, {startDate}</p>
                <p>End Event: {endTime}, {endDate}</p>
                <p>Location: {location}</p>
                <p>Number of Participants: {numberParticipants}</p>
            </div>
            {isActivity ? (
                <Link to={PATHS.HOME} className="join-btn">Join Activity</Link>
            ) : (
                <Link to={PATHS.TEST} className="join-btn">Take Test</Link>
            )}
        </div>
    );
};

export default PostForm;

