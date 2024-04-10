import { CloseOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, message } from "antd"; // Import Popconfirm and message from antd
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../public/assets/css/post.css";
import { useAuthContext } from "../../context/AuthContext";
import postService from "../../services/postService";

const { Search } = Input;

const PostForm = ({
  id,
  name,
  facultyName,
  desc,
  startTime,
  startDate,
  endTime,
  endDate,
  location,
  numberParticipants,
  testId,
  onJoinActivity,
  statusJoined,
  onTakeTest,
  onListAttendees,
}) => {
  const { profile } = useAuthContext();
  const isStudent = profile?.role === "student";
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [showAttendanceInput, setShowAttendanceInput] = useState(false);
  const [attendanceCode, setAttendanceCode] = useState("");
  const [editedData, setEditedData] = useState({
    startTime: "",
    startDate: "",
    endTime: "",
    endDate: "",
    location: "",
    numberParticipants: "",
  });
  const handleEditButtonClick = () => {
    setEditMode(true);
  };
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
  };

  const handleCheckAttendance = () => {
    setShowAttendanceInput(true);
  };

  const handleAttendanceInputChange = (event) => {
    setAttendanceCode(event.target.value);
  };

  const handleSubmitAttendance = async (id, attendanceCode) => {
    try {
      await postService.checkAttendance(id, attendanceCode);
      message.success("Attendance checked successfully");
      setAttendanceCode("");
      setShowAttendanceInput(true);
    } catch (error) {
      message.error("Failed to check attendance. Please try again later.");
      console.error("Error checking attendance:", error);
    }
  };

  const handleCloseAttendanceInput = () => {
    setShowAttendanceInput(false);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      handleSubmitAttendance();
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="post-container">
      <div className="post-faculty">
        <span>{facultyName}</span>
      </div>
      <h3 className="post-title">{name}</h3>
      <p className="post-description">{desc}</p>
      <div className="post-details">
        {editMode ? (
          <>
            <div className="start-gr">
              <p>Start event</p>
              <div className="start-gr-date">
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={editedData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="start-gr-time">
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={editedData.startTime}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="end-gr">
              <p>End event</p>
              <div className="end-gr-date">
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={editedData.endDate}
                  onChange={handleChange}
                />
              </div>
              <div className="end-gr-time">
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={editedData.endTime}
                  onChange={handleChange}
                />
              </div>
            </div>
            <p>Location: {location}</p>
            <div className="number-gr">
              <p>Number of Participants:</p>
              <input

                type="number"
                id="numberParticipants"
                name="numberParticipants"
                value={editedData.numberParticipants}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <>
            <p>
              Start Event: {startTime}, {startDate}
            </p>
            <p>
              End Event: {endTime}, {endDate}
            </p>
            <p>Location: {location}</p>
            <p>Number of Participants: {numberParticipants}</p>
          </>
        )}
      </div>
      <div className="button-container">
        {!isStudent && !showAttendanceInput && (
          <>
            <Button
              onClick={() => handleListAttendees()}
              className="list-attend-btn"
            >
              List Attendees
            </Button>
            <Button onClick={handleEditButtonClick} className="edit-btn">
              Edit
            </Button>
          </>
        )}
        {testId
          ? isStudent && (
              <Button
                onClick={handleTakeTest}
                className="join-btn"
                disabled={statusJoined}
                style={{ cursor: statusJoined ? "not-allowed" : "pointer" }}
              >
                {statusJoined ? "Already done" : "Take test"}
              </Button>
            )
          : isStudent && (
              <Popconfirm
                title="Confirmation"
                description="Are you sure to join this activity?"
                onConfirm={handleJoinActivity}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  className="join-btn"
                  disabled={statusJoined}
                  style={{
                    cursor: statusJoined ? "not-allowed" : "pointer",
                  }}
                >
                  {statusJoined ? "Joined" : "Join Activity"}
                </Button>
              </Popconfirm>
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
                <Button
                  className="close-btn"
                  onClick={handleCloseAttendanceInput}
                >
                  <CloseOutlined />
                </Button>
              </div>
            )}
            {!showAttendanceInput && (
              <Button
                className="check-attendance-btn"
                onClick={handleCheckAttendance}
              >
                Check Attendance
              </Button>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default PostForm;
