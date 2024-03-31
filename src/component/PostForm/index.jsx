import React from 'react';
import { Link } from 'react-router-dom';
import '../../../public/assets/css/post.css'; 
import { PATHS } from '../../constants/path';
import { Button, Popconfirm, message } from 'antd'; // Import Popconfirm and message from antd

const PostForm = ({ id, name, facultyName, desc, startTime, startDate, endTime, endDate, location, numberParticipants, testId, onJoinActivity, statusJoined }) => {
    const isActivity = !testId;

    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };
    
    const handleJoinActivity = () => {
        // Call the function passed from the parent component
        if (onJoinActivity) {
            onJoinActivity(); // Pass the post ID to the parent component
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
            {isActivity ? (
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
            ) : (
                <Link to={PATHS.TEST} className="join-btn">Take Test</Link>
            )}
        </div>
    );
};

export default PostForm;
