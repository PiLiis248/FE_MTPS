import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import '../../../public/assets/css/post.css'; 
import { PATHS } from '../../constants/path';
import { Button, Popconfirm, message, Input } from 'antd'; // Import Popconfirm and message from antd
import { useAuthContext } from '../../context/AuthContext';
import postService from '../../services/postService';

const { Search } = Input;

const PostForm = ({ id, name, facultyName, desc, startTime, startDate, endTime, endDate, location, numberParticipants, testId, onJoinActivity, statusJoined, onTakeTest, statusTake, onListAttendees }) => {
    const { profile } = useAuthContext();
    const isStudent = profile?.role === 'student';
    const navigate = useNavigate();
    

    const [showAttendanceInput, setShowAttendanceInput] = useState(false);
    const [attendanceCode, setAttendanceCode] = useState('');
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

    const handleListAttendees = async () => {
       if (onListAttendees) {
        onListAttendees();
       }
    }

    const handleCheckAttendance = () => {
        setShowAttendanceInput(true);
    };

    const handleAttendanceInputChange = (event) => {
        setAttendanceCode(event.target.value);
    };

    const handleSubmitAttendance = async (id, attendanceCode) => {
        try {
            // Call the checkAttendance service method with postId and attendanceCode
            await postService.checkAttendance(id, attendanceCode);
            // Show success message if attendance checked successfully
            message.success('Attendance checked successfully');
            // Reset attendance code input and hide input field
            setAttendanceCode('');
            setShowAttendanceInput(true);
        } catch (error) {
            // Show error message if any error occurs
            message.error('Failed to check attendance. Please try again later.');
            console.error('Error checking attendance:', error);
        }
    };

    const handleCloseAttendanceInput = () => {
        setShowAttendanceInput(false);
    };

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission behavior
            handleSubmitAttendance();
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
            <div className="button-container">
                {!isStudent && !showAttendanceInput && (
                    <>
                        <Button onClick={() => handleListAttendees()} className='list-attend-btn'>List Attendees</Button>
                        <Button className='edit-btn'>Edit</Button>
                    </>
                )}
                {testId ? (
                    isStudent && <Button onClick={handleTakeTest} className="join-btn">{statusTake ? "Already done" : "Take test"}</Button>
                ) : (
                    isStudent && (
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
                    )
                )}
                {!isStudent && !testId && (
                    <React.Fragment>
                        {showAttendanceInput && (
                            <div className="attendance-input">
                                <Search
                                    placeholder="Student ID"
                                    value={attendanceCode}
                                    maxLength={8}
                                    onChange={handleAttendanceInputChange}
                                    onSearch={handleSubmitAttendance(id, attendanceCode)}
                                    onPressEnter={handleInputKeyPress}
                                />
                                <Button className='close-btn' onClick={handleCloseAttendanceInput}><CloseOutlined /></Button>
                            </div>
                        )}
                        {!showAttendanceInput && (
                            <Button className='check-attendance-btn' onClick={handleCheckAttendance}>Check Attendance</Button>
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default PostForm;
