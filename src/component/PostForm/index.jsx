import React from 'react';
import { Link } from 'react-router-dom';
import '../../../public/assets/css/post.css'; // Ensure you create this CSS file for styling
import '../../../public/assets/css/testPage.css'

const PostForm = ({ name, facultyName, desc, startTime, endTime, location, numberParticipants, testId }) => {
    const isActivity = !testId;

    return (
        <div className="post-container">
            <h3 className="post-faculty">{facultyName}</h3>
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
