import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import '../../../public/assets/css/post.css'; 
import { PATHS } from '../../constants/path';
import { Button, Popconfirm, message, Input } from 'antd'; // Import Popconfirm and message from antd
import { useAuthContext } from '../../context/AuthContext';

const { Search } = Input;

const PostForm = ({ id, name, facultyName, desc, startTime, startDate, endTime, endDate, location, numberParticipants, testId, onJoinActivity, statusJoined, onTakeTest, statusTake }) => {
    const { profile } = useAuthContext();
    const isStudent = profile?.role === 'student';
    

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

    const handleCheckAttendance = () => {
        setShowAttendanceInput(true);
    };

    const handleAttendanceInputChange = (event) => {
        setAttendanceCode(event.target.value);
    };

    const handleSubmitAttendance = () => {
        console.log("Attendance Code:", attendanceCode);
        setAttendanceCode('');
        setShowAttendanceInput(true);
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
                {!isStudent && (
                    <>
                        <Button className='list-attend-btn'>List Attendees</Button>
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
                                    onSearch={handleSubmitAttendance}
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
