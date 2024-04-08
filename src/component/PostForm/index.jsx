// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../../../public/assets/css/post.css'; 
// import { PATHS } from '../../constants/path';
// import { Button, Popconfirm, message } from 'antd'; // Import Popconfirm and message from antd
// import { useAuthContext } from '../../context/AuthContext';

// const PostForm = ({ id, name, facultyName, desc, startTime, startDate, endTime, endDate, location, numberParticipants, testId, onJoinActivity, statusJoined, onTakeTest, statusTake }) => {
//     const isActivity = !testId;
//     const { profile } = useAuthContext();

//     // const navigate = useNavigate()
//     const cancel = (e) => {
//         console.log(e);
//         // message.error('Click on No');
//     };
    
//     const handleJoinActivity = () => {
//         // Call the function passed from the parent component
//         if (onJoinActivity) {
//             onJoinActivity(); // Pass the post ID to the parent component
//         }
//     };
    
//     const handleTakeTest = () => {
//         // Call the function passed from the parent component
//         if (onTakeTest) {
//             onTakeTest(); // Pass the post ID to the parent component
//         }
//     };

//     return (
//         <div className="post-container">
//             <div className="post-faculty">
//                 <span>{facultyName}</span>
//             </div>
//             <h3 className="post-title">{name}</h3>
//             <p className="post-description">{desc}</p>
//             <div className="post-details">
//                 <p>Start Event: {startTime}, {startDate}</p>
//                 <p>End Event: {endTime}, {endDate}</p>
//                 <p>Location: {location}</p>
//                 <p>Number of Participants: {numberParticipants}</p>
//             </div>
//             {isActivity ? (
//                 <Popconfirm
//                     title="Confirmation"
//                     description="Are you sure to join this activity?"
//                     onConfirm={handleJoinActivity}
//                     onCancel={cancel}
//                     okText="Yes"
//                     cancelText="No"
//                 >
//                     <Button className="join-btn">{statusJoined ? "Joined" : "Join Activity"}</Button>
//                 </Popconfirm>
//             ) : (
//                 <Button onClick={handleTakeTest} className="join-btn">{statusTake ? "Already done" : "Take test"}</Button>
//             )}
//         </div>
//     );
// };

// export default PostForm;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../public/assets/css/post.css'; 
import { PATHS } from '../../constants/path';
import { Button, Popconfirm, message } from 'antd'; // Import Popconfirm and message from antd
import { useAuthContext } from '../../context/AuthContext';

const PostForm = ({ id, name, facultyName, desc, startTime, startDate, endTime, endDate, location, numberParticipants, testId, onJoinActivity, statusJoined, onTakeTest, statusTake, onDeletePost }) => {
    const { profile } = useAuthContext();
    const isStudent = profile?.role === 'student';
    const isActivity = !testId;

    const cancel = (e) => {
        console.log(e);
    };

    const handleJoinActivity = () => {
        if (onJoinActivity) {
            onJoinActivity();
        }
    };
    
    const handleTakeTest = () => {
        if (onTakeTest) {
            onTakeTest();
        }
    };

    const handleDeletePost = () => {
        if (onDeletePost) {
            onDeletePost(id);
        }
    };

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
            {isStudent && isActivity ? (
                <Popconfirm
                    title="Confirmation"
                    description="Are you sure to join this activity?"
                    onConfirm={handleJoinActivity}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button className="join-btn">{statusJoined ? "Joined" : "Join Activity"}</Button>
                </Popconfirm>
            ) : isStudent && !isActivity ? (
                <Button onClick={handleTakeTest} className="join-btn">{statusTake ? "Already done" : "Take test"}</Button>
            ) : (
                <>
                    <div className="button-container">
                        <Button className='list-attend-btn'>List Attendees</Button>
                        <Button className='edit-btn'>Edit</Button>
                        <Popconfirm
                            title="Confirmation"
                            description="Are you sure to delete this post?"
                            onConfirm={handleDeletePost}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button className='delete-btn' onClick={() => onDeletePost(id)}>Delete</Button>
                        </Popconfirm>
                    </div>
                </>
            )}
        </div>
    );
};

export default PostForm;
