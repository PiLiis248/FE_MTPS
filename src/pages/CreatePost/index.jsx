// CreatePost.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../public/assets/css/create_post.css'; // Ensure you create this CSS file for styling
import SideBar from '../../component/SideBar'; // Import AssistantSidebar component
import { PATHS } from '../../constants/path';
import { useAuthContext } from '../../context/AuthContext'; // Import useAuthContext hook

const CreatePost = () => {
    const { profile } = useAuthContext(); // Get the profile from the authentication context

    // Load facultyName from localStorage if available, otherwise use the one from profile
    const initialFacultyName = localStorage.getItem('facultyName') || (profile ? profile.facultyName : '');

    const [formData, setFormData] = useState({
        name: '',
        facultyName: initialFacultyName,
        desc: '',
        status: '', // New status field
        startTime: '',
        endTime: '',
        location: '',
        numberParticipants: 0,
        testId: ''
    });

    useEffect(() => {
        // Save facultyName to localStorage when it changes
        localStorage.setItem('facultyName', formData.facultyName);
    }, [formData.facultyName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission, such as sending data to a server
        console.log(formData);
    };

    // Function to handle activity creation
    const handleCreateActivity = () => {
        setFormData(prevState => ({
            ...prevState,
            status: 'activity' // Set status to 'activity' for activity creation
        }));
        handleSubmit(); // Call handleSubmit to handle form submission
    };

    // Function to handle test creation
    

    return (
        <div className="create-post-container">
            <SideBar className="sidebar-create" />
            <div className="form-create">
                {/* <h2>Create New Post</h2> */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="facultyName">Faculty Name:</label>
                        <input type="text" id="facultyName" name="facultyName" value={formData.facultyName} onChange={handleChange} readOnly={!!profile} />
                        {/* Make the facultyName field readOnly if profile exists */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description:</label>
                        <textarea id="desc" name="desc" value={formData.desc} onChange={handleChange}></textarea>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="startTime">Start Time:</label>
                        <input type="datetime-local" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endTime">End Time:</label>
                        <input type="datetime-local" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numberParticipants">Number of Participants:</label>
                        <input type="number" id="numberParticipants" name="numberParticipants" value={formData.numberParticipants} onChange={handleChange} />
                    </div>
                   
                   
                </form>
                {/* Create buttons for activity and test */}
                <div className="create-buttons">
                    <button className="create-activity-button" onClick={handleCreateActivity}>Create Activity</button>
                    <Link to={PATHS.CREATE_TEST} className="create-test-link">
                        <button className="create-test-button">Create Test</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
